var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
var Y_OFFSET = 300; // Extra pixels outside the viewport, in each direction, to render nodes in
var Y_EPSILON = 50; // Minimum pixel change required to recalculate the rendered nodes
var TreeVirtualScroll = (function () {
    function TreeVirtualScroll(treeModel) {
        var _this = this;
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = [autorun(function () { return _this.fixScroll(); })];
    }
    Object.defineProperty(TreeVirtualScroll.prototype, "y", {
        get: function () {
            return this.yBlocks * Y_EPSILON;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeVirtualScroll.prototype, "totalHeight", {
        get: function () {
            return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeVirtualScroll.prototype.fireEvent = function (event) {
        this.treeModel.fireEvent(event);
    };
    TreeVirtualScroll.prototype.init = function () {
        var _this = this;
        var fn = this.recalcPositions.bind(this);
        fn();
        this._dispose = this._dispose.concat([
            reaction(function () { return _this.treeModel.roots; }, fn),
            reaction(function () { return _this.treeModel.expandedNodeIds; }, fn),
            reaction(function () { return _this.treeModel.hiddenNodeIds; }, fn)
        ]);
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
    };
    TreeVirtualScroll.prototype.isEnabled = function () {
        return this.treeModel.options.useVirtualScroll;
    };
    TreeVirtualScroll.prototype._setYBlocks = function (value) {
        this.yBlocks = value;
    };
    TreeVirtualScroll.prototype.recalcPositions = function () {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    };
    TreeVirtualScroll.prototype._getPositionAfter = function (nodes, startPos) {
        var _this = this;
        var position = startPos;
        nodes.forEach(function (node) {
            node.position = position;
            position = _this._getPositionAfterNode(node, position);
        });
        return position;
    };
    TreeVirtualScroll.prototype._getPositionAfterNode = function (node, startPos) {
        var position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) {
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    };
    TreeVirtualScroll.prototype.clear = function () {
        this._dispose.forEach(function (d) { return d(); });
    };
    TreeVirtualScroll.prototype.setViewport = function (viewport) {
        Object.assign(this, {
            viewport: viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect().height
        });
    };
    TreeVirtualScroll.prototype.scrollIntoView = function (node, force, scrollToMiddle) {
        if (scrollToMiddle === void 0) { scrollToMiddle = true; }
        if (force ||
            node.position < this.y ||
            node.position + node.getSelfHeight() > this.y + this.viewportHeight) {
            if (this.viewport) {
                this.viewport.scrollTop = scrollToMiddle ?
                    node.position - this.viewportHeight / 2 :
                    node.position; // scroll to start
                this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
            }
        }
    };
    TreeVirtualScroll.prototype.getViewportNodes = function (nodes) {
        var _this = this;
        if (!nodes)
            return [];
        var visibleNodes = nodes.filter(function (node) { return !node.isHidden; });
        if (!this.isEnabled())
            return visibleNodes;
        if (!this.viewportHeight || !visibleNodes.length)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        var firstIndex = binarySearch(visibleNodes, function (node) {
            return (node.position + Y_OFFSET > _this.y) ||
                (node.position + node.height > _this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        var lastIndex = binarySearch(visibleNodes, function (node) {
            return node.position - Y_OFFSET > _this.y + _this.viewportHeight;
        }, firstIndex);
        var viewportNodes = [];
        for (var i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    };
    TreeVirtualScroll.prototype.fixScroll = function () {
        var maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this._setYBlocks(0);
        if (this.y > maxY)
            this._setYBlocks(maxY / Y_EPSILON);
    };
    return TreeVirtualScroll;
}());
export { TreeVirtualScroll };
TreeVirtualScroll.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TreeVirtualScroll.ctorParameters = function () { return [
    { type: TreeModel, },
]; };
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "x", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "y", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "_setYBlocks", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "recalcPositions", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "setViewport", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "scrollIntoView", null);
function binarySearch(nodes, condition, firstIndex) {
    if (firstIndex === void 0) { firstIndex = 0; }
    var index = firstIndex;
    var toIndex = nodes.length - 1;
    while (index !== toIndex) {
        var midIndex = Math.floor((index + toIndex) / 2);
        if (condition(nodes[midIndex])) {
            toIndex = midIndex;
        }
        else {
            if (index === midIndex)
                index = toIndex;
            else
                index = midIndex;
        }
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsVUFBQSxFQUFZLFFBQUEsRUFBVSxNQUFBLEVBQVEsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLE1BQUEsQ0FBTztBQUN2RSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sY0FBQSxDQUFlO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxxQkFBQSxDQUFzQjtBQUVsRCxJQUFNLFFBQUEsR0FBVyxHQUFBLENBQUksQ0FBQywyRUFBQTtBQUN0QixJQUFNLFNBQUEsR0FBWSxFQUFBLENBQUcsQ0FBQSxrRUFBQTtBQUdyQjtJQWdCRSwyQkFBb0IsU0FBb0I7UUFBeEMsaUJBR0M7UUFIbUIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWI1QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFXZCxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFYUyxzQkFBSSxnQ0FBQzthQUFMO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRVMsc0JBQUksMENBQVc7YUFBZjtZQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FB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WUFROUIsT0FBTyxHQVBHLFFBQUEsQ0FBUztRQVFyQixDQUFDO1FBQ0QsSUFBSSxDQVBDLENBQUE7WUFRSCxFQUFFLENBQUMsQ0FBQyxLQVBDLEtBQVMsUUFBQSxDQUFTO2dCQUFDLEtBQUEsR0FBUSxPQUFBLENBQVE7WUFReEMsSUFBSTtnQkFQQyxLQUFBLEdBQVEsUUFBQSxDQUFTO1FBUXhCLENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQVBDLEtBQUEsQ0FBTTtBQVFmLENBQUMiLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uLCBhdXRvcnVuLCByZWFjdGlvbiB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRSRUVfRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5cbmNvbnN0IFlfT0ZGU0VUID0gMzAwOyAvLyBFeHRyYSBwaXhlbHMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIGluIGVhY2ggZGlyZWN0aW9uLCB0byByZW5kZXIgbm9kZXMgaW5cbmNvbnN0IFlfRVBTSUxPTiA9IDUwOyAvLyBNaW5pbXVtIHBpeGVsIGNoYW5nZSByZXF1aXJlZCB0byByZWNhbGN1bGF0ZSB0aGUgcmVuZGVyZWQgbm9kZXNcblxuXG5leHBvcnQgY2xhc3MgVHJlZVZpcnR1YWxTY3JvbGwge1xuICBwcml2YXRlIF9kaXNwb3NlOiBhbnk7XG5cbiAgQG9ic2VydmFibGUgeUJsb2NrcyA9IDA7XG4gIEBvYnNlcnZhYmxlIHggPSAwO1xuICBAb2JzZXJ2YWJsZSB2aWV3cG9ydEhlaWdodCA9IG51bGw7XG4gIHZpZXdwb3J0ID0gbnVsbDtcblxuICBAY29tcHV0ZWQgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMueUJsb2NrcyAqIFlfRVBTSUxPTjtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgdG90YWxIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290ID8gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0IDogMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwpIHtcbiAgICB0cmVlTW9kZWwudmlydHVhbFNjcm9sbCA9IHRoaXM7XG4gICAgdGhpcy5fZGlzcG9zZSA9IFthdXRvcnVuKCgpID0+IHRoaXMuZml4U2Nyb2xsKCkpXTtcbiAgfVxuXG4gIGZpcmVFdmVudChldmVudCkge1xuICAgIHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IGZuID0gdGhpcy5yZWNhbGNQb3NpdGlvbnMuYmluZCh0aGlzKTtcblxuICAgIGZuKCk7XG4gICAgdGhpcy5fZGlzcG9zZSA9IFtcbiAgICAgIC4uLnRoaXMuX2Rpc3Bvc2UsXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5yb290cywgZm4pLFxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwuZXhwYW5kZWROb2RlSWRzLCBmbiksXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5oaWRkZW5Ob2RlSWRzLCBmbilcbiAgICBdO1xuICAgIHRoaXMudHJlZU1vZGVsLnN1YnNjcmliZShUUkVFX0VWRU5UUy5sb2FkTm9kZUNoaWxkcmVuLCBmbik7XG4gIH1cblxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLm9wdGlvbnMudXNlVmlydHVhbFNjcm9sbDtcbiAgfVxuXG4gIEBhY3Rpb24gcHJpdmF0ZSBfc2V0WUJsb2Nrcyh2YWx1ZSkge1xuICAgIHRoaXMueUJsb2NrcyA9IHZhbHVlO1xuICB9XG5cbiAgQGFjdGlvbiByZWNhbGNQb3NpdGlvbnMoKSB7XG4gICAgdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0ID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlcih0aGlzLnRyZWVNb2RlbC5nZXRWaXNpYmxlUm9vdHMoKSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvbkFmdGVyKG5vZGVzLCBzdGFydFBvcykge1xuICAgIGxldCBwb3NpdGlvbiA9IHN0YXJ0UG9zO1xuXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyTm9kZShub2RlLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25BZnRlck5vZGUobm9kZSwgc3RhcnRQb3MpIHtcbiAgICBsZXQgcG9zaXRpb24gPSBub2RlLmdldFNlbGZIZWlnaHQoKSArIHN0YXJ0UG9zO1xuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5pc0V4cGFuZGVkKSB7IC8vIFRCRDogY29uc2lkZXIgbG9hZGluZyBjb21wb25lbnQgYXMgd2VsbFxuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKG5vZGUudmlzaWJsZUNoaWxkcmVuLCBwb3NpdGlvbik7XG4gICAgfVxuICAgIG5vZGUuaGVpZ2h0ID0gcG9zaXRpb24gLSBzdGFydFBvcztcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2Rpc3Bvc2UuZm9yRWFjaCgoZCkgPT4gZCgpKTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0Vmlld3BvcnQodmlld3BvcnQpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgIHZpZXdwb3J0LFxuICAgICAgeDogdmlld3BvcnQuc2Nyb2xsTGVmdCxcbiAgICAgIHlCbG9ja3M6IE1hdGgucm91bmQodmlld3BvcnQuc2Nyb2xsVG9wIC8gWV9FUFNJTE9OKSxcbiAgICAgIHZpZXdwb3J0SGVpZ2h0OiB2aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICB9KTtcbiAgfVxuXG4gIEBhY3Rpb24gc2Nyb2xsSW50b1ZpZXcobm9kZSwgZm9yY2UsIHNjcm9sbFRvTWlkZGxlID0gdHJ1ZSkge1xuICAgIGlmIChmb3JjZSB8fCAvLyBmb3JjZSBzY3JvbGwgdG8gbm9kZVxuICAgICAgbm9kZS5wb3NpdGlvbiA8IHRoaXMueSB8fCAvLyBub2RlIGlzIGFib3ZlIHZpZXdwb3J0XG4gICAgICBub2RlLnBvc2l0aW9uICsgbm9kZS5nZXRTZWxmSGVpZ2h0KCkgPiB0aGlzLnkgKyB0aGlzLnZpZXdwb3J0SGVpZ2h0KSB7IC8vIG5vZGUgaXMgYmVsb3cgdmlld3BvcnRcbiAgICAgIGlmICh0aGlzLnZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMudmlld3BvcnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9NaWRkbGUgP1xuICAgICAgICAgIG5vZGUucG9zaXRpb24gLSB0aGlzLnZpZXdwb3J0SGVpZ2h0IC8gMiA6IC8vIHNjcm9sbCB0byBtaWRkbGVcbiAgICAgICAgICBub2RlLnBvc2l0aW9uOyAvLyBzY3JvbGwgdG8gc3RhcnRcblxuICAgICAgICB0aGlzLl9zZXRZQmxvY2tzKE1hdGguZmxvb3IodGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRWaWV3cG9ydE5vZGVzKG5vZGVzKSB7XG4gICAgaWYgKCFub2RlcykgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgdmlzaWJsZU5vZGVzID0gbm9kZXMuZmlsdGVyKChub2RlKSA9PiAhbm9kZS5pc0hpZGRlbik7XG5cbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHJldHVybiB2aXNpYmxlTm9kZXM7XG5cbiAgICBpZiAoIXRoaXMudmlld3BvcnRIZWlnaHQgfHwgIXZpc2libGVOb2Rlcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgIC8vIFNlYXJjaCBmb3IgZmlyc3Qgbm9kZSBpbiB0aGUgdmlld3BvcnQgdXNpbmcgYmluYXJ5IHNlYXJjaFxuICAgIC8vIExvb2sgZm9yIGZpcnN0IG5vZGUgdGhhdCBzdGFydHMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgdmlld3BvcnQgKHdpdGggYnVmZmVyKVxuICAgIC8vIE9yIHRoYXQgZW5kcyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSB2aWV3cG9ydFxuICAgIGNvbnN0IGZpcnN0SW5kZXggPSBiaW5hcnlTZWFyY2godmlzaWJsZU5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIChub2RlLnBvc2l0aW9uICsgWV9PRkZTRVQgPiB0aGlzLnkpIHx8XG4gICAgICAgICAgICAgKG5vZGUucG9zaXRpb24gKyBub2RlLmhlaWdodCA+IHRoaXMueSk7XG4gICAgfSk7XG5cbiAgICAvLyBTZWFyY2ggZm9yIGxhc3Qgbm9kZSBpbiB0aGUgdmlld3BvcnQgdXNpbmcgYmluYXJ5IHNlYXJjaFxuICAgIC8vIExvb2sgZm9yIGZpcnN0IG5vZGUgdGhhdCBzdGFydHMgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgdmlld3BvcnQgKHdpdGggYnVmZmVyKVxuICAgIGNvbnN0IGxhc3RJbmRleCA9IGJpbmFyeVNlYXJjaCh2aXNpYmxlTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gbm9kZS5wb3NpdGlvbiAtIFlfT0ZGU0VUID4gdGhpcy55ICsgdGhpcy52aWV3cG9ydEhlaWdodDtcbiAgICB9LCBmaXJzdEluZGV4KTtcblxuICAgIGNvbnN0IHZpZXdwb3J0Tm9kZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8PSBsYXN0SW5kZXg7IGkrKykge1xuICAgICAgdmlld3BvcnROb2Rlcy5wdXNoKHZpc2libGVOb2Rlc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpZXdwb3J0Tm9kZXM7XG4gIH1cblxuICBmaXhTY3JvbGwoKSB7XG4gICAgY29uc3QgbWF4WSA9IE1hdGgubWF4KDAsIHRoaXMudG90YWxIZWlnaHQgLSB0aGlzLnZpZXdwb3J0SGVpZ2h0KTtcblxuICAgIGlmICh0aGlzLnkgPCAwKSB0aGlzLl9zZXRZQmxvY2tzKDApO1xuICAgIGlmICh0aGlzLnkgPiBtYXhZKSB0aGlzLl9zZXRZQmxvY2tzKG1heFkgLyBZX0VQU0lMT04pO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFRyZWVNb2RlbCwgfSxcbl07XG59XG5cbmZ1bmN0aW9uIGJpbmFyeVNlYXJjaChub2RlcywgY29uZGl0aW9uLCBmaXJzdEluZGV4ID0gMCkge1xuICBsZXQgaW5kZXggPSBmaXJzdEluZGV4O1xuICBsZXQgdG9JbmRleCA9IG5vZGVzLmxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGluZGV4ICE9PSB0b0luZGV4KSB7XG4gICAgbGV0IG1pZEluZGV4ID0gTWF0aC5mbG9vcigoaW5kZXggKyB0b0luZGV4KSAvIDIpO1xuXG4gICAgaWYgKGNvbmRpdGlvbihub2Rlc1ttaWRJbmRleF0pKSB7XG4gICAgICB0b0luZGV4ID0gbWlkSW5kZXg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGluZGV4ID09PSBtaWRJbmRleCkgaW5kZXggPSB0b0luZGV4O1xuICAgICAgZWxzZSBpbmRleCA9IG1pZEluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXg7XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==