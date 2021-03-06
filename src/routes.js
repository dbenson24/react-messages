/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import RepositoryFeed from './components/RepositoryFeed';


const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    console.log("route state", state);
    return component && <App context={state.context} user={state.user}>{component}</App>;
  });

  on('/contact', async (state) => <ContactPage />);

  on('/login', async (state) => <LoginPage user={state.user}/>);

  on('/register', async (state) => <RegisterPage user={state.user}/>);
  
  on('/repos', async (state) => {
    return <RepositoryFeed />;
  }
  );

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
