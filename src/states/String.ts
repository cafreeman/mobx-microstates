import { observable } from 'mobx';

export class String {
  @observable value: string;

  constructor(value: string = '') {
    this.value = value;
  }
}
