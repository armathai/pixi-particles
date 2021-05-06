import { Value, ValueType } from './Value';
export declare type GradientColorValueType = ValueType & {
    colorsCount: number;
    timelineCount: number;
};
export declare class GradientColorValue extends Value {
    private static _temp;
    colors: number[];
    timeline: number[];
    constructor();
    getColor(percent: number): number[];
    init(value: GradientColorValueType): void;
}
