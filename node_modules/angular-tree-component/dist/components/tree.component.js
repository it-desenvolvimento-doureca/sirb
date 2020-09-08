import { Component, Input, Output, EventEmitter, Renderer, ContentChild, HostListener } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import * as _ from 'lodash';
var includes = _.includes, pick = _.pick;
var TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement, renderer) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        this.renderer = renderer;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
        treeModel.subscribeToState(function (state) { return _this.stateChange.emit(state); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "state", {
        set: function (state) {
            this.treeModel.setState(state);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = this.renderer.invokeElementMethod($event.target, 'closest', ['Tree']);
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: pick(this, this.treeModel.eventNames)
        });
    };
    return TreeComponent;
}());
export { TreeComponent };
TreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'Tree, tree-root',
                providers: [TreeModel],
                styles: [],
                template: "\n    <tree-viewport>\n      <div\n        class=\"angular-tree-component\"\n        [class.node-dragging]=\"treeDraggedElement.isDragging()\"\n        [class.angular-tree-component-rtl]=\"treeModel.options.rtl\">\n        <tree-node-collection\n          *ngIf=\"treeModel.roots\"\n          [nodes]=\"treeModel.roots\"\n          [treeModel]=\"treeModel\"\n          [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n        </tree-node-collection>\n        <tree-node-drop-slot\n          class=\"empty-tree-drop-slot\"\n          *ngIf=\"treeModel.isEmptyTree()\"\n          [dropIndex]=\"0\"\n          [node]=\"treeModel.virtualRoot\">\n        </tree-node-drop-slot>\n      </div>\n    </tree-viewport>\n  "
            },] },
];
/** @nocollapse */
TreeComponent.ctorParameters = function () { return [
    { type: TreeModel, },
    { type: TreeDraggedElement, },
    { type: Renderer, },
]; };
TreeComponent.propDecorators = {
    'loadingTemplate': [{ type: ContentChild, args: ['loadingTemplate',] },],
    'treeNodeTemplate': [{ type: ContentChild, args: ['treeNodeTemplate',] },],
    'treeNodeWrapperTemplate': [{ type: ContentChild, args: ['treeNodeWrapperTemplate',] },],
    'treeNodeFullTemplate': [{ type: ContentChild, args: ['treeNodeFullTemplate',] },],
    'nodes': [{ type: Input },],
    'options': [{ type: Input },],
    'focused': [{ type: Input },],
    'state': [{ type: Input },],
    'toggleExpanded': [{ type: Output },],
    'activate': [{ type: Output },],
    'deactivate': [{ type: Output },],
    'focus': [{ type: Output },],
    'blur': [{ type: Output },],
    'updateData': [{ type: Output },],
    'initialized': [{ type: Output },],
    'moveNode': [{ type: Output },],
    'copyNode': [{ type: Output },],
    'loadNodeChildren': [{ type: Output },],
    'changeFilter': [{ type: Output },],
    'event': [{ type: Output },],
    'stateChange': [{ type: Output },],
    'onKeydown': [{ type: HostListener, args: ['body: keydown', ['$event'],] },],
    'onMousedown': [{ type: HostListener, args: ['body: mousedown', ['$event'],] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBQSxFQUFPLE1BQUEsRUFBbUIsWUFBQSxFQUFjLFFBQUEsRUFDaEMsWUFBQSxFQUEyQixZQUFBLEVBQy9DLE1BQU0sZUFBQSxDQUFnQjtBQUN2QixPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sc0JBQUEsQ0FBdUI7QUFFakQsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sc0NBQUEsQ0FBdUM7QUFJMUUsT0FBTyxLQUFLLENBQUEsTUFBTyxRQUFBLENBQVM7QUFFcEIsSUFBQSxxQkFBQSxFQUFVLGFBQUEsQ0FBWTtBQUc5QjtJQW1DRSx1QkFDUyxTQUFvQixFQUNwQixrQkFBc0MsRUFDckMsUUFBa0I7UUFINUIsaUJBT0M7UUFOUSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDckMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUV4QixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7UUFDeEUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBaENBLHNCQUFJLGdDQUFLO1FBRFYsaUNBQWlDO2FBQ2hDLFVBQVUsS0FBWSxJQUFJLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQUM1QixzQkFBSSxrQ0FBTzthQUFYLFVBQVksT0FBb0IsSUFBSSxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFdEMsc0JBQUksa0NBQU87YUFBWCxVQUFZLEtBQWM7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QUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUcsRUFBRSxFQUFFO0lBQzdFLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFHLEVBQUUsRUFBRTtDQUNoRixDQUFDIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtdmlld3BvcnQuY29tcG9uZW50JztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCB7IGluY2x1ZGVzLCBwaWNrIH0gID0gXztcblxuXG5leHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIF9ub2RlczogYW55W107XG4gIF9vcHRpb25zOiBUcmVlT3B0aW9ucztcblxuICAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgdHJlZU5vZGVGdWxsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLy8gV2lsbCBiZSBoYW5kbGVkIGluIG5nT25DaGFuZ2VzXG4gICBzZXQgbm9kZXMobm9kZXM6IGFueVtdKSB7IH07XG4gICBzZXQgb3B0aW9ucyhvcHRpb25zOiBUcmVlT3B0aW9ucykgeyB9O1xuXG4gICBzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHZhbHVlKTtcbiAgfVxuXG4gICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRTdGF0ZShzdGF0ZSk7XG4gIH1cblxuICAgdG9nZ2xlRXhwYW5kZWQ7XG4gICBhY3RpdmF0ZTtcbiAgIGRlYWN0aXZhdGU7XG4gICBmb2N1cztcbiAgIGJsdXI7XG4gICB1cGRhdGVEYXRhO1xuICAgaW5pdGlhbGl6ZWQ7XG4gICBtb3ZlTm9kZTtcbiAgIGNvcHlOb2RlO1xuICAgbG9hZE5vZGVDaGlsZHJlbjtcbiAgIGNoYW5nZUZpbHRlcjtcbiAgIGV2ZW50O1xuICAgc3RhdGVDaGFuZ2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRyZWVNb2RlbDogVHJlZU1vZGVsLFxuICAgIHB1YmxpYyB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge1xuXG4gICAgICB0cmVlTW9kZWwuZXZlbnROYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB0aGlzW25hbWVdID0gbmV3IEV2ZW50RW1pdHRlcigpKTtcbiAgICAgIHRyZWVNb2RlbC5zdWJzY3JpYmVUb1N0YXRlKChzdGF0ZSkgPT4gdGhpcy5zdGF0ZUNoYW5nZS5lbWl0KHN0YXRlKSk7XG4gIH1cblxuICBcbiAgb25LZXlkb3duKCRldmVudCkge1xuICAgIGlmICghdGhpcy50cmVlTW9kZWwuaXNGb2N1c2VkKSByZXR1cm47XG4gICAgaWYgKGluY2x1ZGVzKFsnaW5wdXQnLCAndGV4dGFyZWEnXSxcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XG5cbiAgICBjb25zdCBmb2N1c2VkTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG5cbiAgICB0aGlzLnRyZWVNb2RlbC5wZXJmb3JtS2V5QWN0aW9uKGZvY3VzZWROb2RlLCAkZXZlbnQpO1xuICB9XG5cbiAgXG4gIG9uTW91c2Vkb3duKCRldmVudCkge1xuICAgIGNvbnN0IGluc2lkZUNsaWNrID0gdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKCRldmVudC50YXJnZXQsICdjbG9zZXN0JywgWydUcmVlJ10pO1xuXG4gICAgaWYgKCFpbnNpZGVDbGljaykge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcbiAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxuICAgICAgbm9kZXM6IGNoYW5nZXMubm9kZXMgJiYgY2hhbmdlcy5ub2Rlcy5jdXJyZW50VmFsdWUsXG4gICAgICBldmVudHM6IHBpY2sodGhpcywgdGhpcy50cmVlTW9kZWwuZXZlbnROYW1lcylcbiAgICB9KTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ1RyZWUsIHRyZWUtcm9vdCcsXG4gIHByb3ZpZGVyczogW1RyZWVNb2RlbF0sXG4gIHN0eWxlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRyZWUtdmlld3BvcnQ+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYW5ndWxhci10cmVlLWNvbXBvbmVudFwiXG4gICAgICAgIFtjbGFzcy5ub2RlLWRyYWdnaW5nXT1cInRyZWVEcmFnZ2VkRWxlbWVudC5pc0RyYWdnaW5nKClcIlxuICAgICAgICBbY2xhc3MuYW5ndWxhci10cmVlLWNvbXBvbmVudC1ydGxdPVwidHJlZU1vZGVsLm9wdGlvbnMucnRsXCI+XG4gICAgICAgIDx0cmVlLW5vZGUtY29sbGVjdGlvblxuICAgICAgICAgICpuZ0lmPVwidHJlZU1vZGVsLnJvb3RzXCJcbiAgICAgICAgICBbbm9kZXNdPVwidHJlZU1vZGVsLnJvb3RzXCJcbiAgICAgICAgICBbdHJlZU1vZGVsXT1cInRyZWVNb2RlbFwiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ7XG4gICAgICAgICAgICBsb2FkaW5nVGVtcGxhdGU6IGxvYWRpbmdUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlVGVtcGxhdGU6IHRyZWVOb2RlVGVtcGxhdGUsXG4gICAgICAgICAgICB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZTogdHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUsXG4gICAgICAgICAgICB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogdHJlZU5vZGVGdWxsVGVtcGxhdGVcbiAgICAgICAgICB9XCI+XG4gICAgICAgIDwvdHJlZS1ub2RlLWNvbGxlY3Rpb24+XG4gICAgICAgIDx0cmVlLW5vZGUtZHJvcC1zbG90XG4gICAgICAgICAgY2xhc3M9XCJlbXB0eS10cmVlLWRyb3Atc2xvdFwiXG4gICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwuaXNFbXB0eVRyZWUoKVwiXG4gICAgICAgICAgW2Ryb3BJbmRleF09XCIwXCJcbiAgICAgICAgICBbbm9kZV09XCJ0cmVlTW9kZWwudmlydHVhbFJvb3RcIj5cbiAgICAgICAgPC90cmVlLW5vZGUtZHJvcC1zbG90PlxuICAgICAgPC9kaXY+XG4gICAgPC90cmVlLXZpZXdwb3J0PlxuICBgXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFRyZWVNb2RlbCwgfSxcbnt0eXBlOiBUcmVlRHJhZ2dlZEVsZW1lbnQsIH0sXG57dHlwZTogUmVuZGVyZXIsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidsb2FkaW5nVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsnbG9hZGluZ1RlbXBsYXRlJywgXSB9LF0sXG4ndHJlZU5vZGVUZW1wbGF0ZSc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZCwgYXJnczogWyd0cmVlTm9kZVRlbXBsYXRlJywgXSB9LF0sXG4ndHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsndHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUnLCBdIH0sXSxcbid0cmVlTm9kZUZ1bGxUZW1wbGF0ZSc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZCwgYXJnczogWyd0cmVlTm9kZUZ1bGxUZW1wbGF0ZScsIF0gfSxdLFxuJ25vZGVzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nZm9jdXNlZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidzdGF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid0b2dnbGVFeHBhbmRlZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nYWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2RlYWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2ZvY3VzJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidibHVyJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbid1cGRhdGVEYXRhJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidpbml0aWFsaXplZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nbW92ZU5vZGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2NvcHlOb2RlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidsb2FkTm9kZUNoaWxkcmVuJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidjaGFuZ2VGaWx0ZXInOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2V2ZW50JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidzdGF0ZUNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25LZXlkb3duJzogW3sgdHlwZTogSG9zdExpc3RlbmVyLCBhcmdzOiBbJ2JvZHk6IGtleWRvd24nLCBbJyRldmVudCddLCBdIH0sXSxcbidvbk1vdXNlZG93bic6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydib2R5OiBtb3VzZWRvd24nLCBbJyRldmVudCddLCBdIH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==