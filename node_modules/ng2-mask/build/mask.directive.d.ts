import { ElementRef, OnInit, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/** TODO(custom special characters) */
/** TODO(custom patterns) */
/** TODO(cursor position) */
/** TODO(create special characters object to specialCharacters directive) */
export declare class MaskDirective implements OnInit, ControlValueAccessor {
    private _elementRef;
    private _renderer;
    private document;
    private _modelWithSpecialCharacters;
    private _clearIfNotMatch;
    private _maskExpression;
    private _maskSpecialCharacters;
    private _maskAwaliablePatterns;
    constructor(_elementRef: ElementRef, _renderer: Renderer, document: any);
    ngOnInit(): void;
    maskExpression: string;
    modelWithSpecialCharacters: boolean;
    clearIfNotMatch: boolean;
    onInput(): void;
    onBlur(): void;
    /** It writes the value in the input */
    writeValue(inputValue: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    /** It disables the input element */
    setDisabledState(isDisabled: boolean): void;
    private _onChange;
    private _onTouch;
    private _applyMask(inputValue, maskExpression);
    /** Remove mask from value, based on specialCharacters */
    private _removeMask(value);
    private _checkSymbolMask(inputSymbol, maskSymbol);
    private _clearIfNotMatchFn();
    /** It applies the mask in the input and updates the control's value. */
    private _applyValueChanges();
}
