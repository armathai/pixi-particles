import { isNullOrUndefined } from '../utils/isNullOrUndefined';
import { Value, ValueType } from './Value';

export type RangedNumericValueType = ValueType & {
    lowMin?: number;
    lowMax?: number;
};

export class RangedNumericValue extends Value {
    public lowMin: number;
    public lowMax: number;

    public get newLowValue(): number {
        return this.lowMin + (this.lowMax - this.lowMin) * Math.random();
    }

    public setLow(min: number, max?: number): void {
        this.lowMin = min;
        this.lowMax = isNullOrUndefined(max) ? min : max;
    }

    /** permanently scales the range by a scalar. */
    public scale(scale: number): void {
        this.lowMin *= scale;
        this.lowMax *= scale;
    }

    public init(value: RangedNumericValueType): void {
        super.init(value);
        this.lowMin = value.lowMin;
        this.lowMax = value.lowMax;
    }
}
