import {makeAutoObservable} from "mobx"

class User {
  user = {}
  constructor() {
    makeAutoObservable(this)
  }

  saveUser(userData) {
    console.log(userData)
    this.user = userData
    console.log(this.user, '!!!')
  }
}

export default new User();