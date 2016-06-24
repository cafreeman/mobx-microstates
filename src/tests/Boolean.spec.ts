import { assert } from 'chai';
import { Boolean } from '../lib/main';

describe('Boolean', () => {
  let dummy: Boolean;

  beforeEach(() => {
    dummy = new Boolean();
  });

  describe('#constructor', () => {
    it('should be a boolean', () => {
      assert.instanceOf(dummy, Boolean, 'dummy is an instance of Boolean class');
    });

    it('should start as false', () => {
      assert.isFalse(dummy.value, 'boolean does not start as false');
    });
  });

  describe('set boolean value', () => {
    it('should be set to true', () => {
      dummy.set(true);
      assert.isTrue(dummy.value, 'setting value to true fails');
    });

    it('should be set to false', () => {
      dummy.set(false);
      assert.isFalse(dummy.value, 'setting value to false fails');
    });

    it('should error when set to string', () => {
      let originalValue = dummy.value;
      dummy.set('a string')
      assert.notEqual(dummy.value, 'a string', 'dummy should not be set to "a string"');
      assert.equal(dummy.value, originalValue, 'dummy should still be the same as the original value');
    })
  });

  describe('toggle boolean', () => {
    it('should toggle from false to true and back', () => {
      dummy.toggle();
      assert.isTrue(dummy.value, "boolean didn't toggle correctly from false to true");
      dummy.toggle();
      assert.isFalse(dummy.value, "boolean didn't toggle correctly from true to false");
    });
  });
});
