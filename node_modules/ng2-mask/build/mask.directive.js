import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var resolvedPromise = Promise.resolve(null);
/** TODO(custom special characters) */
/** TODO(custom patterns) */
/** TODO(cursor position) */
/** TODO(create special characters object to specialCharacters directive) */
var MaskDirective = (function () {
    function MaskDirective(_elementRef, _renderer, document) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.document = document;
        this._maskSpecialCharacters = ['/', '(', ')', '.', ':', '-', ' ', '+'];
        this._maskAwaliablePatterns = {
            '0': /\d/,
            '9': /\d/,
            'A': /[a-zA-Z0-9]/,
            'S': /[a-zA-Z]/
        };
        // tslint:disable-next-line
        this._onChange = function (_) { };
        this._onTouch = function () { };
        this.modelWithSpecialCharacters = true;
        this._clearIfNotMatch = false;
    }
    MaskDirective.prototype.ngOnInit = function () {
        var _this = this;
        resolvedPromise.then(function () { return _this._applyValueChanges(); });
    };
    Object.defineProperty(MaskDirective.prototype, "maskExpression", {
        set: function (value) {
            if (!value) {
                return;
            }
            this._maskExpression = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "modelWithSpecialCharacters", {
        get: function () {
            return this._modelWithSpecialCharacters;
        },
        set: function (value) {
            this._modelWithSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "clearIfNotMatch", {
        get: function () {
            return this._clearIfNotMatch;
        },
        set: function (value) {
            this._clearIfNotMatch = value;
        },
        enumerable: true,
        configurable: true
    });
    MaskDirective.prototype.onInput = function () {
        this._applyValueChanges();
    };
    MaskDirective.prototype.onBlur = function () {
        this._clearIfNotMatchFn();
        this._applyValueChanges();
        this._onTouch();
    };
    /** It writes the value in the input */
    MaskDirective.prototype.writeValue = function (inputValue) {
        if (!inputValue) {
            return;
        }
        this._elementRef.nativeElement.value = this._applyMask(inputValue, this._maskExpression);
    };
    // tslint:disable-next-line
    MaskDirective.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
        return;
    };
    /* TODO */
    // tslint:disable-next-line
    MaskDirective.prototype.registerOnTouched = function (fn) {
        this._onTouch = fn;
    };
    /** It disables the input element */
    MaskDirective.prototype.setDisabledState = function (isDisabled) {
        if (isDisabled) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', 'true');
            return;
        }
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', 'false');
    };
    MaskDirective.prototype._applyMask = function (inputValue, maskExpression) {
        if (inputValue === undefined || inputValue === null) {
            return '';
        }
        var cursor = 0;
        var result = '';
        var inputArray = inputValue.toString().split('');
        // tslint:disable-next-line
        for (var i = 0, inputSymbol = inputArray[0]; i
            < inputArray.length; i++, inputSymbol = inputArray[i]) {
            if (result.length === maskExpression.length) {
                break;
            }
            if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                result += inputSymbol;
                cursor++;
            }
            else if (this._maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                result += maskExpression[cursor];
                cursor++;
                i--;
            }
            else if (maskExpression[cursor] === '9') {
                cursor++;
                i--;
            }
        }
        if (result.length + 1 === maskExpression.length
            && this._maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        return result;
    };
    /** Remove mask from value, based on specialCharacters */
    MaskDirective.prototype._removeMask = function (value) {
        if (!value) {
            return value;
        }
        return value.replace(/(\/|\.|-|\(|\)|:| |\+)/gi, '');
    };
    MaskDirective.prototype._checkSymbolMask = function (inputSymbol, maskSymbol) {
        return inputSymbol === maskSymbol
            || this._maskAwaliablePatterns[maskSymbol]
                && this._maskAwaliablePatterns[maskSymbol].test(inputSymbol);
    };
    MaskDirective.prototype._clearIfNotMatchFn = function () {
        if (this.clearIfNotMatch === true && this._maskExpression.length
            !== this._elementRef.nativeElement.value.length) {
            this._elementRef.nativeElement.value = '';
        }
    };
    /** It applies the mask in the input and updates the control's value. */
    MaskDirective.prototype._applyValueChanges = function () {
        var val = this._elementRef.nativeElement.value;
        var maskedInput = this._applyMask(val, this._maskExpression);
        this._elementRef.nativeElement.value = maskedInput;
        if (this.modelWithSpecialCharacters === true) {
            this._onChange(maskedInput);
        }
        else {
            this._onChange(this._removeMask(maskedInput));
        }
        if (this._elementRef.nativeElement !== this.document.activeElement) {
            this._clearIfNotMatchFn();
        }
    };
    return MaskDirective;
}());
export { MaskDirective };
MaskDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return MaskDirective; }),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
MaskDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
]; };
MaskDirective.propDecorators = {
    'maskExpression': [{ type: Input, args: ['mask',] },],
    'modelWithSpecialCharacters': [{ type: Input, args: ['specialCharacters',] },],
    'clearIfNotMatch': [{ type: Input, args: ['clearIfNotMatch',] },],
    'onInput': [{ type: HostListener, args: ['input',] },],
    'onBlur': [{ type: HostListener, args: ['blur',] },],
};
