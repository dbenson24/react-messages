import {
  Router
}
from 'express';
import request from 'request';


var GitHubApi = require("github");

var github = new GitHubApi({
  // required
  version: "3.0.0",
  // optional
  debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub
  pathPrefix: "", // for some GHEs; none for GitHub
  timeout: 5000,
  headers: {
    "user-agent": "Derek-Benson-Website" // GitHub is happy with a unique user agent
  }
});




const router = new Router();

router.get('/:username', (req, res, next) => {
  console.log("Hit the server request");
  res.send({
    msg: req.params.username
  });
});

router.get('/', (req, res, next) => {
  console.log("Hit the server request");
  /*
  github.authenticate({
    type: "token",
    token: process.env.GHTOKEN
});*/
  github.repos.getFromUser({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "dbenson24"
  }, function(err, data) {
    res.send(data);
  });
});

export default router;