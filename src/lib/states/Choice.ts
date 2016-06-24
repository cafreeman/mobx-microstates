import { observable, action } from 'mobx';
import { IObservableArray } from 'mobx';

export class Choice<Option> {
  @observable options: IObservableArray<Option>

  constructor(list: Array<Option> = []) {
    this.options = observable(list);
  }
}

export class Option<T> {
  @observable value: T;
  @observable isSelected: boolean;

  constructor(value: T, isSelected = false) {
    this.value = value;
    this.isSelected = isSelected;
  }

  @action toggle() {
    this.isSelected = !this.isSelected;
  }
}

export class SingleChoice<T> extends Choice<Option<T>> {
  constructor(list: Array<T>) {
    let values = list.map(v => new Option(v, false));
    super(values);
  }

  @action toggle(option) {
    this.options[option].toggle();
  }

  get selection(): T {
    let selectedOption = this.options.find(o => o.isSelected);

    return selectedOption ? selectedOption.value : null;
  }
}

export class MultipleChoice<T> extends Choice<Option<T>> {
  constructor(list: Array<T>) {
    let values = list.map(v => new Option(v, false));
    super(values);
  }

  get selection(): Array<T> {
    return this.options
               .filter(o => o.isSelected)
               .map(v => v.value);
  }

  @action toggle(option) {
    this.options[option].toggle();
  }
}
