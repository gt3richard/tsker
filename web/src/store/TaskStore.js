import {decorate, observable, action} from "mobx"

const uuidv1 = require('uuid/v1');
const moment = require('moment');

class TaskStore {

    isAuthenticated = false
    userId = ""
    accessToken = ""
    edit = false
    teamEdit = false
    
    userData = {}
    userRole = 'user'
    tasks = []
    filteredTasks = []
    messages = []
    activeTaskId = ""
    messageTitle = ""
    messageDescription = ""

    getUser() {
        this.userData = {
            team: 'Team Blue',
            role: 'manager'
        }
    }

    getTasks() {
        this.tasks = [
            { id: '1', title: 'Submit report to team', description: "You need to submit the report to the team.", state: "" }, 
            { id: '2', title: 'Fill out form', description: "You need to fill out the authorization form and send it over to the team by next week.", state: "" }
          ]
        this.filteredTasks = this.tasks
    }

    getTask(id) {
        this.activeTaskId = id
        this.messageTitle = this.tasks.filter(f => f.id === id)[0].title
        this.messageDescription = this.tasks.filter(f => f.id === id)[0].description

        if(id === '1') {
            this.messages = [
                { user_id: '1', date: '2/4/2019 10:00:00', text: 'Can you give me a status update?' },
                { user_id: '2', date: '2/4/2019 11:00:00', text: 'I\'ve filled out the form but am waiting to get it authorized.' },
                { user_id: '2', date: '2/6/2019 11:00:00', text: 'Task is Blocked' },
                { user_id: '2', date: '2/6/2019 12:00:00', text: 'The person is out on vacation so I can get it done next week.' },
                { user_id: '1', date: '2/6/2019 13:00:00', text: 'Send it over to me and I can authorize it.' },
                { user_id: '2', date: '2/7/2019 11:00:00', text: 'Task is Completed' }
              ]
        } else {
            this.messages = [
                { user_id: '1', date: '2/4/2019 10:00:00', text: 'Hey, Can you give me a status update?' },
                { user_id: '2', date: '2/4/2019 11:00:00', text: 'I\'ve filled out the form but am waiting to get it authorized.' },
                { user_id: '2', date: '2/6/2019 11:00:00', text: 'Task is Blocked' },
                { user_id: '2', date: '2/6/2019 12:00:00', text: 'The person is out on vacation so I can get it done next week.' },
                { user_id: '1', date: '2/6/2019 13:00:00', text: 'Send it over to me and I can authorize it.' },
                { user_id: '2', date: '2/7/2019 11:00:00', text: 'Task is Completed' }
              ]
        }
    }

    clearTask() {
        this.activeTaskId = ''
        this.messageTitle = ''
        this.messageDescription = ''
        this.messages = []
    }

    updateTaskState(state) {
        this.tasks.filter(f => f.id === this.activeTaskId)[0].state = state
        this.addMessage("Task is "+ state)
        this.filteredTasks = this.tasks
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
            if(m.id === this.activeTaskId) {
                m.title = title
            }
        })
        this.messageTitle = title
        this.filterTasks = this.tasks
    }

    updateDescription(description) {
        this.tasks.map(m => {
            if(m.id === this.activeTaskId) {
                m.description = description
            }
        })
        this.messageDescription = description
        this.filterTasks = this.tasks
    }

    addTask(title) {
        this.tasks.push(
            { id: uuidv1(), title: title, state: "" }
        )
        this.filteredTasks = this.tasks
    }

    deleteTask() {
        this.tasks = this.tasks.filter(f => f.id !== this.activeTaskId)
        this.filteredTasks = this.tasks
        this.clearTask()
        this.edit = false
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
    userData: observable,
    tasks: observable,
    filteredTasks: observable,
    messages: observable,
    activeTaskId: observable,
    messageTitle: observable,
    messageDescription: observable,
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