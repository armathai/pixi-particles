namespace pixiparticles.values {
    export type ValueType = {
        active?: boolean;
        alwaysActive?: boolean;
    };

    export class Value {
        public active: boolean;
        public alwaysActive: boolean;

        public init(value: ValueType): void {
            if (!this.alwaysActive) {
                this.active = value.active;
            } else {
                this.active = true;
            }
        }
    }
}
