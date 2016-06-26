import { MultipleChoice } from '../lib/main';
import { assert } from 'chai';

describe('MultipleChoice<string>', () => {
  let dummy: MultipleChoice<string>;

  let strings = ['abc', '123', 'stuff'];

  beforeEach(() => {
    dummy = new MultipleChoice(strings);
  });

  describe('#constructor', () => {
    it('should be a SingleChoice', () => {
      assert.instanceOf(dummy, MultipleChoice, 'dummy should be an instance of MultipleChoice');
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

  describe('toggle on MultipleChoice', () => {
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

    it('should allow multiple selections at a time', () => {
      dummy.toggle(dummy.options[1]);
      assert.isTrue(dummy.options[1].isSelected);

      dummy.toggle(dummy.options[2]);
      assert.isTrue(dummy.options[1].isSelected, 'original selection should still be selected');
      assert.isTrue(dummy.options[2].isSelected, 'new selection did not toggle correctly');

      dummy.toggle(dummy.options[2]);
      assert.isTrue(dummy.options[1].isSelected, 'original selection should not have been changed')
      assert.isFalse(dummy.options[2].isSelected, 'de-selected option is still selected')
    });
  });

  describe('MultipleChoice.selection', () => {
    it('should return an empty array if no item is selected', () => {
      let selection = dummy.selection;
      assert.deepEqual(selection, [], 'dummy.selection did not return an empty array when no items were selected');
    });

    it('should return the selected Option if one is selected', () => {
      let testSelectionArray = [ dummy.options[1].value, dummy.options[2].value ];
      dummy.toggle(dummy.options[1]);
      dummy.toggle(dummy.options[2]);
      let selection = dummy.selection;
      assert.deepEqual(testSelectionArray, selection, 'selected did not return the selected values');
    });
  });
});
