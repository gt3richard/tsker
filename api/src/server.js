const express        = require('express')
const bodyParser     = require('body-parser')
const data           = require('./data.js')
const app            = express()


// FUNCTIONS
// - Get User info
// - Get Team info
// - Get Team members
// - Get All Task for User
// - Get Task info for User
// - Get History info for Task


// FLOW
// Login 
// -> get User(user_id) 
// -> get Team (team_id) 
// -> get TaskList(team_id, user_id) 
// -> get Task(task_id)
// -> get TaskHistory(task_id)


// var user = {
//     user_id: 'user_id',
//     role: 'role',
//     name: 'name',
//     team_id: 'team_id',
//     status: 'status'
// }
app.get('/user', (req, res) => {
    const result = data.getUser(req.query.id)
    res.send(result)
})


// var team = {
//     team_id: 'team_id',
//     admins: ['user_id'],
//     members: ['user_id'],
//     name: 'name',
//     status: 'status'
// }
app.get('/team', (req, res) => {
    const result = data.getTeam(req.query.id)
    res.send(result)
})


// var task = {
//     task_id: 'task_id',
//     title: 'title',
//     description: 'description',
//     priority: 'priority',
//     user_id: 'user_id',
//     team_id: 'team_id',
//     status: 'status'
// }
app.get('/task', (req, res) => {
    const result = data.getTask(req.query.id)
    res.send(result)
})


// var history = [
//     {
//         task_id: 'task_id',
//         user_id: 'user_id
//         timestamp: 'timestamp',
//         value: 'value',
//         type: 'type'
//     }
// ]
app.get('/task/history', (req, res) => {
    const result = data.getHistory(req.query.id)
    res.send(result)
})


// var tasks = [
//     {
//         task_id: 'task_id',
//         priority: 'priority'
//     }
// ]
app.get('/task/list', (req, res) => {
    const result = data.getTasks(req.query.team_id, req.query.user_id)
    res.send(result)
})

app.get('/health', (req, res) => res.send(200))

const port = 8001
app.listen(port, () => console.log(`Listening on port ${port}`));