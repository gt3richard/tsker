import {decorate, observable, action} from 'mobx';
import axios from 'axios';

const API = 'http://localhost:8001'

class TskleyStore {
    teamName = 'Gold Team'
    user = {}
    userName = ''

    getUser(id) {
      axios.get(`${API}/user?id=${id}`)
      .then(response => {
        console.log(response.data)
        this.user = response.data
        this.userName = response.data.name
      })
      .catch(function (error) {
        console.log(error);
      })
    }
}

decorate(TskleyStore, {
  teamName: observable,
  user: observable,
  userName: observable,
  getUser: action
})

const store = new TskleyStore();
export default store
export { TskleyStore };