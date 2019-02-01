import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';
import { TREE_ACTIONS } from './models/tree-options.model';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';
import './polyfills';
var TreeModule = (function () {
    function TreeModule() {
    }
    return TreeModule;
}());
export { TreeModule };
TreeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeContent,
                    LoadingComponent,
                    TreeDropDirective,
                    TreeDragDirective,
                    TreeNodeExpanderComponent,
                    TreeNodeChildrenComponent,
                    TreeNodeDropSlot,
                    TreeNodeCollectionComponent,
                    TreeViewportComponent,
                    TreeNodeWrapperComponent,
                    TreeAnimateOpenDirective
                ],
                exports: [
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeContent,
                    LoadingComponent,
                    TreeDropDirective,
                    TreeDragDirective,
                    TreeNodeExpanderComponent,
                    TreeNodeChildrenComponent,
                    TreeNodeDropSlot,
                    TreeNodeCollectionComponent,
                    TreeViewportComponent,
                    TreeNodeWrapperComponent,
                    TreeAnimateOpenDirective
                ],
                imports: [
                    CommonModule,
                    MobxAngularModule
                ],
                providers: [
                    TreeDraggedElement
                ]
            },] },
];
/** @nocollapse */
TreeModule.ctorParameters = function () { return []; };
export { TreeModel, TreeNode, TreeDraggedElement, TreeVirtualScroll, TREE_ACTIONS, KEYS, LoadingComponent, TreeComponent, TreeNodeComponent, TreeNodeContent, TreeDropDirective, TreeDragDirective, TreeNodeExpanderComponent, TreeNodeChildrenComponent, TreeNodeDropSlot, TreeNodeCollectionComponent, TreeViewportComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hbmd1bGFyLXRyZWUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBWSxlQUFBLENBQWdCO0FBQzlDLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxjQUFBLENBQWU7QUFFakQsT0FBTyxFQUFFLFlBQUEsRUFBNkMsTUFBTyw2QkFBQSxDQUE4QjtBQUUzRixPQUFPLEVBQUUsSUFBQSxFQUFLLE1BQU8sa0JBQUEsQ0FBbUI7QUFDeEMsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLHFCQUFBLENBQXNCO0FBQ2hELE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTywwQkFBQSxDQUEyQjtBQUNwRCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxxQ0FBQSxDQUFzQztBQUN6RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxvQ0FBQSxDQUFxQztBQUN2RSxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxnQ0FBQSxDQUFpQztBQUNsRSxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sNkJBQUEsQ0FBOEI7QUFDNUQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sa0NBQUEsQ0FBbUM7QUFDckUsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTywwQ0FBQSxDQUEyQztBQUMzRSxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyw0Q0FBQSxDQUE2QztBQUM5RSxPQUFPLEVBQUUseUJBQUEsRUFBMEIsTUFBTywyQ0FBQSxDQUE0QztBQUN0RixPQUFPLEVBQUUseUJBQUEsRUFBMEIsTUFBTywyQ0FBQSxDQUE0QztBQUN0RixPQUFPLEVBQUUsMkJBQUEsRUFBNEIsTUFBTyw2Q0FBQSxDQUE4QztBQUMxRixPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTywwQ0FBQSxDQUEyQztBQUNwRixPQUFPLEVBQUUscUJBQUEsRUFBc0IsTUFBTyxzQ0FBQSxDQUF1QztBQUM3RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxrQ0FBQSxDQUFtQztBQUNyRSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxrQ0FBQSxDQUFtQztBQUNyRSxPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTywwQ0FBQSxDQUEyQztBQUVwRixPQUFPLGFBQUEsQ0FBYztBQUdyQjtJQUFBO0lBNENBLENBQUM7SUFBRCxpQkFBQztBQUFELENBNUNBLEFBNENDOztBQTVDK0IscUJBQVUsR0FBMEI7SUFDcEUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixpQkFBaUI7aUJBQ2xCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxrQkFBa0I7aUJBQ25CO2FBQ0YsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHlCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBR0YsT0FOTyxFQU9MLFNBQVMsRUFDVCxRQUFRLEVBQ1Isa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUVqQixZQUFZLEVBQ1osSUFBSSxFQUtKLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFFdEIsQ0FOQyIsImZpbGUiOiJhbmd1bGFyLXRyZWUtY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2J4QW5ndWxhck1vZHVsZSB9IGZyb20gJ21vYngtYW5ndWxhcic7XG5cbmltcG9ydCB7IFRSRUVfQUNUSU9OUywgSUFjdGlvbk1hcHBpbmcsIElBY3Rpb25IYW5kbGVyIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IElUcmVlT3B0aW9ucywgSUFsbG93RHJvcEZuLCBJQWxsb3dEcmFnRm4sIElUcmVlU3RhdGUgfSBmcm9tICcuL2RlZnMvYXBpJztcbmltcG9ydCB7IEtFWVMgfSBmcm9tICcuL2NvbnN0YW50cy9rZXlzJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgVHJlZVZpcnR1YWxTY3JvbGwgfSBmcm9tICcuL21vZGVscy90cmVlLXZpcnR1YWwtc2Nyb2xsLm1vZGVsJztcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29udGVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVEcm9wU2xvdCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY2hpbGRyZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY29sbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZURyb3BEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcm9wLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWRyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWFuaW1hdGUtb3Blbi5kaXJlY3RpdmUnO1xuXG5pbXBvcnQgJy4vcG9seWZpbGxzJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7c3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRyZWVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb250ZW50LFxuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXG4gICAgVHJlZURyYWdEaXJlY3RpdmUsXG4gICAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNoaWxkcmVuQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlRHJvcFNsb3QsXG4gICAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxuICAgIFRyZWVWaWV3cG9ydENvbXBvbmVudCxcbiAgICBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQsXG4gICAgVHJlZUFuaW1hdGVPcGVuRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmVlQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlQ29udGVudCxcbiAgICBMb2FkaW5nQ29tcG9uZW50LFxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxuICAgIFRyZWVEcmFnRGlyZWN0aXZlLFxuICAgIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCxcbiAgICBUcmVlTm9kZURyb3BTbG90LFxuICAgIFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgICBUcmVlVmlld3BvcnRDb21wb25lbnQsXG4gICAgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50LFxuICAgIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1vYnhBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRyZWVEcmFnZ2VkRWxlbWVudFxuICBdXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbn1cblxuZXhwb3J0IHtcbiAgVHJlZU1vZGVsLFxuICBUcmVlTm9kZSxcbiAgVHJlZURyYWdnZWRFbGVtZW50LFxuICBUcmVlVmlydHVhbFNjcm9sbCxcbiAgSVRyZWVPcHRpb25zLFxuICBUUkVFX0FDVElPTlMsXG4gIEtFWVMsXG4gIElBY3Rpb25NYXBwaW5nLFxuICBJQWN0aW9uSGFuZGxlcixcbiAgSUFsbG93RHJvcEZuLFxuICBJQWxsb3dEcmFnRm4sXG4gIExvYWRpbmdDb21wb25lbnQsXG4gIFRyZWVDb21wb25lbnQsXG4gIFRyZWVOb2RlQ29tcG9uZW50LFxuICBUcmVlTm9kZUNvbnRlbnQsXG4gIFRyZWVEcm9wRGlyZWN0aXZlLFxuICBUcmVlRHJhZ0RpcmVjdGl2ZSxcbiAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcbiAgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCxcbiAgVHJlZU5vZGVEcm9wU2xvdCxcbiAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxuICBUcmVlVmlld3BvcnRDb21wb25lbnQsXG4gIElUcmVlU3RhdGVcbn07XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==