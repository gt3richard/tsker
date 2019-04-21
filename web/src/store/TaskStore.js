import {decorate, observable, action} from "mobx"
import { getUser, putUser } from '../service/Api'
const uuidv1 = require('uuid/v1');
const moment = require('moment');

class TaskStore {

    isAuthenticated = false
    userId = ''
    accessToken = ''
    edit = false
    teamEdit = false
    
    userTeam = ''
    userRole = 'user'
    userColor = 'blue'
    tasks = []
    filteredTasks = []
    messages = []
    taskId = ''
    taskState = ''
    taskTitle = ''
    taskDescription = ''

    getUser() {
        const callback = (result) => {
            this.userTeam = result.team
            this.userRole = result.role
            this.tasks    = result.tasks

            this.filteredTasks = this.tasks
        }

        if(this.userId && this.accessToken) {
            getUser(this.userId, this.accessToken, callback)
        }
    }

    getTask(id) {
        const task = this.tasks.filter(f => f.id === id)[0]
        this.taskId          = id
        this.taskTitle       = task.title
        this.taskDescription = task.description
        this.taskState       = task.state

        if(id === '1') {
            this.messages = [
                { user_id: '1', date: '2/4/2019 10:00:00', text: 'Can you give me a status update?' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/4/2019 11:00:00', text: 'I\'ve filled out the form but am waiting to get it authorized.' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/6/2019 11:00:00', text: 'Task is Blocked' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/6/2019 12:00:00', text: 'The person is out on vacation so I can get it done next week.' },
                { user_id: '1', date: '2/6/2019 13:00:00', text: 'Send it over to me and I can authorize it.' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/7/2019 11:00:00', text: 'Task is Completed' }
              ]
        } else {
            this.messages = [
                { user_id: '1', date: '2/4/2019 10:00:00', text: 'Hey, Can you give me a status update?' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/4/2019 11:00:00', text: 'I\'ve filled out the form but am waiting to get it authorized.' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/6/2019 11:00:00', text: 'Task is Blocked' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/6/2019 12:00:00', text: 'The person is out on vacation so I can get it done next week.' },
                { user_id: '1', date: '2/6/2019 13:00:00', text: 'Send it over to me and I can authorize it.' },
                { user_id: 'dfa3a239-f8c4-47ec-bab9-98676bb8b806', date: '2/7/2019 11:00:00', text: 'Task is Completed' }
              ]
        }
    }

    clearTask() {
        this.taskId = ''
        this.taskState = ''
        this.taskTitle = ''
        this.taskDescription = ''
        this.messages = []
    }

    updateTaskState(state) {
        const taskMap = {
            completed: 'completed',
            blocked: 'blocked',
            not_done: 'not completed'
        }

        const task = this.tasks.filter(f => f.id === this.taskId)[0]
        if(task.state === state) {
            state = 'not_done'
        }
        task.state = state

        this.addMessage("Task is "+ taskMap[state])
        this.taskState = state
        this.filteredTasks = this.tasks

        const callback = (result) => {}
        putUser(this.userId, this.userTeam, this.userRole, this.tasks, this.accessToken, callback)
    }

    addMessage(message) {
        var utcDate = moment.utc().format("MM/DD/YYYY HH:mm:ss")
        this.messages.push({
            user_id: this.userId,
            date: utcDate,
            text: message
        })
    }

    updateTitle(title) {
        this.tasks.map(m => {
            if(m.id === this.taskId) {
                m.title = title
            }
        })
        this.taskTitle = title
        this.filterTasks = this.tasks

        const callback = (result) => {}
        putUser(this.userId, this.userTeam, this.userRole, this.tasks, this.accessToken, callback)
    }

    updateDescription(description) {
        this.tasks.map(m => {
            if(m.id === this.taskId) {
                m.description = description
            }
        })
        this.taskDescription = description
        this.filterTasks = this.tasks

        const callback = (result) => {}
        putUser(this.userId, this.userTeam, this.userRole, this.tasks, this.accessToken, callback)
    }

    addTask(title) {
        this.tasks.push(
            { id: uuidv1(), title: title, state: "not_done" }
        )
        this.filteredTasks = this.tasks

        const callback = (result) => {}
        putUser(this.userId, this.userTeam, this.userRole, this.tasks, this.accessToken, callback)
    }

    deleteTask() {
        this.tasks = this.tasks.filter(f => f.id !== this.taskId)
        this.filteredTasks = this.tasks
        this.clearTask()
        this.edit = false

        const callback = (result) => {}
        putUser(this.userId, this.userTeam, this.userRole, this.tasks, this.accessToken, callback)
    } 

    filterTasks(search) {
        this.filteredTasks = this.tasks.filter(f => f.title.toLowerCase().includes(search.toLowerCase()))
    }

    joinTeam(code) {

    }
}

decorate(TaskStore, {
    isAuthenticated: observable,
    userId: observable,
    accessToken: observable,
    edit: observable,
    teamEdit: observable,
    taskId: observable,
    userTeam: observable,
    userRole: observable,
    userColor: observable,
    tasks: observable,
    filteredTasks: observable,
    messages: observable,
    taskState: observable,
    taskTitle: observable,
    taskDescription: observable,
    getTasks: action,
    getTask: action,
    getUser: action,
    updateTaskState: action,
    addMessage: action,
    updateTitle: action,
    updateDescription: action,
    addTask: action,
    deleteTask: action,
    joinTeam: action
})

const store = new TaskStore();
export default store
export { TaskStore };