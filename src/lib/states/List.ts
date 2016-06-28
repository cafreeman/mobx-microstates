import { action, observable } from 'mobx';
import { IObservableArray } from 'mobx';

export class List<T> {
  @observable values: IObservableArray<T>;

  constructor(values: Array<T> = []) {
    this.values = observable(values);
  }

  @action add(item: T): void {
    this.values.push(item);
  }

  @action remove(item: T): boolean {
    return this.values.remove(item);
  }

  @action push(item: T, ...items: Array<T>): number {
    return this.values.push(item, ...items);
  }

  @action pop(): T {
    return this.values.pop();
  }

  @action shift(): T {
    return this.values.shift();
  }

  @action unshift(item: T, ...items: Array<T>): number {
    return this.values.unshift(item, ...items);
  }
}
