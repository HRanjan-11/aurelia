import { LifecycleFlags } from '@aurelia/runtime';
import { IRenderLocation } from '../../dom';
import { ISyntheticView, ICustomAttributeController, ICustomAttributeViewModel, IHydratedController, IHydratedParentController, ControllerVisitor } from '../../lifecycle';
import { IViewFactory } from '../../templating/view';
export declare class With implements ICustomAttributeViewModel {
    private readonly factory;
    private readonly location;
    readonly id: number;
    view: ISyntheticView;
    readonly $controller: ICustomAttributeController<this>;
    value?: object;
    constructor(factory: IViewFactory, location: IRenderLocation);
    valueChanged(newValue: unknown, oldValue: unknown, flags: LifecycleFlags): void;
    afterAttach(initiator: IHydratedController, parent: IHydratedParentController, flags: LifecycleFlags): void | Promise<void>;
    afterUnbind(initiator: IHydratedController, parent: IHydratedParentController, flags: LifecycleFlags): void | Promise<void>;
    private activateView;
    onCancel(initiator: IHydratedController, parent: IHydratedParentController, flags: LifecycleFlags): void;
    dispose(): void;
    accept(visitor: ControllerVisitor): void | true;
}
//# sourceMappingURL=with.d.ts.map