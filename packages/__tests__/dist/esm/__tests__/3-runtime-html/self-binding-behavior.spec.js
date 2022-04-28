import { DI, Registration } from '@aurelia/kernel';
import { PropertyBinding, IPlatform, SelfBindingBehavior } from '@aurelia/runtime-html';
import { assert } from '@aurelia/testing';
describe('SelfBindingBehavior', function () {
    let container;
    let sut;
    let binding;
    let originalCallSource;
    // eslint-disable-next-line mocha/no-hooks
    beforeEach(function () {
        container = DI.createContainer();
        Registration.instance(IPlatform, {}).register(container);
        sut = new SelfBindingBehavior();
        binding = new PropertyBinding(undefined, undefined, undefined, undefined, undefined, container, {});
        originalCallSource = binding['callSource'] = function () { return; };
        binding['targetEvent'] = 'foo';
        sut.bind(undefined, undefined, binding);
    });
    // TODO: test properly (different binding types)
    it('bind()   should apply the correct behavior', function () {
        assert.strictEqual(binding['selfEventCallSource'] === originalCallSource, true, `binding['selfEventCallSource'] === originalCallSource`);
        assert.strictEqual(binding['callSource'] === originalCallSource, false, `binding['callSource'] === originalCallSource`);
        assert.strictEqual(typeof binding['callSource'], 'function', `typeof binding['callSource']`);
    });
    it('unbind() should revert the original behavior', function () {
        sut.unbind(undefined, undefined, binding);
        assert.strictEqual(binding['selfEventCallSource'], null, `binding['selfEventCallSource']`);
        assert.strictEqual(binding['callSource'] === originalCallSource, true, `binding['callSource'] === originalCallSource`);
    });
});
//# sourceMappingURL=self-binding-behavior.spec.js.map