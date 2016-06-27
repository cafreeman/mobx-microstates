import { action, observable } from 'mobx';
import { IObservableArray } from 'mobx';

export class List<T> {
  @observable value: IObservableArray<T>;

  constructor(value: Array<T> = []) {
    this.value = observable(value);
  }

  @action add(item: T): void {
    this.value.push(item);
  }

  @action remove(item: T): boolean {
    return this.value.remove(item);
  }

  @action push(item: T, ...items: Array<T>): number {
    return this.value.push(item, ...items);
  }

  @action pop(): T {
    return this.value.pop();
  }

  @action shift(): T {
    return this.value.shift();
  }

  @action unshift(item: T, ...items: Array<T>): number {
    return this.value.unshift(item, ...items);
  }
}
