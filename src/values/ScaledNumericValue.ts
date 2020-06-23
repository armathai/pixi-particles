/// <reference path="./RangedNumericValue.ts" />

namespace pixiparticles.values {
    export class ScaledNumericValue extends RangedNumericValue {
        public scaling: number[] = [1];
        public timeline: number[] = [0];
        public highMin: number;
        public highMax: number;
        public relative: boolean;

        public get newHighValue(): number {
            return this.highMin + (this.highMax - this.highMin) * Math.random();
        }

        public setHigh(min: number, max?: number): void {
            this.highMin = min;
            this.highMax = utils.isNullOrUndefined(max) ? min : max;
        }

        public scale(scale: number): void {
            super.scale(scale);
            this.highMin *= scale;
            this.highMax *= scale;
        }

        public getScaling(): number[] {
            return this.scaling;
        }

        public getScale(percent: number): number {
            let endIndex = -1;
            const timeline = this.timeline;
            const n = timeline.length;
            for (let i = 1; i < n; i++) {
                const t = timeline[i];
                if (t > percent) {
                    endIndex = i;
                    break;
                }
            }
            if (endIndex == -1) return this.scaling[n - 1];
            const scaling = this.scaling;
            const startIndex = endIndex - 1;
            const startValue = scaling[startIndex];
            const startTime = timeline[startIndex];
            return (
                startValue +
                (scaling[endIndex] - startValue) * ((percent - startTime) / (timeline[endIndex] - startTime))
            );
        }

        public init(value: any): void {
            super.init(value);
            if (!this.active) return;
            this.highMin = value['highMin'];
            this.highMax = value['highMax'];
            this.relative = value['relative'];
            const scalingCount = value['scalingCount'];
            this.scaling = [];
            for (let i = 0; i < scalingCount; i++) this.scaling.push(value['scaling' + i]);
            const timelineCount = value['timelineCount'];
            this.timeline = [];
            for (let i = 0; i < timelineCount; i++) this.timeline.push(value['timeline' + i]);
        }
    }
}
