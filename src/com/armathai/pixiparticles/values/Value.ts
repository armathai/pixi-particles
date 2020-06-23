namespace pixiparticles.values {
    export class Value {
        public active: boolean;
        public alwaysActive: boolean;

        public init(value: any): void {
            if (!this.alwaysActive) {
                this.active = value['active'];
            } else {
                this.active = true;
            }
        }
    }
}
