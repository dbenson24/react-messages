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
     * Get the entire collection of Repositories.
     * @return {object}
     */

    setAll(repos) {
        this.repos = repos;
    }

    getAll() {
        return this.repos;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
};

let store = new RepositoryStore();
console.log("Created store");

export default store;


let date_sort_desc = (repo1, repo2) => {
    let date1 = new Date(repo1.pushed_at);
    let date2 = new Date(repo2.pushed_at);
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
};


async() => {
    console.log("Updating store");
    const repos = await http.get('/api/repos');
    console.log("Recieved repos");
    repos.sort(date_sort_desc);
    store.setAll(repos);
    store.emitChange();
}();