import {makeAutoObservable} from "mobx"

class User {
  user = {}
  constructor() {
    makeAutoObservable(this)
  }

  saveUser(userData) {
    this.user = userData
  }
}

export default new User();