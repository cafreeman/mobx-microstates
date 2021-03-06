import { observable } from 'mobx';

export class Boolean {
  @observable value = false;

  toggle() {
    this.value = !this.value;
  }

  set(value: boolean) {
    if (typeof value === "boolean") {
      this.value = value;
    }
  }
}
