import dispatcher from "../core/Dispatcher";
import {
    EventEmitter
}
from 'events';
import assign from 'object-assign';
import $ from 'jquery';
import request from 'request';

let CHANGE_EVENT = 'change';

let repos = [];

let RepositoryStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: () => {
        return repos;
    },

    emitChange: () => {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: (callback) => {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: (callback) => {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

/*
request('https://api.github.com/users/dbenson24/repos', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log (body);
        repos = body;
        RepositoryStore.emitChange();
    }
});
*/

/*
$.getJSON("https://api.github.com/users/dbenson24/repos", "", (data) => {
    repos = data;
    RepositoryStore.emitChange();
});
*/

export default RepositoryStore;