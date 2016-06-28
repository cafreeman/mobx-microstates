import { SingleChoice } from '../lib/mobx-microstates';
import { assert } from 'chai';

describe('SingleChoice<string>', () => {
  let dummy: SingleChoice<string>;

  let strings = ['abc', '123', 'stuff'];

  beforeEach(() => {
    dummy = new SingleChoice(strings);
  });

  describe('#constructor', () => {
    it('should be a SingleChoice', () => {
      assert.instanceOf(dummy, SingleChoice, 'dummy should be an instance of SingleChoice');
    });

    it('should contain an options property, which is an array of Option', () => {
      assert.property(dummy, 'options', 'value property should exist');
      assert.deepEqual(dummy.options.constructor['name'], "ObservableArray");

      let firstOption = dummy.options[0];

      assert.property(firstOption, 'value', 'Option does not contain a value property');
      assert.deepEqual(firstOption.constructor['name'], 'Option',
        'each element of SingleChoice should be an option'
      );
      assert.isFalse(firstOption.isSelected, 'Option should start out as not selected');
    });
  });

  describe('toggle on SingleChoice', () => {
    it('should toggle the value of selected between true and false', () => {
      dummy.options[0].toggle();
      assert.isTrue(dummy.options[0].isSelected);
      dummy.options[0].toggle();
      assert.isFalse(dummy.options[0].isSelected);
    });

    it('should toggle the specified Option', () => {
      let firstOption = dummy.options[1];
      dummy.toggle(firstOption);
      assert.isTrue(dummy.options[1].isSelected);
    });

    it('should only allow one option to be selected at a time', () => {
      dummy.toggle(dummy.options[1]);
      assert.isTrue(dummy.options[1].isSelected);

      dummy.toggle(dummy.options[2]);
      assert.isFalse(dummy.options[1].isSelected, 'toggle did not reset the original selection to false');
      assert.isTrue(dummy.options[2].isSelected, 'toggle did not correctly set the new selection to true');

      dummy.toggle(dummy.options[2]);
      assert.lengthOf(dummy.options.filter(o => o.isSelected), 0, 'de-selecting the selected item should leave all elements un-selected');
    });
  });

  describe('toggle on Option', () => {
    it('should toggle the option itself', () => {
      assert.isNull(dummy.selection);
      dummy.options[0].toggle();
      assert.isTrue(dummy.options[0].isSelected);
      assert.isNotNull(dummy.selection);
      assert.equal(dummy.selection, 'abc');
    });

    it('should only allow one option to be selected at a time', () => {
      dummy.options[0].toggle();
      assert.deepEqual(dummy.selection, 'abc');
      assert.isTrue(dummy.options[0].isSelected);

      dummy.options[1].toggle();
      assert.isTrue(dummy.options[1].isSelected);
      console.log(dummy.selection);
      assert.deepEqual(dummy.selection, '123', 'the SingleChoice selection was not updated correctly');
      assert.isFalse(dummy.options[0].isSelected);
    })
  });

  describe('SingleChoice.selection', () => {
    it('should return null if no item is selected', () => {
      let selection = dummy.selection;
      assert.isNull(selection, 'dummy.selection did not return null when no items were selected');
    });

    it('should return the selected Option if one is selected', () => {
      let testSelectionValue = dummy.options[1].value;
      dummy.toggle(dummy.options[1]);
      let selection = dummy.selection;
      assert.deepEqual(testSelectionValue, selection, 'selection does not return the selected value');
    });
  });
});
