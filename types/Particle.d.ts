import { Point, Sprite, Texture } from 'pixi.js';
export declare class Particle {
    life: number;
    currentLife: number;
    xScale: number;
    xScaleDiff: number;
    yScale: number;
    yScaleDiff: number;
    rotation: number;
    rotationDiff: number;
    velocity: number;
    velocityDiff: number;
    angle: number;
    angleDiff: number;
    angleCos: number;
    angleSin: number;
    transparency: number;
    transparencyDiff: number;
    wind: number;
    windDiff: number;
    gravity: number;
    gravityDiff: number;
    tint: number[];
    color: number[];
    frame: number;
    position: Point;
    positionOffset: Point;
    flip: {
        x: boolean;
        y: boolean;
    };
    scale: Point;
    texture: Texture;
    private _sprite;
    constructor(additive: boolean, texture?: Texture);
    get sprite(): Sprite;
    reset(): void;
    update(): void;
}
