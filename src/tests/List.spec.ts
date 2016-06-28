import { List, Boolean }  from '../lib/mobx-microstates';
import { assert } from 'chai';

describe('List of strings', () => {
  let dummy: List<String>;

  let strings = ['abc', '123', 'stuff'];

  beforeEach(() => {
    dummy = new List(strings);
  });

  describe('#constructor', () => {
    it('should be a List', () => {
      assert.instanceOf(dummy, List, 'dummy should be an instance of List');
    });

    it('should contain a value property, which is an array', () => {
      assert.property(dummy, 'values', 'value property should exist');
      assert.deepEqual(dummy.values.constructor['name'], "ObservableArray");
    });
  });

  describe('add', () => {
    it('should add a value to the array', () => {
      dummy.add('456');
      assert.lengthOf(dummy.values, 4, 'dummy.values should now be 4 items');
      assert.deepEqual(dummy.values[3], '456', 'add should push "456" to the end of the array');
    });
  });

  describe('remove', () => {
    it('should remove the item from the array', () => {
      let removedValue = dummy.values[1];
      let lastValue = dummy.values[2];
      dummy.remove(removedValue);
      assert.lengthOf(dummy.values, 2, 'dummy.values should now be 2 items');
      assert.notDeepEqual(dummy.values[1], removedValue, 'value[1] should now be a different value after remove');
      assert.deepEqual(dummy.values[1], lastValue, 'value[1] should now be equal to the last value');
    });

    it('should return true if the item was removed', () => {
      let targetValue = dummy.values[1];
      let removed = dummy.remove(dummy.values[1]);

      assert.isTrue(removed);
    });

    it('should leave the array unchanged and return false if the item is not found', () => {
      let removed = dummy.remove('thing');
      assert.isFalse(removed, 'removing an item that doesn\'t exist should return false');
      assert.lengthOf(dummy.values, 3), 'the array should still be 3 items after an invalid remove';
    });
  });

  describe('push', () => {
    it('should mimic List.add', () => {
      dummy.push('456');
      assert.lengthOf(dummy.values, 4, 'dummy.values should now be 4 items');
      assert.deepEqual(dummy.values[3], '456', 'add should push "456" to the end of the array');
    });

    it('should return the new length of the list', () => {
      let pushed = dummy.push('456');
      assert.lengthOf(dummy.values, pushed);
    });
  });

  describe('pop', () => {
    it('should pop the last value off the array', () => {
      dummy.pop();
      assert.lengthOf(dummy.values, 2, 'pop should reduce the length of the list by 1');
    });

    it('should return the popped value', () => {
      let lastValue = dummy.values[2];
      let popped = dummy.pop();
      assert.deepEqual(lastValue, popped, `pop didn't return the last value of the list`);
    });
  });

  describe('shift', () => {
    it('should remove the first element from the list', () => {
      dummy.shift();
      assert.lengthOf(dummy.values, 2, 'shift should reduce the length of the list by 1');
    });

    it('should return the first element of the array', () => {
      let firstValue = dummy.values[0];
      let shifted = dummy.shift();
      assert.deepEqual(firstValue, shifted, `the return value didn't match the first value in the list`)
    });
  });

  describe('unshift', () => {
    it('should add the element to the beginning of the array', () => {
      dummy.unshift('first');
      assert.lengthOf(dummy.values, 4, 'unshift should increase the length of the list by 1');
      assert.deepEqual(dummy.values[0], 'first', 'the first element of the list should match the target value');
    });

    it('should return the new length of the array', () => {
      let unshifted = dummy.unshift('first');
      assert.deepEqual(unshifted, dummy.values.length, 'unshift did not return the correct length');
    })
  });
});

describe('List of Boolean microstates', () => {
  let dummy: List<Boolean>;

  let states = [0, 1, 2].map(v => new Boolean());

  beforeEach(() => {
    dummy = new List(states);
  });

  describe('constructor', () => {
    it('should do stuff', () => {
      assert.instanceOf(dummy, List);
      assert.instanceOf(dummy.values[0], Boolean);
    });
  });
});
