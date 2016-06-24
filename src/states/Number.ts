import { observable } from 'mobx';

export class Number {
  @observable value: number;

  constructor(value: number) {
    this.value = value;
  }
}
