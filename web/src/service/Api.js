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

export function putUser(userId, team, role, tasks, accessToken, callback) {
    const body = { 
        Item: {
            'user_id': userId,
            'team': team,
            'role': role,
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
