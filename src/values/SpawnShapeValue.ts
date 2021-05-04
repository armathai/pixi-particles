import { SpawnEllipseSide } from '../constants/SpawnEllipseSide';
import { SpawnShape } from '../constants/SpawnShape';
import { Value, ValueType } from './Value';

export type SpawnShapeValueType = ValueType & {
    shape: SpawnShape;
    edges?: boolean;
    side?: SpawnEllipseSide;
};

export class SpawnShapeValue extends Value {
    public shape: SpawnShape = SpawnShape.point;
    public edges: boolean;
    public side: SpawnEllipseSide = SpawnEllipseSide.both;

    public init(value: SpawnShapeValueType): void {
        super.init(value);
        if (!this.active) return;
        this.shape = value.shape;
        if (this.shape === SpawnShape.ellipse) {
            this.edges = value.edges;
            this.side = value.side;
        }
    }
}
