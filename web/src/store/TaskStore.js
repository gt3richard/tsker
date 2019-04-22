import {decorate, observable, action} from "mobx"
import { getUser, putUser, getManager, getTask, putTask } from '../service/Api'
const uuidv1 = require('uuid/v1');
const moment = require('moment');

class TaskStore {

    isAuthenticated = false
    userId = ''
    accessToken = ''
    edit = false
    teamEdit = false
    
    userTeam = ''
    userRole = ''
    userColor = ''
    tasks = []
    messages = []

    results = []
    taskFilter = ''
    taskOwnerId = ''
    taskOwnerRole = ''
    taskOwnerColor = ''
    taskId = ''
    taskState = ''
    taskTitle = ''
    taskDescription = ''

    getUser() {
        const callback = (result) => {

            if(result !== undefined) {
                //Existing User
                this.userTeam  = result.team
                this.userRole  = result.role
                this.userColor = result.color
                this.tasks     = result.tasks
                this.results   = [ result ]
            } else {
                //New User
                this.teamEdit = true
                this.userTeam  = ''
                this.userRole  = 'user'
                this.userColor = 'blue'
                this.tasks     = []
                this.results   = []
            }

            if(this.userRole === 'manager') {
                this.getManager()
            }
        }

        if(this.userId && this.accessToken) {
            getUser(this.userId, this.accessToken, callback)
        }
    }

    getManager() {
        const callback = (result) => {
            this.results = result
        }

        if(this.userTeam && this.accessToken) {
            getManager(this.userTeam, this.accessToken, callback)
        }
    }

    getTask(user_id, task_id) {
        const user = this.results.filter(f => f.user_id === user_id)[0]
        const task = user.tasks.filter(f => f.id === task_id)[0]
        
        this.taskOwnerId    = user.user_id
        this.taskOwnerRole  = user.role
        this.taskOwnerColor = user.color
        
        this.taskId          = task_id
        this.taskTitle       = task.title
        this.taskDescription = task.description
        this.taskState       = task.state

        const callback = (result) => {
            if(result !== undefined) {
                this.messages = result.messages
            } else {
                this.messages = []
            }
        }

        if(this.taskId && this.accessToken) {
            getTask(this.taskId, this.accessToken, callback)
        }
    }

    addMessage(message) {
        var utcDate = moment.utc().format("MM/DD/YYYY HH:mm:ss")
        this.messages.push({
            user_id: this.userId,
            date: utcDate,
            text: message
        })

        const callback = (result) => {}
        putTask(this.taskId, this.messages, this.accessToken, callback)
    }

    clearTask() {
        this.taskOwnerId = ''
        this.taskOwnerRole = ''
        this.taskOwnerColor = ''
        this.taskId = ''
        this.taskTitle = ''
        this.taskDescription = ''
        this.taskState = ''
        this.messages = []
    }

    updateTaskState(state) {
        const taskMap = {
            completed: 'completed',
            blocked: 'blocked',
            not_done: 'not completed'
        }

        var user = this.results.filter(f => f.user_id === this.taskOwnerId)[0]
        user.tasks.map(m => {
            if(m.id === this.taskId) {
                if(m.state === state) {
                    state = 'not_done'
                }
                m.state = state
            }
        })
        this.addMessage("Task is "+ taskMap[state])
        this.taskState = state

        const callback = (result) => {}
        putUser(this.taskOwnerId, this.userTeam, this.taskOwnerRole, this.taskOwnerColor, user.tasks, this.accessToken, callback)
    }

    updateTitle(title) {
        var user = this.results.filter(f => f.user_id === this.taskOwnerId)[0]
        user.tasks.map(m => {
            if(m.id === this.taskId) {
                m.title = title
            }
        })
        this.taskTitle = title

        const callback = (result) => {}
        putUser(this.taskOwnerId, this.userTeam, this.taskOwnerRole, this.taskOwnerColor, user.tasks, this.accessToken, callback)
    }

    updateDescription(description) {
        var user = this.results.filter(f => f.user_id === this.taskOwnerId)[0]
        user.tasks.map(m => {
            if(m.id === this.taskId) {
                m.description = description
            }
        })
        this.taskDescription = description

        const callback = (result) => {}
        putUser(this.taskOwnerId, this.userTeam, this.taskOwnerRole, this.taskOwnerColor, user.tasks, this.accessToken, callback)
    }

    addTask(title) {
        var user = this.results.filter(f => f.user_id === this.userId)[0]
        user.tasks.push(
            { id: uuidv1(), title: title, state: "not_done" }
        )

        const callback = (result) => {}
        putUser(this.userId, this.userTeam, this.userRole, this.userColor, user.tasks, this.accessToken, callback)
    }

    deleteTask() {
        var user = this.results.filter(f => f.user_id === this.taskOwnerId)[0]
        user.tasks = user.tasks.filter(f => f.id !== this.taskId)
        this.clearTask()
        this.edit = false

        const callback = (result) => {}
        putUser(this.taskOwnerId, this.userTeam, this.taskOwnerRole, this.taskOwnerColor, user.tasks, this.accessToken, callback)
    } 

    filterTasks(search) {
        this.taskFilter = search
    }

    joinTeam(code) {
        if(code === '123') {
            this.userTeam = 'Team Blue'
        }

        if(this.userTeam) {
            const callback = (result) => {}
            putUser(this.userId, this.userTeam, this.userRole, this.userColor, this.tasks, this.accessToken, callback)
        }
    }
}

decorate(TaskStore, {
    isAuthenticated: observable,
    userId: observable,
    accessToken: observable,
    edit: observable,
    teamEdit: observable,
    
    userTeam: observable,
    userRole: observable,
    userColor: observable,
    tasks: observable,
    messages: observable,
    results: observable,

    taskFilter: observable,
    taskOwnerId: observable,
    taskOwnerRole: observable,
    taskOwnerColor: observable,
    taskId: observable,
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