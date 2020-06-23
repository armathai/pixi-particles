/// <reference path="./Value.ts" />

namespace pixiparticles.values {
    export class SpawnShapeValue extends Value {
        public shape: constants.SpawnShape = constants.SpawnShape.point;
        public edges: boolean;
        public side: constants.SpawnEllipseSide = constants.SpawnEllipseSide.both;

        public init(value: any): void {
            super.init(value);
            if (!this.active) return;
            this.shape = value['shape'];
            if (this.shape == constants.SpawnShape.ellipse) {
                this.edges = value['edges'];
                this.side = value['side'];
            }
        }
    }
}
