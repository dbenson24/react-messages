/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import passport from 'passport';
import secrets from './secrets';
import google from 'passport-google-oauth';
import github from 'passport-github';
import jwt from 'jsonwebtoken';
import parseJWT from './utils/parseJWT';

const GoogleStrategy = google.OAuth2Strategy;
const GitHubStrategy = github.Strategy;

const server = global.server = express();
const port = process.env.PORT || 5000;
server.set('port', port);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(cookieParser());
/*
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
*/
//
// Register and Configure Passport
// -----------------------------------------------------------------------------


server.use(passport.initialize());
//server.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

passport.use(new GoogleStrategy({
    clientID: secrets.google.clientID,
    clientSecret: secrets.google.clientSecret,
    callbackURL: secrets.google.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile);
  }
));

passport.use(new GitHubStrategy({
    clientID: secrets.github.clientID,
    clientSecret: secrets.github.clientSecret,
    callbackURL: secrets.github.callbackURL,
    scope: ["user", "user:email"]
  },
  function(accessToken, refreshToken, profile, done) {
    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  }
));


server.get('/auth/google',
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
  }));

server.get('/auth/github',
  passport.authenticate('github'),
  function(req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });





server.get(secrets.google.callbackURL,
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


server.get(secrets.github.callbackURL,
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    let user = {
      username: req.user.username,
      displayName: req.user.displayName
    };
    let token = jwt.sign(user, secrets.jwt);
    res.cookie('token', token, {
      maxAge: 9000000000,
      httpOnly: true
    });
    res.redirect('/');
  });


//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));
server.use('/api/repos', require('./api/repos'));
server.use('/api/user', require('./api/user'));

server.get("/test", (req, res) => {
  console.log("test user", req.user);
  let user = jwt.verify(req.cookies.token, secrets.jwt);
  res.send(user);
});

server.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.clearCookie('user');
  req.cookies.token = null;
  req.cookies.user = null;
  res.redirect('/');
});


server.use(parseJWT);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async(req, res, next) => {
      try {
        let statusCode = 200;
        const data = {
          title: '',
          description: '',
          css: '',
          body: ''
        };
        const css = [];
        console.log("request.user", req.user, req.path);
        let context = {
          onInsertCss: value => css.push(value),
          onSetTitle: value => data.title = value,
          onSetMeta: (key, value) => data[key] = value,
          onPageNotFound: () => statusCode = 404,
        };
        await Router.dispatch({
          path: req.path,
          context,
          user: req.user
        }, (state, component) => {
          console.log("component", component);
          data.body = ReactDOM.renderToString(component);
          data.css = css.join('');
        });

        const html = ReactDOM.renderToStaticMarkup( < Html {...data
          }
          />);
          res.status(statusCode).send('<!doctype html>\n' + html);
        }
        catch (err) {
          next(err);
        }
      });

    //
    // Launch the server
    // -----------------------------------------------------------------------------
    server.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`The server is running at http://localhost:${port}/`);
    });
