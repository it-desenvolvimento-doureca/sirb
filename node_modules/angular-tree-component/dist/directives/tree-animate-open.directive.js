import { Directive, Input, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
var EASE_ACCELERATION = 1.005;
var TreeAnimateOpenDirective = (function () {
    function TreeAnimateOpenDirective(renderer, templateRef, viewContainerRef) {
        this.renderer = renderer;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TreeAnimateOpenDirective.prototype, "isOpen", {
        set: function (value) {
            if (value) {
                this._show();
                if (this.isEnabled && this._isOpen === false) {
                    this._animateOpen();
                }
            }
            else {
                this.isEnabled ? this._animateClose() : this._hide();
            }
            this._isOpen = !!value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    TreeAnimateOpenDirective.prototype._show = function () {
        if (this.innerElement)
            return;
        // create child view
        this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
    };
    TreeAnimateOpenDirective.prototype._hide = function () {
        this.viewContainerRef.clear();
        this.innerElement = null;
    };
    TreeAnimateOpenDirective.prototype._animateOpen = function () {
        var _this = this;
        var delta = this.animateSpeed;
        var ease = this.animateAcceleration;
        var maxHeight = 0;
        // set height to 0
        this.renderer.setElementStyle(this.innerElement, 'max-height', "0");
        // increase maxHeight until height doesn't change
        setTimeout(function () {
            var i = setInterval(function () {
                if (!_this._isOpen || !_this.innerElement)
                    return clearInterval(i);
                maxHeight += delta;
                var roundedMaxHeight = Math.round(maxHeight);
                _this.renderer.setElementStyle(_this.innerElement, 'max-height', roundedMaxHeight + "px");
                var height = _this.innerElement.getBoundingClientRect().height; // TBD use renderer
                delta *= ease;
                ease *= EASE_ACCELERATION;
                if (height < roundedMaxHeight) {
                    // Make maxHeight auto because animation finished and container might change height later on
                    _this.renderer.setElementStyle(_this.innerElement, 'max-height', null);
                    clearInterval(i);
                }
            }, 17);
        });
    };
    TreeAnimateOpenDirective.prototype._animateClose = function () {
        var _this = this;
        if (!this.innerElement)
            return;
        var delta = this.animateSpeed;
        var ease = this.animateAcceleration;
        var height = this.innerElement.getBoundingClientRect().height; // TBD use renderer
        // slowly decrease maxHeight to 0, starting from current height
        var i = setInterval(function () {
            if (_this._isOpen || !_this.innerElement)
                return clearInterval(i);
            height -= delta;
            _this.renderer.setElementStyle(_this.innerElement, 'max-height', height + "px");
            delta *= ease;
            ease *= EASE_ACCELERATION;
            if (height <= 0) {
                // after animation complete - remove child element
                _this.viewContainerRef.clear();
                _this.innerElement = null;
                clearInterval(i);
            }
        }, 17);
    };
    return TreeAnimateOpenDirective;
}());
export { TreeAnimateOpenDirective };
TreeAnimateOpenDirective.decorators = [
    { type: Directive, args: [{
                selector: '[treeAnimateOpen]'
            },] },
];
/** @nocollapse */
TreeAnimateOpenDirective.ctorParameters = function () { return [
    { type: Renderer, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
]; };
TreeAnimateOpenDirective.propDecorators = {
    'animateSpeed': [{ type: Input, args: ['treeAnimateOpenSpeed',] },],
    'animateAcceleration': [{ type: Input, args: ['treeAnimateOpenAcceleration',] },],
    'isEnabled': [{ type: Input, args: ['treeAnimateOpenEnabled',] },],
    'isOpen': [{ type: Input, args: ['treeAnimateOpen',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtYW5pbWF0ZS1vcGVuLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUEsRUFBcUIsUUFBQSxFQUN2QixXQUFBLEVBQWEsZ0JBQUEsRUFDdkIsTUFBTSxlQUFBLENBQWdCO0FBRXZCLElBQU0saUJBQUEsR0FBb0IsS0FBQSxDQUFNO0FBR2hDO0lBc0JFLGtDQUNVLFFBQWtCLEVBQ2xCLFdBQTZCLEVBQzdCLGdCQUFrQztRQUZsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQWpCaEQsc0JBQUksNENBQU07YUFBVixVQUFXLEtBQWM7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkQsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFTTSx3Q0FBSyxHQUFiO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUU5QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJ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bnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBSZW5kZXJlciwgRWxlbWVudFJlZixcbiAgRG9DaGVjaywgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEVBU0VfQUNDRUxFUkFUSU9OID0gMS4wMDU7XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbjtcblxuICAgYW5pbWF0ZVNwZWVkOiBudW1iZXI7XG4gICBhbmltYXRlQWNjZWxlcmF0aW9uOiBudW1iZXI7XG4gICBpc0VuYWJsZWQ6IGJvb2xlYW47XG5cbiAgXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCAmJiB0aGlzLl9pc09wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGVPcGVuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNFbmFibGVkID8gdGhpcy5fYW5pbWF0ZUNsb3NlKCkgOiB0aGlzLl9oaWRlKCk7XG4gICAgfVxuICAgIHRoaXMuX2lzT3BlbiA9ICEhdmFsdWU7XG4gIH07XG5cbiAgcHJpdmF0ZSBpbm5lckVsZW1lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcixcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBwcml2YXRlIF9zaG93KCkge1xuICAgIGlmICh0aGlzLmlubmVyRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgLy8gY3JlYXRlIGNoaWxkIHZpZXdcbiAgICB0aGlzLmlubmVyRWxlbWVudCA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZikucm9vdE5vZGVzWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZSgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICB0aGlzLmlubmVyRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRlT3BlbigpIHtcbiAgICBsZXQgZGVsdGEgPSB0aGlzLmFuaW1hdGVTcGVlZDtcbiAgICBsZXQgZWFzZSA9IHRoaXMuYW5pbWF0ZUFjY2VsZXJhdGlvbjtcbiAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcblxuICAgIC8vIHNldCBoZWlnaHQgdG8gMFxuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuaW5uZXJFbGVtZW50LCAnbWF4LWhlaWdodCcsIGAwYCk7XG5cbiAgICAvLyBpbmNyZWFzZSBtYXhIZWlnaHQgdW50aWwgaGVpZ2h0IGRvZXNuJ3QgY2hhbmdlXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIEFsbG93IGlubmVyIGVsZW1lbnQgdG8gY3JlYXRlIGl0cyBjb250ZW50XG4gICAgICBjb25zdCBpID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzT3BlbiB8fCAhdGhpcy5pbm5lckVsZW1lbnQpIHJldHVybiBjbGVhckludGVydmFsKGkpO1xuXG4gICAgICAgIG1heEhlaWdodCArPSBkZWx0YTtcbiAgICAgICAgY29uc3Qgcm91bmRlZE1heEhlaWdodCA9IE1hdGgucm91bmQobWF4SGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBgJHtyb3VuZGVkTWF4SGVpZ2h0fXB4YCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDsgLy8gVEJEIHVzZSByZW5kZXJlclxuXG4gICAgICAgIGRlbHRhICo9IGVhc2U7XG4gICAgICAgIGVhc2UgKj0gRUFTRV9BQ0NFTEVSQVRJT047XG4gICAgICAgIGlmIChoZWlnaHQgPCByb3VuZGVkTWF4SGVpZ2h0KSB7XG4gICAgICAgICAgLy8gTWFrZSBtYXhIZWlnaHQgYXV0byBiZWNhdXNlIGFuaW1hdGlvbiBmaW5pc2hlZCBhbmQgY29udGFpbmVyIG1pZ2h0IGNoYW5nZSBoZWlnaHQgbGF0ZXIgb25cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBudWxsKTtcbiAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICB9XG4gICAgICB9LCAxNyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlubmVyRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgbGV0IGRlbHRhID0gdGhpcy5hbmltYXRlU3BlZWQ7XG4gICAgbGV0IGVhc2UgPSB0aGlzLmFuaW1hdGVBY2NlbGVyYXRpb247XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDsgLy8gVEJEIHVzZSByZW5kZXJlclxuXG4gICAgLy8gc2xvd2x5IGRlY3JlYXNlIG1heEhlaWdodCB0byAwLCBzdGFydGluZyBmcm9tIGN1cnJlbnQgaGVpZ2h0XG4gICAgY29uc3QgaSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc09wZW4gfHwgIXRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm4gY2xlYXJJbnRlcnZhbChpKTtcblxuICAgICAgaGVpZ2h0IC09IGRlbHRhO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gICAgICBkZWx0YSAqPSBlYXNlO1xuICAgICAgZWFzZSAqPSBFQVNFX0FDQ0VMRVJBVElPTjtcblxuICAgICAgaWYgKGhlaWdodCA8PSAwKSB7XG4gICAgICAgIC8vIGFmdGVyIGFuaW1hdGlvbiBjb21wbGV0ZSAtIHJlbW92ZSBjaGlsZCBlbGVtZW50XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgICB0aGlzLmlubmVyRWxlbWVudCA9IG51bGw7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICB9XG4gICAgfSwgMTcpO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gIHNlbGVjdG9yOiAnW3RyZWVBbmltYXRlT3Blbl0nXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFJlbmRlcmVyLCB9LFxue3R5cGU6IFRlbXBsYXRlUmVmLCB9LFxue3R5cGU6IFZpZXdDb250YWluZXJSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidhbmltYXRlU3BlZWQnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWyd0cmVlQW5pbWF0ZU9wZW5TcGVlZCcsIF0gfSxdLFxuJ2FuaW1hdGVBY2NlbGVyYXRpb24nOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWyd0cmVlQW5pbWF0ZU9wZW5BY2NlbGVyYXRpb24nLCBdIH0sXSxcbidpc0VuYWJsZWQnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWyd0cmVlQW5pbWF0ZU9wZW5FbmFibGVkJywgXSB9LF0sXG4naXNPcGVuJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsndHJlZUFuaW1hdGVPcGVuJywgXSB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=