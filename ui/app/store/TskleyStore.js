import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, action} from 'mobx';

class TskleyStore {
    @observable teamName = 'Gold Team'
}

const store = new TskleyStore();

export default store
export { TskleyStore };