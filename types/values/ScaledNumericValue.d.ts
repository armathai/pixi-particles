import { RangedNumericValue, RangedNumericValueType } from './RangedNumericValue';
export declare type ScaledNumericValueType = RangedNumericValueType & {
    highMin?: number;
    highMax?: number;
    relative?: boolean;
    scalingCount?: number;
    timelineCount?: number;
};
export declare class ScaledNumericValue extends RangedNumericValue {
    scaling: number[];
    timeline: number[];
    highMin: number;
    highMax: number;
    relative: boolean;
    get newHighValue(): number;
    setHigh(min: number, max?: number): void;
    scale(scale: number): void;
    getScaling(): number[];
    getScale(percent: number): number;
    init(value: ScaledNumericValueType): void;
}
