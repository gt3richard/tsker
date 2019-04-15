import {decorate, observable, action} from "mobx"
import { getTasks, putTasks } from '../service/Api.js'

const uuidv1 = require('uuid/v1');

class TaskStore {

    isAuthenticated = false
    userId = ""
    accessToken = ""
    edit = false
    
    stateMode = "simple"
    resetMode = "monthly"
    tasks = []

    getStates() {
        if(this.stateMode === 'simple') {
            return {
                "working": "done",
                "done": "not-done",
                "not-done": "done"
            }
        } else {
            return {
                "working": "done",
                "done": "not-done",
                "not-done": "working"
              }
        }
    }

    getTasks() {
        const callback = (result) => { 
            this.tasks = result.tasks || []
            this.stateMode = result.stateMode || 'simple'
            this.resetMode = result.resetMode || 'monthly'  
        }
        getTasks(this.userId, this.accessToken, callback)
    }

    getTask(id) {
        return this.tasks.filter((t) => t.id === id)[0]
    }

    updateUserData() {
        const callback = (result) => {  }
        putTasks(this.userId, this.tasks, this.stateMode, this.resetMode, this.accessToken, callback)
    }

    updateTaskState(id, state) {
        this.tasks = this.tasks.map((t) => {
            if(t.id === id) { t.state = state }
            return t
        })
        const callback = (result) => {  }
        putTasks(this.userId, this.tasks, this.stateMode, this.resetMode, this.accessToken, callback)
    }

    updateTask(id, name, date) {
        this.tasks = this.tasks.map((t) => {
            if(t.id === id) { 
                t.name = name 
                t.date = date
            }
            return t
        })
        const callback = (result) => {  }
        putTasks(this.userId, this.tasks, this.stateMode, this.resetMode, this.accessToken, callback)
    }

    addTask(name, date) {
        const task = {"id": uuidv1(), "name": name, "date": date, "state": "not-done"}
        this.tasks.push(task)
        const callback = (result) => { }
        putTasks(this.userId, this.tasks, this.stateMode, this.resetMode, this.accessToken, callback)
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(f => f.id !== id)
        const callback = (result) => { }
        putTasks(this.userId, this.tasks, this.stateMode, this.resetMode, this.accessToken, callback)
    }

    month = {
        "1": "1st",
        "2": "2nd",
        "3": "3rd",
        "4": "4th",
        "5": "5th",
        "6": "6th",
        "7": "7th",
        "8": "8th",
        "9": "9th",
        "10": "10th",
        "11": "11th",
        "12": "12th",
        "13": "13th",
        "14": "14th",
        "15": "15th",
        "16": "16th",
        "17": "17th",
        "18": "18th",
        "19": "19th",
        "20": "20th",
        "21": "21th",
        "22": "22th",
        "23": "23th",
        "24": "24th",
        "25": "25th",
        "26": "26th",
        "27": "27th",
        "28": "28th",
        "29": "29th",
        "30": "30th",
        "31": "31th"
      }
}

decorate(TaskStore, {
    isAuthenticated: observable,
    userId: observable,
    accessToken: observable,
    edit: observable,
    stateMode: observable,
    resetMode: observable,
    tasks: observable,
    updateUserData: action,
    getStates: action,
    updateTaskState: action,
    updateTask: action,
    getTask: action,
    addTask: action,
    deleteTask: action,
    month: observable
})

const store = new TaskStore();
export default store
export { TaskStore };