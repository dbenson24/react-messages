import dispatcher from "../core/Dispatcher";
import {
    EventEmitter
}
from 'events';
import assign from 'object-assign';
import $ from 'jquery';
import http from '../core/HttpClient';

let CHANGE_EVENT = 'change';


class RepositoryStore extends EventEmitter {
    
    
    constructor() {
        super();
        this.repos = [];
    }
    
    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
     
    setAll (repos) {
        this.repos = repos;
    } 
     
    getAll () {
        return this.repos;
    }

    emitChange () {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
};

let store = new RepositoryStore();
console.log("Created store");
/*
request('/api/repos', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log (body);
        repos = body;
        store.emitChange();
    } else {
        console.log("response", response);
    }
});
*/
/*
$.getJSON("https://api.github.com/users/dbenson24/repos", "", (data) => {
    repos = data;
    RepositoryStore.emitChange();
});
*/

export default store;
async () => {
    console.log("Updating store");
    const repos = await http.get('/api/repos');
    console.log("Recieved repos");
    store.setAll(repos);
    store.emitChange();
}();