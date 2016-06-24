import { action, observable } from 'mobx';
import { IObservableArray } from 'mobx';

export class List<T> {
  @observable value: IObservableArray<T>;

  constructor(value: Array<T> = []) {
    this.value = observable(value);
  }

  @action add(item) {
    this.value.concat(item);
  }

  @action remove(item) {
    this.value.remove(item);
  }

  @action push(item) {
    this.value.push(item);
  }

  @action pop() {
    this.value.pop();
  }

  @action shift() {
    this.value.shift();
  }

  @action unshift() {
    this.value.unshift();
  }
}
