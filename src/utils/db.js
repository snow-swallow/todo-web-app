import { Store, get, set } from 'idb-keyval';

const DB_NAME = 'TODO_APP';

export default class IDB {
  constructor() {
    this.todoStorage = new Store(DB_NAME, DB_NAME);
  }

  get = (name) => {
    return get(name, this.todoStorage);
  }
  
  set = (name, val) => {
    return set(name, val, this.todoStorage);
  }
}