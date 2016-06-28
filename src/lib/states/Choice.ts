import { observable, action } from 'mobx';
import { IObservableArray } from 'mobx';

export interface Choice<T> {
  options: IObservableArray<Option<T>>
  selection: T | Array<T>
  toggle(option: Option<T>, isSelected?: boolean): void
}

export class Option<T> {
  @observable value: T;
  @observable isSelected: boolean;
  @observable parent: Choice<T>;

  constructor(value: T, isSelected = false, parent: Choice<T>) {
    this.value = value;
    this.isSelected = isSelected;
    this.parent = parent;
  }

  @action toggle = (status = !this.isSelected) => {
    this.parent.toggle(this, status);
  }
}

export class SingleChoice<T> implements Choice<T> {
  @observable options: IObservableArray<Option<T>>
  constructor(list: Array<T>) {
    let values = list.map(v => new Option(v, false, this));
    this.options = observable(values);
  }

  get selection(): T {
    let selectedOption = this.options.find(o => o.isSelected);

    return selectedOption ? selectedOption.value : null;
  }

  @action toggle = (option: Option<T>, isSelected: boolean = !option.isSelected) => {
    this.options.forEach(o => {
      o.isSelected = (o === option && isSelected);
    });
  }
}

export class MultipleChoice<T> implements Choice<T> {
  @observable options: IObservableArray<Option<T>>
  constructor(list: Array<T>) {
    let values = list.map(v => new Option(v, false, this));
    this.options = observable(values);
  }

  get selection(): Array<T> {
    return this.options
               .filter(o => o.isSelected)
               .map(v => v.value);
  }

  @action toggle = (option) => {
    this.options.forEach(o => {
      if (o === option) {
        o.isSelected = !o.isSelected;
      }
    });
  }
}
