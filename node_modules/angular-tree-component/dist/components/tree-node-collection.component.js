var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed, action } from 'mobx-angular';
var TreeNodeCollectionComponent = (function () {
    function TreeNodeCollectionComponent() {
        this._dispose = [];
    }
    Object.defineProperty(TreeNodeCollectionComponent.prototype, "nodes", {
        get: function () { return this._nodes; },
        set: function (nodes) { this.setNodes(nodes); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeCollectionComponent.prototype, "marginTop", {
        get: function () {
            var firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
            var relativePosition = firstNode ? firstNode.position - firstNode.parent.position - firstNode.parent.getSelfHeight() : 0;
            return relativePosition + "px";
        },
        enumerable: true,
        configurable: true
    });
    TreeNodeCollectionComponent.prototype.setNodes = function (nodes) {
        this._nodes = nodes;
    };
    TreeNodeCollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.virtualScroll = this.treeModel.virtualScroll;
        this._dispose = [
            // return node indexes so we can compare structurally,
            reaction(function () {
                return _this.virtualScroll.getViewportNodes(_this.nodes).map(function (n) { return n.index; });
            }, function (nodeIndexes) {
                _this.viewportNodes = nodeIndexes.map(function (i) { return _this.nodes[i]; });
            }, { compareStructural: true, fireImmediately: true }),
            reaction(function () { return _this.nodes; }, function (nodes) {
                _this.viewportNodes = _this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    };
    TreeNodeCollectionComponent.prototype.ngOnDestroy = function () {
        this._dispose.forEach(function (d) { return d(); });
    };
    TreeNodeCollectionComponent.prototype.trackNode = function (index, node) {
        return node.id;
    };
    return TreeNodeCollectionComponent;
}());
export { TreeNodeCollectionComponent };
TreeNodeCollectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-collection',
                encapsulation: ViewEncapsulation.None,
                template: "\n    <ng-container *mobxAutorun>\n      <div\n        [style.margin-top]=\"marginTop\">\n        <tree-node\n          *ngFor=\"let node of viewportNodes; let i = index; trackBy: trackNode\"\n          [node]=\"node\"\n          [index]=\"i\"\n          [templates]=\"templates\">\n        </tree-node>\n      </div>\n    </ng-container>\n  "
            },] },
];
/** @nocollapse */
TreeNodeCollectionComponent.ctorParameters = function () { return []; };
TreeNodeCollectionComponent.propDecorators = {
    'nodes': [{ type: Input },],
    'treeModel': [{ type: Input },],
    'templates': [{ type: Input },],
};
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate([
    observable,
    __metadata("design:type", Array)
], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate([
    computed,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], TreeNodeCollectionComponent.prototype, "marginTop", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeNodeCollectionComponent.prototype, "setNodes", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jb2xsZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUEsRUFBTyxpQkFBQSxFQUNuQixNQUFNLGVBQUEsQ0FBZ0I7QUFDdkIsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLE1BQUEsQ0FBTztBQUNoQyxPQUFPLEVBQUUsVUFBQSxFQUFZLFFBQUEsRUFBVSxNQUFBLEVBQU8sTUFBTyxjQUFBLENBQWU7QUFNNUQ7SUFBQTtRQW9CRSxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBeURoQixDQUFDO0lBM0VDLHNCQUFJLDhDQUFLO2FBQVQsY0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbkMsVUFBVSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQURQO0lBV3pCLHNCQUFJLGtEQUFTO2FBQWI7WUFDUixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0YsSUFBTSxnQkFBZ0IsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUUzSCxNQUFNLENBQUksZ0JBQWdCLE9BQUksQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUlPLDhDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw4Q0FBUSxHQUFSO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxzREFBc0Q7WUFDdEQsUUFBUSxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDO1lBQzNFLENBQUMsRUFBRSxVQUFDLFdBQVc7Z0JBQ1gsS0FBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztZQUM3RCxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUN0RDtZQUNELFFBQVEsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBVixDQUFVLEVBQUUsVUFBQyxLQUFLO2dCQUMvQixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxpREFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUUsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0NBQVMsR0FBVCxVQUFVLEtBQUssRUFBRSxJQUFJO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUE2Qkgsa0NBQUM7QUFBRCxDQTdFQSxBQTZFQzs7QUEzQk0sc0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN4QixRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLHdWQVlUO2FBQ0YsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDBDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssMENBQWMsR0FBMkM7SUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDM0IsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDL0IsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDOUIsQ0FBQztBQXJFWTtJQUFYLFVBQVU7OzJEQUFRO0FBSVA7SUFBWCxVQUFVOztrRUFBMkI7QUFFNUI7SUFBVCxRQUFROzs7NERBS1I7QUFJTztJQUFQLE1BQU07Ozs7MkRBRU4iLCJmaWxlIjoidHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQsIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlYWN0aW9uIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uIH0gZnJvbSAnbW9ieC1hbmd1bGFyJztcbmltcG9ydCB7IFRyZWVWaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBcbiAgZ2V0IG5vZGVzKCkgeyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cbiAgc2V0IG5vZGVzKG5vZGVzKSB7IHRoaXMuc2V0Tm9kZXMobm9kZXMpOyB9XG5cbiAgIHRyZWVNb2RlbDogVHJlZU1vZGVsO1xuXG4gIEBvYnNlcnZhYmxlIF9ub2RlcztcbiAgcHJpdmF0ZSB2aXJ0dWFsU2Nyb2xsOiBUcmVlVmlydHVhbFNjcm9sbDsgLy8gQ2Fubm90IGluamVjdCB0aGlzLCBiZWNhdXNlIHdlIG1pZ2h0IGJlIGluc2lkZSB0cmVlTm9kZVRlbXBsYXRlRnVsbFxuICAgdGVtcGxhdGVzO1xuXG4gIEBvYnNlcnZhYmxlIHZpZXdwb3J0Tm9kZXM6IFRyZWVOb2RlW107XG5cbiAgQGNvbXB1dGVkIGdldCBtYXJnaW5Ub3AoKTogc3RyaW5nIHtcbiAgICBjb25zdCBmaXJzdE5vZGUgPSB0aGlzLnZpZXdwb3J0Tm9kZXMgJiYgdGhpcy52aWV3cG9ydE5vZGVzLmxlbmd0aCAmJiB0aGlzLnZpZXdwb3J0Tm9kZXNbMF07XG4gICAgY29uc3QgcmVsYXRpdmVQb3NpdGlvbiA9IGZpcnN0Tm9kZSA/IGZpcnN0Tm9kZS5wb3NpdGlvbiAtIGZpcnN0Tm9kZS5wYXJlbnQucG9zaXRpb24gLSBmaXJzdE5vZGUucGFyZW50LmdldFNlbGZIZWlnaHQoKSA6IDA7XG5cbiAgICByZXR1cm4gYCR7cmVsYXRpdmVQb3NpdGlvbn1weGA7XG4gIH1cblxuICBfZGlzcG9zZSA9IFtdO1xuXG4gIEBhY3Rpb24gc2V0Tm9kZXMobm9kZXMpIHtcbiAgICB0aGlzLl9ub2RlcyA9IG5vZGVzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsID0gdGhpcy50cmVlTW9kZWwudmlydHVhbFNjcm9sbDtcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xuICAgICAgLy8gcmV0dXJuIG5vZGUgaW5kZXhlcyBzbyB3ZSBjYW4gY29tcGFyZSBzdHJ1Y3R1cmFsbHksXG4gICAgICByZWFjdGlvbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpcnR1YWxTY3JvbGwuZ2V0Vmlld3BvcnROb2Rlcyh0aGlzLm5vZGVzKS5tYXAobiA9PiBuLmluZGV4KTtcbiAgICAgIH0sIChub2RlSW5kZXhlcykgPT4ge1xuICAgICAgICAgIHRoaXMudmlld3BvcnROb2RlcyA9IG5vZGVJbmRleGVzLm1hcCgoaSkgPT4gdGhpcy5ub2Rlc1tpXSk7XG4gICAgICAgIH0sIHsgY29tcGFyZVN0cnVjdHVyYWw6IHRydWUsIGZpcmVJbW1lZGlhdGVseTogdHJ1ZSB9XG4gICAgICApLFxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy5ub2RlcywgKG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMudmlld3BvcnROb2RlcyA9IHRoaXMudmlydHVhbFNjcm9sbC5nZXRWaWV3cG9ydE5vZGVzKG5vZGVzKTtcbiAgICAgIH0pXG4gICAgXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rpc3Bvc2UuZm9yRWFjaChkID0+IGQoKSk7XG4gIH1cblxuICB0cmFja05vZGUoaW5kZXgsIG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5pZDtcbiAgfVxuXG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWNvbGxlY3Rpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm1vYnhBdXRvcnVuPlxuICAgICAgPGRpdlxuICAgICAgICBbc3R5bGUubWFyZ2luLXRvcF09XCJtYXJnaW5Ub3BcIj5cbiAgICAgICAgPHRyZWUtbm9kZVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHZpZXdwb3J0Tm9kZXM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHRyYWNrTm9kZVwiXG4gICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+XG4gICAgICAgIDwvdHJlZS1ub2RlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2Rlcyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid0cmVlTW9kZWwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ndGVtcGxhdGVzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19