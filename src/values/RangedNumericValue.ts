/// <reference path="./Value.ts" />

namespace pixiparticles.values {
    export class RangedNumericValue extends Value {
        public lowMin: number;
        public lowMax: number;

        public get newLowValue(): number {
            return this.lowMin + (this.lowMax - this.lowMin) * Math.random();
        }

        public setLow(min: number, max?: number): void {
            this.lowMin = min;
            this.lowMax = utils.isNullOrUndefined(max) ? min : max;
        }

        /** permanently scales the range by a scalar. */
        public scale(scale: number): void {
            this.lowMin *= scale;
            this.lowMax *= scale;
        }

        public init(value: any): void {
            super.init(value);
            this.lowMin = value['lowMin']; // json.readValue('lowMin', float.class, jsonData);
            this.lowMax = value['lowMax']; //json.readValue('lowMax', float.class, jsonData);
        }
    }
}
