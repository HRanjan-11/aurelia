import { LifecycleFlags } from '@aurelia/runtime';
import { IRenderLocation } from '../../dom';
import { IViewFactory } from '../../templating/view';
import type { ISyntheticView, ICustomAttributeController, ICustomAttributeViewModel, IHydratedController, IHydratedParentController, ControllerVisitor } from '../../templating/controller';
declare abstract class FlagsTemplateController implements ICustomAttributeViewModel {
    readonly id: number;
    view: ISyntheticView;
    readonly $controller: ICustomAttributeController<this>;
    constructor(factory: IViewFactory, location: IRenderLocation, 
    /** @internal */ _flags: LifecycleFlags);
    attaching(initiator: IHydratedController, parent: IHydratedParentController, flags: LifecycleFlags): void | Promise<void>;
    detaching(initiator: IHydratedController, parent: IHydratedParentController, flags: LifecycleFlags): void | Promise<void>;
    dispose(): void;
    accept(visitor: ControllerVisitor): void | true;
}
export declare class FrequentMutations extends FlagsTemplateController {
    constructor(factory: IViewFactory, location: IRenderLocation);
}
export declare class ObserveShallow extends FlagsTemplateController {
    constructor(factory: IViewFactory, location: IRenderLocation);
}
export {};
//# sourceMappingURL=flags.d.ts.map