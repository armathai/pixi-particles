export declare type ValueType = {
    active?: boolean;
    alwaysActive?: boolean;
};
export declare class Value {
    active: boolean;
    alwaysActive: boolean;
    init(value: ValueType): void;
}
