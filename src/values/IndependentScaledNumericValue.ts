/// <reference path="./ScaledNumericValue.ts" />

namespace pixiparticles.values {
    export type IndependentScaledNumericValueType = ScaledNumericValueType & {
        independent: boolean;
    };

    export class IndependentScaledNumericValue extends ScaledNumericValue {
        public independent: boolean;

        public init(value: IndependentScaledNumericValueType): void {
            super.init(value);
            this.independent = value.independent;
        }
    }
}
