import { toJS } from "mobx"
import axios from 'axios'

const url = 'https://ns0nllklq0.execute-api.us-west-2.amazonaws.com/dev'

export function getUser(userId, accessToken, callback) {
    axios.get(`${url}/user?id=${userId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
    })
    .then(response => {
        if(response.status !== 200) { callback([])}
        else { 
            callback(response.data.Item)
        }
    }).catch(error => {
        console.log(error)
        callback([])
    })
}

export function getManager(team, accessToken, callback) {
    axios.get(`${url}/user?team=${team}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
    })
    .then(response => {
        if(response.status !== 200) { callback([])}
        else { 
            callback(response.data.Items)
        }
    }).catch(error => {
        console.log(error)
        callback([])
    })
}

export function putUser(userId, team, role, color, tasks, accessToken, callback) {
    const body = { 
        Item: {
            'user_id': userId,
            'team': team,
            'role': role,
            'color': color,
            'tasks': toJS(tasks)
        },
        TableName: 'tskley'
    }

    axios.put(`${url}/user`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
          }
    })
    .then(response => {
        if(response.status !== 200) { callback({})}
        else { 
            callback(response.data)
        }
    }).catch(error => {
        console.log(error)
        callback({})
    })
}

export function getTask(taskId, accessToken, callback) {
    axios.get(`${url}/task?id=${taskId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
    })
    .then(response => {
        if(response.status !== 200) { callback({"messages":[]})}
        else { 
            callback(response.data.Item)
        }
    }).catch(error => {
        console.log(error)
        callback({"messages":[]})
    })
}

export function putTask(taskId, messages, accessToken, callback) {
    const body = { 
        Item: {
            'task_id': taskId,
            'messages': toJS(messages)
        },
        TableName: 'tskley_message'
    }

    axios.put(`${url}/task`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
          }
    })
    .then(response => {
        if(response.status !== 200) { callback({})}
        else { 
            callback(response.data)
        }
    }).catch(error => {
        console.log(error)
        callback({})
    })
}
