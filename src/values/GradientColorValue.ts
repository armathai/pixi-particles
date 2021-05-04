import { Value, ValueType } from './Value';

export type GradientColorValueType = ValueType & {
    colorsCount: number;
    timelineCount: number;
};

export class GradientColorValue extends Value {
    private static _temp: number[] = [0, 0, 0, 0];

    public colors: number[] = [1, 1, 1];
    public timeline: number[] = [0];

    public constructor() {
        super();
        this.alwaysActive = true;
    }

    public getColor(percent: number): number[] {
        let startIndex = 0;
        let endIndex = -1;
        const timeline = this.timeline;
        const n = timeline.length;
        for (let i = 1; i < n; i++) {
            const t = timeline[i];
            if (t > percent) {
                endIndex = i;
                break;
            }
            startIndex = i;
        }
        const startTime = timeline[startIndex];
        startIndex *= 3;
        const r1 = this.colors[startIndex];
        const g1 = this.colors[startIndex + 1];
        const b1 = this.colors[startIndex + 2];
        if (endIndex == -1) {
            GradientColorValue._temp[0] = r1;
            GradientColorValue._temp[1] = g1;
            GradientColorValue._temp[2] = b1;
            return GradientColorValue._temp;
        }
        const factor = (percent - startTime) / (timeline[endIndex] - startTime);
        endIndex *= 3;
        GradientColorValue._temp[0] = r1 + (this.colors[endIndex] - r1) * factor;
        GradientColorValue._temp[1] = g1 + (this.colors[endIndex + 1] - g1) * factor;
        GradientColorValue._temp[2] = b1 + (this.colors[endIndex + 2] - b1) * factor;
        return GradientColorValue._temp;
    }

    public init(value: GradientColorValueType): void {
        super.init(value);
        if (!this.active) return;
        const colorsCount = value.colorsCount;
        for (let i = 0; i < colorsCount; i++) this.colors[i] = value['colors' + i];
        const timelineCount = value.timelineCount;
        for (let i = 0; i < timelineCount; i++) this.timeline[i] = value['timeline' + i];
    }
}
