import { Point, Sprite, BLEND_MODES, DEG_TO_RAD, Container } from 'pixi.js';

var SpawnEllipseSide;
(function (SpawnEllipseSide) {
    SpawnEllipseSide[SpawnEllipseSide["both"] = 0] = "both";
    SpawnEllipseSide[SpawnEllipseSide["top"] = 1] = "top";
    SpawnEllipseSide[SpawnEllipseSide["bottom"] = 2] = "bottom";
})(SpawnEllipseSide || (SpawnEllipseSide = {}));

var SpawnShape;
(function (SpawnShape) {
    SpawnShape[SpawnShape["point"] = 0] = "point";
    SpawnShape[SpawnShape["line"] = 1] = "line";
    SpawnShape[SpawnShape["square"] = 2] = "square";
    SpawnShape[SpawnShape["ellipse"] = 3] = "ellipse";
})(SpawnShape || (SpawnShape = {}));

var SpriteMode;
(function (SpriteMode) {
    SpriteMode[SpriteMode["single"] = 0] = "single";
    SpriteMode[SpriteMode["random"] = 1] = "random";
    SpriteMode[SpriteMode["animated"] = 2] = "animated";
})(SpriteMode || (SpriteMode = {}));

/**
 * Converts a color as an [R, G, B] array of normalized floats to a hexadecimal number.
 *
 * @example
 * PIXI.utils.rgb2hex([1, 1, 1]); // returns 0xffffff
 * @memberof PIXI.utils
 * @function rgb2hex
 * @param {number[]} rgb - Array of numbers where all values are normalized floats from 0.0 to 1.0.
 * @return {number} Number in hexadecimal.
 */
function rgb2hex(rgb) {
    return ((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + ((rgb[2] * 255) | 0);
}

class Particle {
    constructor(additive, texture) {
        this.rotation = 0;
        //
        this.position = new Point(0, 0);
        this.positionOffset = new Point(0, 0);
        this.scale = new Point(0, 0);
        this._sprite = new Sprite(texture);
        this._sprite.anchor.set(0.5);
        this._sprite.blendMode = additive ? BLEND_MODES.ADD : BLEND_MODES.NORMAL;
    }
    get sprite() {
        return this._sprite;
    }
    reset() {
        this.position.set(0, 0);
        this.scale.set(1, 1);
        this.texture = null;
    }
    update() {
        this._sprite.texture = this.texture;
        this._sprite.tint = rgb2hex(this.color);
        this._sprite.alpha = this.color[3];
        this.scale.copyTo(this._sprite.scale);
        this._sprite.position.x = this.position.x + this.positionOffset.x;
        this._sprite.position.y = this.position.y + this.positionOffset.y;
        this._sprite.angle = this.rotation;
    }
}

const between = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const sample = (array) => {
    return array[between(0, array.length - 1)];
};

class Value {
    init(value) {
        if (!this.alwaysActive) {
            this.active = value.active;
        }
        else {
            this.active = true;
        }
    }
}

class GradientColorValue extends Value {
    constructor() {
        super();
        this.colors = [1, 1, 1];
        this.timeline = [0];
        this.alwaysActive = true;
    }
    getColor(percent) {
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
    init(value) {
        super.init(value);
        if (!this.active)
            return;
        const colorsCount = value.colorsCount;
        for (let i = 0; i < colorsCount; i++)
            this.colors[i] = value['colors' + i];
        const timelineCount = value.timelineCount;
        for (let i = 0; i < timelineCount; i++)
            this.timeline[i] = value['timeline' + i];
    }
}
GradientColorValue._temp = [0, 0, 0, 0];

const isNullOrUndefined = (obj) => {
    return typeof obj === 'undefined' || obj === null;
};

class RangedNumericValue extends Value {
    get newLowValue() {
        return this.lowMin + (this.lowMax - this.lowMin) * Math.random();
    }
    setLow(min, max) {
        this.lowMin = min;
        this.lowMax = isNullOrUndefined(max) ? min : max;
    }
    /** permanently scales the range by a scalar. */
    scale(scale) {
        this.lowMin *= scale;
        this.lowMax *= scale;
    }
    init(value) {
        super.init(value);
        this.lowMin = value.lowMin;
        this.lowMax = value.lowMax;
    }
}

class ScaledNumericValue extends RangedNumericValue {
    constructor() {
        super(...arguments);
        this.scaling = [1];
        this.timeline = [0];
    }
    get newHighValue() {
        return this.highMin + (this.highMax - this.highMin) * Math.random();
    }
    setHigh(min, max) {
        this.highMin = min;
        this.highMax = isNullOrUndefined(max) ? min : max;
    }
    scale(scale) {
        super.scale(scale);
        this.highMin *= scale;
        this.highMax *= scale;
    }
    getScaling() {
        return this.scaling;
    }
    getScale(percent) {
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
        if (endIndex == -1)
            return this.scaling[n - 1];
        const scaling = this.scaling;
        const startIndex = endIndex - 1;
        const startValue = scaling[startIndex];
        const startTime = timeline[startIndex];
        return (startValue + (scaling[endIndex] - startValue) * ((percent - startTime) / (timeline[endIndex] - startTime)));
    }
    init(value) {
        super.init(value);
        if (!this.active)
            return;
        this.highMin = value.highMin;
        this.highMax = value.highMax;
        this.relative = value.relative;
        const scalingCount = value.scalingCount;
        this.scaling = [];
        for (let i = 0; i < scalingCount; i++)
            this.scaling.push(value['scaling' + i]);
        const timelineCount = value.timelineCount;
        this.timeline = [];
        for (let i = 0; i < timelineCount; i++)
            this.timeline.push(value['timeline' + i]);
    }
}

class IndependentScaledNumericValue extends ScaledNumericValue {
    init(value) {
        super.init(value);
        this.independent = value.independent;
    }
}

class SpawnShapeValue extends Value {
    constructor() {
        super(...arguments);
        this.shape = SpawnShape.point;
        this.side = SpawnEllipseSide.both;
    }
    init(value) {
        super.init(value);
        if (!this.active)
            return;
        this.shape = value.shape;
        if (this.shape === SpawnShape.ellipse) {
            this.edges = value.edges;
            this.side = value.side;
        }
    }
}

var UpdateFlags;
(function (UpdateFlags) {
    UpdateFlags[UpdateFlags["scale"] = 1] = "scale";
    UpdateFlags[UpdateFlags["angle"] = 2] = "angle";
    UpdateFlags[UpdateFlags["rotation"] = 4] = "rotation";
    UpdateFlags[UpdateFlags["velocity"] = 8] = "velocity";
    UpdateFlags[UpdateFlags["wind"] = 16] = "wind";
    UpdateFlags[UpdateFlags["gravity"] = 32] = "gravity";
    UpdateFlags[UpdateFlags["tint"] = 64] = "tint";
    UpdateFlags[UpdateFlags["sprite"] = 128] = "sprite";
})(UpdateFlags || (UpdateFlags = {}));
class ParticleEmitter {
    constructor(container, name, emitterConfig, textureFactory) {
        this.duration = 1;
        this.durationTimer = 0;
        this.continuous = false;
        this._delayValue = new RangedNumericValue();
        this._lifeOffsetValue = new IndependentScaledNumericValue();
        this._durationValue = new RangedNumericValue();
        this._lifeValue = new IndependentScaledNumericValue();
        this._emissionValue = new ScaledNumericValue();
        this._xScaleValue = new ScaledNumericValue();
        this._yScaleValue = new ScaledNumericValue();
        this._rotationValue = new ScaledNumericValue();
        this._velocityValue = new ScaledNumericValue();
        this._angleValue = new ScaledNumericValue();
        this._windValue = new ScaledNumericValue();
        this._gravityValue = new ScaledNumericValue();
        this._transparencyValue = new ScaledNumericValue();
        this._tintValue = new GradientColorValue();
        this._xOffsetValue = new ScaledNumericValue();
        this._yOffsetValue = new ScaledNumericValue();
        this._spawnWidthValue = new ScaledNumericValue();
        this._spawnHeightValue = new ScaledNumericValue();
        this._spawnShapeValue = new SpawnShapeValue();
        this._accumulator = 0;
        this._spriteMode = SpriteMode.single;
        this._minParticleCount = 0;
        this._maxParticleCount = 4;
        this._x = 0;
        this._y = 0;
        this._activeCount = 0;
        this._firstUpdate = false;
        this._flipX = false;
        this._flipY = false;
        this._updateFlags = 0;
        this._allowCompletion = false;
        this._emission = 0;
        this._emissionDiff = 0;
        this._emissionDelta = 0;
        this._lifeOffset = 0;
        this._lifeOffsetDiff = 0;
        this._life = 0;
        this._lifeDiff = 0;
        this._spawnWidth = 0;
        this._spawnWidthDiff = 0;
        this._spawnHeight = 0;
        this._spawnHeightDiff = 0;
        this._delay = 0;
        this._delayTimer = 0;
        this._attached = false;
        this._aligned = false;
        this._additive = true;
        this._initialize();
        this._container = container;
        this.name = name;
        const { options } = emitterConfig;
        this._attached = options.attached;
        this.continuous = options.continuous;
        this._aligned = options.aligned;
        this._additive = options.additive;
        this._spriteMode = options.spriteMode;
        this._delayValue.init(emitterConfig.delay);
        this._durationValue.init(emitterConfig.duration);
        const { count } = emitterConfig;
        this._setMaxParticleCount(count.max);
        this._setMinParticleCount(count.min);
        this._emissionValue.init(emitterConfig.emission);
        this._lifeValue.init(emitterConfig.life);
        this._lifeOffsetValue.init(emitterConfig.life.offset);
        this._xOffsetValue.init(emitterConfig.offset.x);
        this._yOffsetValue.init(emitterConfig.offset.y);
        this._spawnShapeValue.init(emitterConfig.spawn);
        this._spawnWidthValue.init(emitterConfig.spawn.width);
        this._spawnHeightValue.init(emitterConfig.spawn.height);
        this._xScaleValue.init(emitterConfig.scale.x);
        this._yScaleValue.init(emitterConfig.scale.y);
        this._velocityValue.init(emitterConfig.velocity);
        this._angleValue.init(emitterConfig.angle);
        this._rotationValue.init(emitterConfig.rotation);
        this._windValue.init(emitterConfig.wind);
        this._gravityValue.init(emitterConfig.gravity);
        this._tintValue.init(emitterConfig.tint);
        this._transparencyValue.init(emitterConfig.transparency);
        const { textures } = emitterConfig;
        this.setTextures(textures.map((t) => textureFactory(t)));
    }
    update(delta) {
        this._accumulator += delta;
        if (this._accumulator < 1)
            return;
        const deltaMillis = this._accumulator;
        this._accumulator -= deltaMillis;
        if (this._delayTimer < this._delay) {
            this._delayTimer += deltaMillis;
        }
        else {
            let done = false;
            if (this._firstUpdate) {
                this._firstUpdate = false;
                this._addParticle();
            }
            if (this.durationTimer < this.duration) {
                this.durationTimer += deltaMillis;
            }
            else {
                if (!this.continuous || this._allowCompletion) {
                    done = true;
                }
                else {
                    this._restart();
                }
            }
            if (!done) {
                this._emissionDelta += deltaMillis;
                let emissionTime = this._emission +
                    this._emissionDiff * this._emissionValue.getScale(this.durationTimer / this.duration);
                if (emissionTime > 0) {
                    emissionTime = 1000 / emissionTime;
                    if (this._emissionDelta >= emissionTime) {
                        let emitCount = this._emissionDelta / emissionTime;
                        emitCount = ~~Math.min(emitCount, this._maxParticleCount - this._activeCount);
                        this._emissionDelta -= emitCount * emissionTime;
                        this._emissionDelta %= emissionTime;
                        this._addParticles(emitCount);
                    }
                }
                if (this._activeCount < this._minParticleCount) {
                    this._addParticles(this._minParticleCount - this._activeCount);
                }
            }
        }
        const active = this._active;
        let activeCount = this._activeCount;
        const particles = this._particles;
        for (let i = 0, n = active.length; i < n; i++) {
            if (active[i] && !this._updateParticle(particles[i], delta, deltaMillis)) {
                active[i] = false;
                this._deactivateParticle(particles[i]);
                activeCount--;
            }
        }
        this._activeCount = activeCount;
    }
    setTextures(sprites) {
        this.sprites = sprites;
        if (sprites.length === 0)
            return;
        this._particles.forEach((particle) => {
            if (particle === null)
                return;
            let sprite = null;
            switch (this._spriteMode) {
                case SpriteMode.single:
                    sprite = sprites[0];
                    break;
                case SpriteMode.random:
                    sprite = sample(sprites);
                    break;
                case SpriteMode.animated:
                    const percent = 1 - particle.currentLife / particle.life;
                    particle.frame = Math.min(percent * sprites.length, sprites.length - 1);
                    sprite = sprites[particle.frame];
                    break;
            }
            particle.texture = sprite;
        });
    }
    setSpriteMode(spriteMode) {
        this._spriteMode = spriteMode;
    }
    /**
     * Allocates max particles emitter can hold. Usually called early on to avoid allocation on updates.
     */
    preAllocateParticles() {
        if (this.sprites.length === 0)
            throw new Error('ParticleEmitter.setSprites() must have been called before preAllocateParticles()');
        this._particles.forEach((particle, index) => {
            if (particle === null) {
                this._particles[index] = particle = this._newParticle(this.sprites[0]);
                particle.flip.x = this._flipX;
                particle.flip.y = this._flipY;
            }
        });
    }
    allowCompletion() {
        this._allowCompletion = true;
        this.durationTimer = this.duration;
    }
    start() {
        this._firstUpdate = true;
        this._allowCompletion = false;
        this._restart();
    }
    reset() {
        this._emissionDelta = 0;
        this.durationTimer = this.duration;
        const active = this._active;
        for (let i = 0, n = active.length; i < n; i++)
            active[i] = false;
        this._activeCount = 0;
        this.start();
    }
    isComplete() {
        if (this.continuous && !this._allowCompletion)
            return false;
        if (this._delayTimer < this._delay)
            return false;
        return this.durationTimer >= this.duration && this._activeCount == 0;
    }
    getPercentComplete() {
        if (this._delayTimer < this._delay)
            return 0;
        return Math.min(1, this.durationTimer / this.duration);
    }
    _newParticle(sprite) {
        return new Particle(this._additive, sprite);
    }
    _setMaxParticleCount(maxParticleCount) {
        this._maxParticleCount = maxParticleCount;
        this._active = Array(...Array(maxParticleCount)).map(() => false);
        this._activeCount = 0;
        this._particles = Array(...Array(maxParticleCount)).map(() => new Particle(this._additive));
    }
    _setMinParticleCount(minParticleCount) {
        this._minParticleCount = minParticleCount;
    }
    _addParticle() {
        const activeCount = this._activeCount;
        if (activeCount === this._maxParticleCount)
            return;
        const active = this._active;
        for (let i = 0, n = active.length; i < n; i++) {
            if (!active[i]) {
                this._activateParticle(i);
                active[i] = true;
                this._activeCount = activeCount + 1;
                break;
            }
        }
    }
    _addParticles(count) {
        count = Math.min(count, this._maxParticleCount - this._activeCount);
        if (count == 0)
            return;
        const active = this._active;
        let index = 0;
        const n = active.length;
        outer: for (let i = 0; i < count; i++) {
            for (; index < n; index++) {
                if (!active[index]) {
                    this._activateParticle(index);
                    active[index++] = true;
                    continue outer;
                }
            }
            break;
        }
        this._activeCount += count;
    }
    _restart() {
        this._delay = this._delayValue.active ? this._delayValue.newLowValue : 0;
        this._delayTimer = 0;
        this.durationTimer -= this.duration;
        this.duration = this._durationValue.newLowValue;
        this._emission = this._emissionValue.newLowValue;
        this._emissionDiff = this._emissionValue.newHighValue;
        if (!this._emissionValue.relative)
            this._emissionDiff -= this._emission;
        if (!this._lifeValue.independent)
            this._generateLifeValues();
        if (!this._lifeOffsetValue.independent)
            this._generateLifeOffsetValues();
        this._spawnWidth = this._spawnWidthValue.newLowValue;
        this._spawnWidthDiff = this._spawnWidthValue.newHighValue;
        if (!this._spawnWidthValue.relative)
            this._spawnWidthDiff -= this._spawnWidth;
        this._spawnHeight = this._spawnHeightValue.newLowValue;
        this._spawnHeightDiff = this._spawnHeightValue.newHighValue;
        if (!this._spawnHeightValue.relative)
            this._spawnHeightDiff -= this._spawnHeight;
        this._updateFlags = 0;
        if (this._angleValue.active && this._angleValue.timeline.length > 1)
            this._updateFlags |= UpdateFlags.angle;
        if (this._velocityValue.active)
            this._updateFlags |= UpdateFlags.velocity;
        if (this._xScaleValue.timeline.length > 1)
            this._updateFlags |= UpdateFlags.scale;
        if (this._yScaleValue.active && this._yScaleValue.timeline.length > 1)
            this._updateFlags |= UpdateFlags.scale;
        if (this._rotationValue.active && this._rotationValue.timeline.length > 1)
            this._updateFlags |= UpdateFlags.rotation;
        if (this._windValue.active)
            this._updateFlags |= UpdateFlags.wind;
        if (this._gravityValue.active)
            this._updateFlags |= UpdateFlags.gravity;
        if (this._tintValue.timeline.length > 1)
            this._updateFlags |= UpdateFlags.tint;
        if (this._spriteMode == SpriteMode.animated)
            this._updateFlags |= UpdateFlags.sprite;
    }
    _initialize() {
        this.sprites = [];
        this._durationValue.alwaysActive = true;
        this._emissionValue.alwaysActive = true;
        this._lifeValue.alwaysActive = true;
        this._xScaleValue.alwaysActive = true;
        this._transparencyValue.alwaysActive = true;
        this._spawnShapeValue.alwaysActive = true;
        this._spawnWidthValue.alwaysActive = true;
        this._spawnHeightValue.alwaysActive = true;
    }
    _activateParticle(index) {
        let sprite = null;
        switch (this._spriteMode) {
            case SpriteMode.single:
            case SpriteMode.animated:
                sprite = this.sprites[0];
                break;
            case SpriteMode.random:
                sprite = sample(this.sprites);
                break;
        }
        let particle = this._particles[index];
        if (particle === null) {
            this._particles[index] = particle = this._newParticle(sprite);
            particle.flip.x = this._flipX;
            particle.flip.y = this._flipY;
        }
        else {
            particle.reset();
            particle.texture = sprite;
        }
        const percent = this.durationTimer / this.duration;
        const updateFlags = this._updateFlags;
        if (this._lifeValue.independent)
            this._generateLifeValues();
        if (this._lifeOffsetValue.independent)
            this._generateLifeOffsetValues();
        particle.currentLife = particle.life = this._life + this._lifeDiff * this._lifeValue.getScale(percent);
        if (this._velocityValue.active) {
            particle.velocity = this._velocityValue.newLowValue;
            particle.velocityDiff = this._velocityValue.newHighValue;
            if (!this._velocityValue.relative)
                particle.velocityDiff -= particle.velocity;
        }
        particle.angle = this._angleValue.newLowValue;
        particle.angleDiff = this._angleValue.newHighValue;
        if (!this._angleValue.relative)
            particle.angleDiff -= particle.angle;
        let angle = 0;
        if ((updateFlags & UpdateFlags.angle) === 0) {
            angle = particle.angle + particle.angleDiff * this._angleValue.getScale(0);
            particle.angle = angle;
            particle.angleCos = Math.cos(DEG_TO_RAD * angle);
            particle.angleSin = Math.sin(DEG_TO_RAD * angle);
        }
        const spriteWidth = sprite.width;
        const spriteHeight = sprite.height;
        particle.xScale = this._xScaleValue.newLowValue / spriteWidth;
        particle.xScaleDiff = this._xScaleValue.newHighValue / spriteWidth;
        if (!this._xScaleValue.relative)
            particle.xScaleDiff -= particle.xScale;
        if (this._yScaleValue.active) {
            particle.yScale = this._yScaleValue.newLowValue / spriteHeight;
            particle.yScaleDiff = this._yScaleValue.newHighValue / spriteHeight;
            if (!this._yScaleValue.relative)
                particle.yScaleDiff -= particle.yScale;
            particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(0), particle.yScale + particle.yScaleDiff * this._yScaleValue.getScale(0));
        }
        else {
            particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(0));
        }
        if (this._rotationValue.active) {
            particle.rotation = this._rotationValue.newLowValue;
            particle.rotationDiff = this._rotationValue.newHighValue;
            if (!this._rotationValue.relative)
                particle.rotationDiff -= particle.rotation;
            let rotation = particle.rotation + particle.rotationDiff * this._rotationValue.getScale(0);
            if (this._aligned)
                rotation += angle;
            particle.rotation = rotation;
        }
        if (this._windValue.active) {
            particle.wind = this._windValue.newLowValue;
            particle.windDiff = this._windValue.newHighValue;
            if (!this._windValue.relative)
                particle.windDiff -= particle.wind;
        }
        if (this._gravityValue.active) {
            particle.gravity = this._gravityValue.newLowValue;
            particle.gravityDiff = this._gravityValue.newHighValue;
            if (!this._gravityValue.relative)
                particle.gravityDiff -= particle.gravity;
        }
        let color = particle.tint;
        if (color == null)
            particle.tint = color = [0, 0, 0];
        const temp = this._tintValue.getColor(0);
        color[0] = temp[0];
        color[1] = temp[1];
        color[2] = temp[2];
        particle.transparency = this._transparencyValue.newLowValue;
        particle.transparencyDiff = this._transparencyValue.newHighValue - particle.transparency;
        // Spawn.
        let x = this._x;
        if (this._xOffsetValue.active)
            x += this._xOffsetValue.newLowValue;
        let y = this._y;
        if (this._yOffsetValue.active)
            y += this._yOffsetValue.newLowValue;
        switch (this._spawnShapeValue.shape) {
            case SpawnShape.square: {
                const width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);
                const height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);
                x += between(0, width) - width / 2;
                y += between(0, height) - height / 2;
                break;
            }
            case SpawnShape.ellipse: {
                const width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);
                const height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);
                const radiusX = width / 2;
                const radiusY = height / 2;
                if (radiusX === 0 || radiusY === 0)
                    break;
                const scaleY = radiusX / radiusY;
                if (this._spawnShapeValue.edges) {
                    let spawnAngle;
                    switch (this._spawnShapeValue.side) {
                        case SpawnEllipseSide.top:
                            spawnAngle = between(0, 179);
                            break;
                        case SpawnEllipseSide.bottom:
                            spawnAngle = between(0, 179);
                            break;
                        default:
                            spawnAngle = between(0, 360);
                            break;
                    }
                    const cosDeg = Math.cos(DEG_TO_RAD * angle);
                    const sinDeg = Math.sin(DEG_TO_RAD * angle);
                    x += cosDeg * radiusX;
                    y += (sinDeg * radiusX) / scaleY;
                    if ((updateFlags & UpdateFlags.angle) === 0) {
                        particle.angle = spawnAngle;
                        particle.angleCos = cosDeg;
                        particle.angleSin = sinDeg;
                    }
                }
                else {
                    const radius2 = radiusX * radiusX;
                    while (true) {
                        const px = between(0, width) - radiusX;
                        const py = between(0, width) - radiusX;
                        if (px * px + py * py <= radius2) {
                            x += px;
                            y += py / scaleY;
                            break;
                        }
                    }
                }
                break;
            }
            case SpawnShape.line: {
                const width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);
                const height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);
                if (width != 0) {
                    const lineX = width * Math.random();
                    x += lineX;
                    y += lineX * (height / width);
                }
                else
                    y += height * Math.random();
                break;
            }
        }
        particle.positionOffset.set(x, y);
        let offsetTime = this._lifeOffset + this._lifeOffsetDiff * this._lifeOffsetValue.getScale(percent);
        if (offsetTime > 0) {
            if (offsetTime >= particle.currentLife)
                offsetTime = particle.currentLife - 1;
            this._updateParticle(particle, offsetTime, offsetTime);
        }
        this._container.addChild(particle.sprite);
    }
    _deactivateParticle(particle) {
        this._container.removeChild(particle.sprite);
    }
    _updateParticle(particle, delta, deltaMillis) {
        const life = particle.currentLife - deltaMillis;
        if (life <= 0)
            return false;
        particle.currentLife = life;
        const percent = 1 - particle.currentLife / particle.life;
        const updateFlags = this._updateFlags;
        if ((updateFlags & UpdateFlags.scale) !== 0) {
            if (this._yScaleValue.active) {
                particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(percent), particle.yScale + particle.yScaleDiff * this._yScaleValue.getScale(percent));
            }
            else {
                particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(percent));
            }
        }
        if ((updateFlags & UpdateFlags.velocity) !== 0) {
            const velocity = (particle.velocity + particle.velocityDiff * this._velocityValue.getScale(percent)) * delta;
            let velocityX = 0, velocityY = 0;
            if ((updateFlags & UpdateFlags.angle) !== 0) {
                const angle = particle.angle + particle.angleDiff * this._angleValue.getScale(percent);
                velocityX = velocity * Math.cos(DEG_TO_RAD * angle);
                velocityY = velocity * Math.sin(DEG_TO_RAD * angle);
                if ((updateFlags & UpdateFlags.rotation) !== 0) {
                    let rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
                    if (this._aligned)
                        rotation -= angle;
                    particle.rotation = rotation;
                }
                // console.log(velocityX, velocityY);
            }
            else {
                velocityX = velocity * particle.angleCos;
                velocityY = velocity * particle.angleSin;
                if (this._aligned || (updateFlags & UpdateFlags.rotation) !== 0) {
                    let rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
                    if (this._aligned)
                        rotation -= particle.angle;
                    particle.rotation = rotation;
                }
            }
            if ((updateFlags & UpdateFlags.wind) !== 0) {
                velocityX += (particle.wind + particle.windDiff * this._windValue.getScale(percent)) * delta;
            }
            if ((updateFlags & UpdateFlags.gravity) !== 0) {
                velocityY += (particle.gravity + particle.gravityDiff * this._gravityValue.getScale(percent)) * delta;
            }
            particle.position.x += velocityX;
            particle.position.y -= velocityY;
        }
        else {
            if ((updateFlags & UpdateFlags.rotation) !== 0)
                particle.rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
        }
        let color;
        if ((updateFlags & UpdateFlags.tint) !== 0)
            color = this._tintValue.getColor(percent);
        else
            color = particle.tint;
        particle.color = [
            color[0],
            color[1],
            color[2],
            particle.transparency + particle.transparencyDiff * this._transparencyValue.getScale(percent),
        ];
        if ((updateFlags & UpdateFlags.sprite) !== 0) {
            const frame = Math.min(percent * this.sprites.length, this.sprites.length - 1);
            if (particle.frame !== frame) {
                const sprite = this.sprites[frame];
                particle.texture = sprite;
            }
        }
        particle.update();
        return true;
    }
    _generateLifeValues() {
        this._life = this._lifeValue.newLowValue;
        this._lifeDiff = this._lifeValue.newHighValue;
        if (!this._lifeValue.relative)
            this._lifeDiff -= this._life;
    }
    _generateLifeOffsetValues() {
        this._lifeOffset = this._lifeOffsetValue.active ? this._lifeOffsetValue.newLowValue : 0;
        this._lifeOffsetDiff = this._lifeOffsetValue.newHighValue;
        if (!this._lifeOffsetValue.relative)
            this._lifeOffsetDiff -= this._lifeOffset;
    }
}

class ParticleEffect extends Container {
    constructor(config, textureFactory) {
        super();
        this._emitters = [];
        Object.keys(config).forEach((e) => {
            const emitter = this.newEmitter(e, config[e], textureFactory);
            this._emitters.push(emitter);
        });
    }
    start() {
        this._emitters.forEach((e) => e.start());
    }
    /** Resets the effect so it can be started again like a new effect. */
    reset() {
        this._emitters.forEach((e) => e.reset());
    }
    update(delta) {
        this._emitters.forEach((e) => e.update(delta));
    }
    allowCompletion() {
        this._emitters.forEach((e) => e.allowCompletion());
    }
    isComplete() {
        return !this._emitters.find((e) => !e.isComplete());
    }
    setDuration(duration) {
        this._emitters.forEach((e) => {
            e.continuous = false;
            e.duration = duration;
            e.durationTimer = 0;
        });
    }
    getEmitters() {
        return this._emitters;
    }
    /** Returns the emitter with the specified name, or null. */
    findEmitter(name) {
        return this._emitters.find((e) => e.name === name);
    }
    /** Allocates all emitters particles. */
    preAllocateParticles() {
        this._emitters.forEach((e) => e.preAllocateParticles());
    }
    /** Disposes the texture for each sprite for each ParticleEmitter. */
    destroy(options = { children: true }) {
        super.destroy(options);
    }
    newEmitter(name, emitterConfig, textureFactory) {
        return new ParticleEmitter(this, name, emitterConfig, textureFactory);
    }
}

export { ParticleEffect, ParticleEmitter };
