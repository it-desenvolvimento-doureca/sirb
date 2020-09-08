import { Component, Input, ViewEncapsulation } from '@angular/core';
var TreeNodeExpanderComponent = (function () {
    function TreeNodeExpanderComponent() {
    }
    return TreeNodeExpanderComponent;
}());
export { TreeNodeExpanderComponent };
TreeNodeExpanderComponent.decorators = [
    { type: Component, args: [{
                selector: 'TreeNodeExpander, tree-node-expander',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                template: "\n    <ng-container *mobxAutorun>\n      <span\n        *ngIf=\"node.hasChildren\"\n        [class.toggle-children-wrapper-expanded]=\"node.isExpanded\"\n        [class.toggle-children-wrapper-collapsed]=\"node.isCollapsed\"\n        class=\"toggle-children-wrapper\"\n        (click)=\"node.mouseAction('expanderClick', $event)\">\n\n        <span class=\"toggle-children\"></span>\n      </span>\n      <span\n        *ngIf=\"!node.hasChildren\"\n        class=\"toggle-children-placeholder\">\n      </span>\n    </ng-container>\n  "
            },] },
];
/** @nocollapse */
TreeNodeExpanderComponent.ctorParameters = function () { return []; };
TreeNodeExpanderComponent.propDecorators = {
    'node': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxLQUFBLEVBQU8saUJBQUEsRUFBa0IsTUFBTyxlQUFBLENBQWdCO0FBSXBFO0lBQUE7SUFnQ0EsQ0FBQztJQUFELGdDQUFDO0FBQUQsQ0FoQ0EsQUFnQ0M7O0FBOUJNLG9DQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSx5aEJBZ0JUO2FBQ0YsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHdDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssd0NBQWMsR0FBMkM7SUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDekIsQ0FBQyIsImZpbGUiOiJ0cmVlLW5vZGUtZXhwYW5kZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5cbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50IHtcbiAgIG5vZGU6IFRyZWVOb2RlO1xuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ1RyZWVOb2RlRXhwYW5kZXIsIHRyZWUtbm9kZS1leHBhbmRlcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbW9ieEF1dG9ydW4+XG4gICAgICA8c3BhblxuICAgICAgICAqbmdJZj1cIm5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBbY2xhc3MudG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXItZXhwYW5kZWRdPVwibm9kZS5pc0V4cGFuZGVkXCJcbiAgICAgICAgW2NsYXNzLnRvZ2dsZS1jaGlsZHJlbi13cmFwcGVyLWNvbGxhcHNlZF09XCJub2RlLmlzQ29sbGFwc2VkXCJcbiAgICAgICAgY2xhc3M9XCJ0b2dnbGUtY2hpbGRyZW4td3JhcHBlclwiXG4gICAgICAgIChjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdleHBhbmRlckNsaWNrJywgJGV2ZW50KVwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuXCI+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCIhbm9kZS5oYXNDaGlsZHJlblwiXG4gICAgICAgIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuLXBsYWNlaG9sZGVyXCI+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19