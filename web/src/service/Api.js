import { toJS } from "mobx"
import axios from 'axios'

const url = ''

export function getTasks(userId, accessToken, callback) {
    axios.get(`${url}/task?Id=${userId}`, {
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

export function putTasks(userId, tasks, stateMode, resetMode, accessToken, callback) {
    const body = { 
        Item: {
            'user_id': userId,
            'stateMode': stateMode,
            'resetMode': resetMode,
            'tasks': toJS(tasks)
        },
        TableName: 'krontsk'
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
