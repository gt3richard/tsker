
const team_id = 'cba93a10-0ede-4419-9364-335faebd431d'

module.exports = {
    user0: {
        user_id: '8ed91534-1a5e-41aa-87ba-0cbd1af053ef',
        role: 'user',
        name: 'Richard Ali',
        team_id: team_id,
        status: 'active'
    },
    user1: {
        user_id: '9190e204-89f7-457e-836f-91d15448a839',
        role: 'manager',
        name: 'Kevin Ali',
        team_id: team_id,
        status: 'active'
    },
    team0: {
        team_id: team_id,
        admins: ['9190e204-89f7-457e-836f-91d15448a839'],
        members: ['8ed91534-1a5e-41aa-87ba-0cbd1af053ef'],
        name: 'Gold Team',
        status: 'active'
    },
    task0: {
        task_id: 'c094a595-603a-4fdc-857a-4dba5858dbf4',
        title: 'First Task',
        description: 'This is the first task.',
        priority: '0',
        user_id: '8ed91534-1a5e-41aa-87ba-0cbd1af053ef',
        team_id: team_id,
        status: 'active'
    },
    task1: {
        task_id: '677911a1-9134-44a9-8027-8f411d5928fc',
        title: 'Second Task',
        description: 'This is the second task.',
        priority: '1',
        user_id: '8ed91534-1a5e-41aa-87ba-0cbd1af053ef',
        team_id: team_id,
        status: 'active'
    },
    history0A: {
        task_id: 'c094a595-603a-4fdc-857a-4dba5858dbf4',
        user_id: '8ed91534-1a5e-41aa-87ba-0cbd1af053ef',
        timestamp: '2019-03-06T09:47:02Z',
        value: 'Started',
        type: 'state'
    },
    history1A: {
        task_id: 'c094a595-603a-4fdc-857a-4dba5858dbf4',
        user_id: '9190e204-89f7-457e-836f-91d15448a839',
        timestamp: '2019-03-07T03:23:00Z',
        value: 'Can you give me a status?',
        type: 'text'
    },
    history2A: {
        task_id: 'c094a595-603a-4fdc-857a-4dba5858dbf4',
        user_id: '8ed91534-1a5e-41aa-87ba-0cbd1af053ef',
        timestamp: '2019-03-07T03:25:00Z',
        value: 'Sure I can do that',
        type: 'text'
    },
    history0B: {
        task_id: '677911a1-9134-44a9-8027-8f411d5928fc',
        user_id: '8ed91534-1a5e-41aa-87ba-0cbd1af053ef',
        timestamp: '2019-03-06T15:30:00Z',
        value: 'I don\'t think I can get to this.',
        type: 'text'
    },
    getUser: function(user_id) {
        if (user_id === '8ed91534-1a5e-41aa-87ba-0cbd1af053ef') return this.user0
        else if (user_id === '9190e204-89f7-457e-836f-91d15448a839') return this.user1
        else return {}
    },
    getTeam: function(team_id) {
        if (team_id === 'cba93a10-0ede-4419-9364-335faebd431d') return this.team0
        else return {}
    },
    getTask: function(task_id) {
        if (task_id === 'c094a595-603a-4fdc-857a-4dba5858dbf4') return this.task0
        else if (task_id === '677911a1-9134-44a9-8027-8f411d5928fc') return this.task1
        else return {}
    },
    getHistory: function(task_id) {
        if (task_id === 'c094a595-603a-4fdc-857a-4dba5858dbf4') return [this.history0A, this.history2A, this.history1A]
        else if (task_id === '677911a1-9134-44a9-8027-8f411d5928fc') return [this.history0B]
        else return []
    },
    getTasks: function(team_id, user_id) {
        if (user_id === '8ed91534-1a5e-41aa-87ba-0cbd1af053ef' && team_id === 'cba93a10-0ede-4419-9364-335faebd431d') return [this.task0, this.task1]
        else return []
    }
}