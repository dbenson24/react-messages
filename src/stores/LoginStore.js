import dispatcher from "../core/Dispatcher";
import {
    EventEmitter
}
from 'events';
import assign from 'object-assign';
import http from '../core/HttpClient';

let LOGIN_EVENT = 'Login_Change';


class LoginStore extends EventEmitter {


    constructor() {
        super();
        this.user = {};
        this.authenticated = false;
        //        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    /**
     * Get the entire collection of Repositories.
     * @return [repo]
     */

    isAuthenticated() {
        return this.authenticated;
    }

    getProfile() {
        if (this.authenticated) {
            return this.user;
        }
        return false;
    }

    setUser(user, authenticated) {
        console.log("setting user", user);
        this.user = user;
        this.authenticated = authenticated;
        this.emitChange();
    }

    emitChange() {
        this.emit(LOGIN_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(LOGIN_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(LOGIN_EVENT, callback);
    }
};

let store = new LoginStore();
console.log("Created LoginStore");

export default store;

/*
let date_sort_desc = (repo1, repo2) => {
    let date1 = new Date(repo1.pushed_at);
    let date2 = new Date(repo2.pushed_at);
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
};
*/

async() => {
    console.log("Updating LoginStore");
    const response = await http.get('/api/user');
    console.log("Recieved User");
    if (response.err) {
        store.setUser({}, false);
    }
    else {
        store.setUser(response.user, true);
    }
}();
