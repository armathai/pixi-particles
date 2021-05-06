import { SpawnEllipseSide } from '../constants/SpawnEllipseSide';
import { SpawnShape } from '../constants/SpawnShape';
import { Value, ValueType } from './Value';
export declare type SpawnShapeValueType = ValueType & {
    shape: SpawnShape;
    edges?: boolean;
    side?: SpawnEllipseSide;
};
export declare class SpawnShapeValue extends Value {
    shape: SpawnShape;
    edges: boolean;
    side: SpawnEllipseSide;
    init(value: SpawnShapeValueType): void;
}
