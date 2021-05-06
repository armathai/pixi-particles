import { ScaledNumericValue, ScaledNumericValueType } from './ScaledNumericValue';
export declare type IndependentScaledNumericValueType = ScaledNumericValueType & {
    independent: boolean;
};
export declare class IndependentScaledNumericValue extends ScaledNumericValue {
    independent: boolean;
    init(value: IndependentScaledNumericValueType): void;
}
