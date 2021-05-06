import { Value, ValueType } from './Value';
export declare type RangedNumericValueType = ValueType & {
    lowMin?: number;
    lowMax?: number;
};
export declare class RangedNumericValue extends Value {
    lowMin: number;
    lowMax: number;
    get newLowValue(): number;
    setLow(min: number, max?: number): void;
    /** permanently scales the range by a scalar. */
    scale(scale: number): void;
    init(value: RangedNumericValueType): void;
}
