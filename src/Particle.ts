export class Particle {
    public life: number;
    public currentLife: number;
    public xScale: number;
    public xScaleDiff: number;
    public yScale: number;
    public yScaleDiff: number;
    public rotation = 0;
    public rotationDiff: number;
    public velocity: number;
    public velocityDiff: number;
    public angle: number;
    public angleDiff: number;
    public angleCos: number;
    public angleSin: number;
    public transparency: number;
    public transparencyDiff: number;
    public wind: number;
    public windDiff: number;
    public gravity: number;
    public gravityDiff: number;
    public tint: number[];
    public color: number[];
    public frame: number;

    //

    public position = new PIXI.Point(0, 0);
    public positionOffset = new PIXI.Point(0, 0);
    public flip: { x: boolean; y: boolean };
    public scale = new PIXI.Point(0, 0);
    public texture: PIXI.Texture;
    private _sprite: PIXI.Sprite;

    public constructor(additive: boolean, texture?: PIXI.Texture) {
        this._sprite = new PIXI.Sprite(texture);
        this._sprite.anchor.set(0.5);
        this._sprite.blendMode = additive ? PIXI.BLEND_MODES.ADD : PIXI.BLEND_MODES.NORMAL;
    }

    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }

    public reset(): void {
        this.position.set(0, 0);
        this.scale.set(1, 1);
        this.texture = null;
    }

    public update(): void {
        this._sprite.texture = this.texture;
        this._sprite.tint = PIXI.utils.rgb2hex(this.color);
        this._sprite.alpha = this.color[3];
        this.scale.copyTo(this._sprite.scale);
        this._sprite.position.x = this.position.x + this.positionOffset.x;
        this._sprite.position.y = this.position.y + this.positionOffset.y;
        this._sprite.angle = this.rotation;
    }
}
