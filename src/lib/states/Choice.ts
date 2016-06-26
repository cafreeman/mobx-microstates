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

  @action toggle(status = !this.isSelected) {
    this.isSelected = status;
  }
}

export class SingleChoice<T> extends Choice<Option<T>> {
  constructor(list: Array<T>) {
    let values = list.map(v => new Option(v, false));
    super(values);
  }

  @action toggle(option: Option<T>, isSelected: boolean = !option.isSelected) {
    this.options.forEach(o => {
      o.toggle(o === option && isSelected);
    });
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
    this.options.forEach(o => {
      if (o === option) {
        o.toggle();
      }
    });
  }
}
