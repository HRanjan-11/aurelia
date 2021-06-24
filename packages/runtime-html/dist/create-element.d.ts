import { Constructable, IContainer, Key } from '@aurelia/kernel';
import { IInstruction } from './renderer.js';
import { IPlatform } from './platform.js';
import { CustomElementDefinition } from './resources/custom-element.js';
import { IRenderContext } from './templating/render-context.js';
import { IViewFactory } from './templating/view.js';
import type { ISyntheticView } from './templating/controller.js';
export declare function createElement<C extends Constructable = Constructable>(p: IPlatform, tagOrType: string | C, props?: Record<string, string | IInstruction>, children?: ArrayLike<unknown>): RenderPlan;
/**
 * RenderPlan. Todo: describe goal of this class
 */
export declare class RenderPlan {
    private readonly node;
    private readonly instructions;
    private readonly dependencies;
    private lazyDefinition?;
    private readonly childFor;
    constructor(node: Node, instructions: IInstruction[][], dependencies: Key[]);
    get definition(): CustomElementDefinition;
    getContext(container: IContainer): IRenderContext;
    createView(parentContainer: IContainer): ISyntheticView;
    getViewFactory(parentContainer: IContainer): IViewFactory;
}
//# sourceMappingURL=create-element.d.ts.map