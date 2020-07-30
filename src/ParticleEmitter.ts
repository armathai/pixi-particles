/// <reference types="pixi.js" />

namespace pixiparticles.core {
    enum UpdateFlags {
        scale = 1 << 0,
        angle = 1 << 1,
        rotation = 1 << 2,
        velocity = 1 << 3,
        wind = 1 << 4,
        gravity = 1 << 5,
        tint = 1 << 6,
        sprite = 1 << 7,
    }

    export class ParticleEmitter {
        public duration = 1;
        public durationTimer = 0;
        public sprites: PIXI.Texture[];
        public continuous = false;
        public name: string;

        private _delayValue = new values.RangedNumericValue();
        private _lifeOffsetValue = new values.IndependentScaledNumericValue();
        private _durationValue = new values.RangedNumericValue();
        private _lifeValue = new values.IndependentScaledNumericValue();
        private _emissionValue = new values.ScaledNumericValue();
        private _xScaleValue = new values.ScaledNumericValue();
        private _yScaleValue = new values.ScaledNumericValue();
        private _rotationValue = new values.ScaledNumericValue();
        private _velocityValue = new values.ScaledNumericValue();
        private _angleValue = new values.ScaledNumericValue();
        private _windValue = new values.ScaledNumericValue();
        private _gravityValue = new values.ScaledNumericValue();
        private _transparencyValue = new values.ScaledNumericValue();
        private _tintValue = new values.GradientColorValue();
        private _xOffsetValue = new values.ScaledNumericValue();
        private _yOffsetValue = new values.ScaledNumericValue();
        private _spawnWidthValue = new values.ScaledNumericValue();
        private _spawnHeightValue = new values.ScaledNumericValue();
        private _spawnShapeValue = new values.SpawnShapeValue();

        private _xSizeValues: values.RangedNumericValue[];
        private _ySizeValues: values.RangedNumericValue[];
        private _motionValues: values.RangedNumericValue[];

        private _accumulator = 0;
        private _spriteMode: constants.SpriteMode = constants.SpriteMode.single;
        private _particles: Particle[];
        private _minParticleCount = 0;
        private _maxParticleCount = 4;
        private _x = 0;
        private _y = 0;
        private _container: PIXI.Container;
        private _activeCount = 0;
        private _active: boolean[];
        private _firstUpdate = false;
        private _flipX = false;
        private _flipY = false;
        private _updateFlags = 0;
        private _allowCompletion = false;

        private _emission = 0;
        private _emissionDiff = 0;
        private _emissionDelta = 0;
        private _lifeOffset = 0;
        private _lifeOffsetDiff = 0;
        private _life = 0;
        private _lifeDiff = 0;
        private _spawnWidth = 0;
        private _spawnWidthDiff = 0;
        private _spawnHeight = 0;
        private _spawnHeightDiff = 0;
        private _delay = 0;
        private _delayTimer = 0;

        private _attached = false;
        private _aligned = false;
        private _additive = true;

        public constructor(container: PIXI.Container, name: string, emitterConfig: ParticleEmitterConfig) {
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
            this.setMaxParticleCount(count.max);
            this.setMinParticleCount(count.min);
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
            this.setTextures(textures.map((t) => PIXI.Texture.from(t)));
        }

        public setMaxParticleCount(maxParticleCount: number): void {
            this._maxParticleCount = maxParticleCount;
            this._active = Array(...Array(maxParticleCount)).map(() => false);
            this._activeCount = 0;
            this._particles = Array(...Array(maxParticleCount)).map(() => new Particle(this._additive));
        }

        public setMinParticleCount(minParticleCount: number): void {
            this._minParticleCount = minParticleCount;
        }

        public addParticle(): void {
            const activeCount = this._activeCount;
            if (activeCount === this._maxParticleCount) return;
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

        public addParticles(count: number): void {
            count = Math.min(count, this._maxParticleCount - this._activeCount);
            if (count == 0) return;
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

        public update(delta: number): void {
            this._accumulator += delta;
            if (this._accumulator < 1) return;
            const deltaMillis = this._accumulator;
            this._accumulator -= deltaMillis;

            if (this._delayTimer < this._delay) {
                this._delayTimer += deltaMillis;
            } else {
                let done = false;
                if (this._firstUpdate) {
                    this._firstUpdate = false;
                    this.addParticle();
                }
                if (this.durationTimer < this.duration) {
                    this.durationTimer += deltaMillis;
                } else {
                    if (!this.continuous || this._allowCompletion) {
                        done = true;
                    } else {
                        this._restart();
                    }
                }
                if (!done) {
                    this._emissionDelta += deltaMillis;
                    let emissionTime =
                        this._emission +
                        this._emissionDiff * this._emissionValue.getScale(this.durationTimer / this.duration);
                    if (emissionTime > 0) {
                        emissionTime = 1000 / emissionTime;
                        if (this._emissionDelta >= emissionTime) {
                            let emitCount = this._emissionDelta / emissionTime;
                            emitCount = ~~Math.min(emitCount, this._maxParticleCount - this._activeCount);
                            this._emissionDelta -= emitCount * emissionTime;
                            this._emissionDelta %= emissionTime;
                            this.addParticles(emitCount);
                        }
                    }
                    if (this._activeCount < this._minParticleCount) {
                        this.addParticles(this._minParticleCount - this._activeCount);
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

        public setTextures(sprites: PIXI.Texture[]): void {
            this.sprites = sprites;
            if (sprites.length === 0) return;
            for (let i = 0, n = this._particles.length; i < n; i++) {
                const particle = this._particles[i];
                if (particle === null) break;
                let sprite = null;
                switch (this._spriteMode) {
                    case constants.SpriteMode.single:
                        sprite = sprites[0];
                        break;
                    case constants.SpriteMode.random:
                        sprite = utils.sample(sprites);
                        break;
                    case constants.SpriteMode.animated:
                        const percent = 1 - particle.currentLife / particle.life;
                        particle.frame = Math.min(percent * sprites.length, sprites.length - 1);
                        sprite = sprites[particle.frame];
                        break;
                }
                particle.texture = sprite;
            }
        }

        public setSpriteMode(spriteMode: constants.SpriteMode): void {
            this._spriteMode = spriteMode;
        }

        /**d
         * Allocates max particles emitter can hold. Usually called early on to avoid allocation on updates.
         * {@link #setSprites(Array)} must have been set before calling this method
         */
        public preAllocateParticles(): void {
            if (this.sprites.length === 0)
                throw new Error('ParticleEmitter.setSprites() must have been called before preAllocateParticles()');
            for (let index = 0; index < this._particles.length; index++) {
                let particle = this._particles[index];
                if (particle == null) {
                    this._particles[index] = particle = this.newParticle(this.sprites[0]);
                    particle.flip.x = this._flipX;
                    particle.flip.y = this._flipY;
                }
            }
        }

        /** Ignores the {@link #setContinuous(boolean) continuous} setting until the emitter is started again. This allows the emitter
         * to stop smoothly. */
        public allowCompletion(): void {
            this._allowCompletion = true;
            this.durationTimer = this.duration;
        }

        public start(): void {
            this._firstUpdate = true;
            this._allowCompletion = false;
            this._restart();
        }

        public reset(): void {
            this._emissionDelta = 0;
            this.durationTimer = this.duration;
            const active = this._active;
            for (let i = 0, n = active.length; i < n; i++) active[i] = false;
            this._activeCount = 0;
            this.start();
        }

        public isComplete(): boolean {
            if (this.continuous && !this._allowCompletion) return false;
            if (this._delayTimer < this._delay) return false;
            return this.durationTimer >= this.duration && this._activeCount == 0;
        }

        public getPercentComplete(): number {
            if (this._delayTimer < this._delay) return 0;
            return Math.min(1, this.durationTimer / this.duration);
        }

        protected newParticle(sprite: PIXI.Texture): Particle {
            return new Particle(this._additive, sprite);
        }

        protected getXSizeValues(): values.RangedNumericValue[] {
            if (this._xSizeValues === null) {
                this._xSizeValues = new values.RangedNumericValue[3]();
                this._xSizeValues[0] = this._xScaleValue;
                this._xSizeValues[1] = this._spawnWidthValue;
                this._xSizeValues[2] = this._xOffsetValue;
            }
            return this._xSizeValues;
        }

        protected getYSizeValues(): values.RangedNumericValue[] {
            if (this._ySizeValues === null) {
                this._ySizeValues = new values.RangedNumericValue[3]();
                this._ySizeValues[0] = this._yScaleValue;
                this._ySizeValues[1] = this._spawnHeightValue;
                this._ySizeValues[2] = this._yOffsetValue;
            }
            return this._ySizeValues;
        }

        protected getMotionValues(): values.RangedNumericValue[] {
            if (this._motionValues === null) {
                this._motionValues = new values.RangedNumericValue[3]();
                this._motionValues[0] = this._velocityValue;
                this._motionValues[1] = this._windValue;
                this._motionValues[2] = this._gravityValue;
            }
            return this._motionValues;
        }

        private _restart(): void {
            this._delay = this._delayValue.active ? this._delayValue.newLowValue : 0;
            this._delayTimer = 0;

            this.durationTimer -= this.duration;
            this.duration = this._durationValue.newLowValue;

            this._emission = this._emissionValue.newLowValue;
            this._emissionDiff = this._emissionValue.newHighValue;
            if (!this._emissionValue.relative) this._emissionDiff -= this._emission;

            if (!this._lifeValue.independent) this._generateLifeValues();

            if (!this._lifeOffsetValue.independent) this._generateLifeOffsetValues();

            this._spawnWidth = this._spawnWidthValue.newLowValue;
            this._spawnWidthDiff = this._spawnWidthValue.newHighValue;
            if (!this._spawnWidthValue.relative) this._spawnWidthDiff -= this._spawnWidth;

            this._spawnHeight = this._spawnHeightValue.newLowValue;
            this._spawnHeightDiff = this._spawnHeightValue.newHighValue;
            if (!this._spawnHeightValue.relative) this._spawnHeightDiff -= this._spawnHeight;

            this._updateFlags = 0;
            if (this._angleValue.active && this._angleValue.timeline.length > 1) this._updateFlags |= UpdateFlags.angle;
            if (this._velocityValue.active) this._updateFlags |= UpdateFlags.velocity;
            if (this._xScaleValue.timeline.length > 1) this._updateFlags |= UpdateFlags.scale;
            if (this._yScaleValue.active && this._yScaleValue.timeline.length > 1)
                this._updateFlags |= UpdateFlags.scale;
            if (this._rotationValue.active && this._rotationValue.timeline.length > 1)
                this._updateFlags |= UpdateFlags.rotation;
            if (this._windValue.active) this._updateFlags |= UpdateFlags.wind;
            if (this._gravityValue.active) this._updateFlags |= UpdateFlags.gravity;
            if (this._tintValue.timeline.length > 1) this._updateFlags |= UpdateFlags.tint;
            if (this._spriteMode == constants.SpriteMode.animated) this._updateFlags |= UpdateFlags.sprite;
        }

        private _initialize(): void {
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

        private _activateParticle(index: number): void {
            let sprite: PIXI.Texture = null;
            switch (this._spriteMode) {
                case constants.SpriteMode.single:
                case constants.SpriteMode.animated:
                    sprite = this.sprites[0];
                    break;
                case constants.SpriteMode.random:
                    sprite = utils.sample(this.sprites);
                    break;
            }

            let particle = this._particles[index];
            if (particle === null) {
                this._particles[index] = particle = this.newParticle(sprite);
                particle.flip.x = this._flipX;
                particle.flip.y = this._flipY;
            } else {
                particle.reset();
                particle.texture = sprite;
            }

            const percent = this.durationTimer / this.duration;
            const updateFlags = this._updateFlags;

            if (this._lifeValue.independent) this._generateLifeValues();

            if (this._lifeOffsetValue.independent) this._generateLifeOffsetValues();

            particle.currentLife = particle.life = this._life + this._lifeDiff * this._lifeValue.getScale(percent);

            if (this._velocityValue.active) {
                particle.velocity = this._velocityValue.newLowValue;
                particle.velocityDiff = this._velocityValue.newHighValue;
                if (!this._velocityValue.relative) particle.velocityDiff -= particle.velocity;
            }

            particle.angle = this._angleValue.newLowValue;
            particle.angleDiff = this._angleValue.newHighValue;
            if (!this._angleValue.relative) particle.angleDiff -= particle.angle;
            let angle = 0;
            if ((updateFlags & UpdateFlags.angle) === 0) {
                angle = particle.angle + particle.angleDiff * this._angleValue.getScale(0);
                particle.angle = angle;
                particle.angleCos = Math.cos(PIXI.DEG_TO_RAD * angle);
                particle.angleSin = Math.sin(PIXI.DEG_TO_RAD * angle);
            }

            const spriteWidth = sprite.width;
            const spriteHeight = sprite.height;

            particle.xScale = this._xScaleValue.newLowValue / spriteWidth;
            particle.xScaleDiff = this._xScaleValue.newHighValue / spriteWidth;
            if (!this._xScaleValue.relative) particle.xScaleDiff -= particle.xScale;

            if (this._yScaleValue.active) {
                particle.yScale = this._yScaleValue.newLowValue / spriteHeight;
                particle.yScaleDiff = this._yScaleValue.newHighValue / spriteHeight;
                if (!this._yScaleValue.relative) particle.yScaleDiff -= particle.yScale;
                particle.scale.set(
                    particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(0),
                    particle.yScale + particle.yScaleDiff * this._yScaleValue.getScale(0),
                );
            } else {
                particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(0));
            }

            if (this._rotationValue.active) {
                particle.rotation = this._rotationValue.newLowValue;
                particle.rotationDiff = this._rotationValue.newHighValue;
                if (!this._rotationValue.relative) particle.rotationDiff -= particle.rotation;
                let rotation = particle.rotation + particle.rotationDiff * this._rotationValue.getScale(0);
                if (this._aligned) rotation += angle;
                particle.rotation = rotation;
            }

            if (this._windValue.active) {
                particle.wind = this._windValue.newLowValue;
                particle.windDiff = this._windValue.newHighValue;
                if (!this._windValue.relative) particle.windDiff -= particle.wind;
            }

            if (this._gravityValue.active) {
                particle.gravity = this._gravityValue.newLowValue;
                particle.gravityDiff = this._gravityValue.newHighValue;
                if (!this._gravityValue.relative) particle.gravityDiff -= particle.gravity;
            }

            let color = particle.tint;
            if (color == null) particle.tint = color = [0, 0, 0];
            const temp = this._tintValue.getColor(0);
            color[0] = temp[0];
            color[1] = temp[1];
            color[2] = temp[2];

            particle.transparency = this._transparencyValue.newLowValue;
            particle.transparencyDiff = this._transparencyValue.newHighValue - particle.transparency;

            // Spawn.
            let x = this._x;
            if (this._xOffsetValue.active) x += this._xOffsetValue.newLowValue;
            let y = this._y;
            if (this._yOffsetValue.active) y += this._yOffsetValue.newLowValue;
            switch (this._spawnShapeValue.shape) {
                case constants.SpawnShape.square: {
                    const width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);
                    const height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);
                    x += utils.between(0, width) - width / 2;
                    y += utils.between(0, height) - height / 2;
                    break;
                }
                case constants.SpawnShape.ellipse: {
                    const width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);
                    const height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);
                    const radiusX = width / 2;
                    const radiusY = height / 2;
                    if (radiusX === 0 || radiusY === 0) break;
                    const scaleY = radiusX / radiusY;
                    if (this._spawnShapeValue.edges) {
                        let spawnAngle;
                        switch (this._spawnShapeValue.side) {
                            case constants.SpawnEllipseSide.top:
                                spawnAngle = utils.between(0, 179);
                                break;
                            case constants.SpawnEllipseSide.bottom:
                                spawnAngle = utils.between(0, 179);
                                break;
                            default:
                                spawnAngle = utils.between(0, 360);
                                break;
                        }
                        const cosDeg = Math.cos(PIXI.DEG_TO_RAD * angle);
                        const sinDeg = Math.sin(PIXI.DEG_TO_RAD * angle);
                        x += cosDeg * radiusX;
                        y += (sinDeg * radiusX) / scaleY;
                        if ((updateFlags & UpdateFlags.angle) === 0) {
                            particle.angle = spawnAngle;
                            particle.angleCos = cosDeg;
                            particle.angleSin = sinDeg;
                        }
                    } else {
                        const radius2 = radiusX * radiusX;
                        while (true) {
                            const px = utils.between(0, width) - radiusX;
                            const py = utils.between(0, width) - radiusX;
                            if (px * px + py * py <= radius2) {
                                x += px;
                                y += py / scaleY;
                                break;
                            }
                        }
                    }
                    break;
                }
                case constants.SpawnShape.line: {
                    const width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);
                    const height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);
                    if (width != 0) {
                        const lineX = width * Math.random();
                        x += lineX;
                        y += lineX * (height / width);
                    } else y += height * Math.random();
                    break;
                }
            }
            particle.positionOffset.set(x, y);

            let offsetTime = this._lifeOffset + this._lifeOffsetDiff * this._lifeOffsetValue.getScale(percent);
            if (offsetTime > 0) {
                if (offsetTime >= particle.currentLife) offsetTime = particle.currentLife - 1;
                this._updateParticle(particle, offsetTime, offsetTime);
            }

            this._container.addChild(particle.sprite);
        }

        private _deactivateParticle(particle: Particle): void {
            this._container.removeChild(particle.sprite);
        }

        private _updateParticle(particle: Particle, delta: number, deltaMillis: number): boolean {
            const life = particle.currentLife - deltaMillis;
            if (life <= 0) return false;
            particle.currentLife = life;

            const percent = 1 - particle.currentLife / particle.life;
            const updateFlags = this._updateFlags;

            if ((updateFlags & UpdateFlags.scale) !== 0) {
                if (this._yScaleValue.active) {
                    particle.scale.set(
                        particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(percent),
                        particle.yScale + particle.yScaleDiff * this._yScaleValue.getScale(percent),
                    );
                } else {
                    particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(percent));
                }
            }

            if ((updateFlags & UpdateFlags.velocity) !== 0) {
                const velocity =
                    (particle.velocity + particle.velocityDiff * this._velocityValue.getScale(percent)) * delta;
                let velocityX = 0,
                    velocityY = 0;
                if ((updateFlags & UpdateFlags.angle) !== 0) {
                    const angle = particle.angle + particle.angleDiff * this._angleValue.getScale(percent);
                    velocityX = velocity * Math.cos(PIXI.DEG_TO_RAD * angle);
                    velocityY = velocity * Math.sin(PIXI.DEG_TO_RAD * angle);
                    if ((updateFlags & UpdateFlags.rotation) !== 0) {
                        let rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
                        if (this._aligned) rotation -= angle;
                        particle.rotation = rotation;
                    }
                    // console.log(velocityX, velocityY);
                } else {
                    velocityX = velocity * particle.angleCos;
                    velocityY = velocity * particle.angleSin;
                    if (this._aligned || (updateFlags & UpdateFlags.rotation) !== 0) {
                        let rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
                        if (this._aligned) rotation -= particle.angle;
                        particle.rotation = rotation;
                    }
                }

                if ((updateFlags & UpdateFlags.wind) !== 0) {
                    velocityX += (particle.wind + particle.windDiff * this._windValue.getScale(percent)) * delta;
                }

                if ((updateFlags & UpdateFlags.gravity) !== 0) {
                    velocityY +=
                        (particle.gravity + particle.gravityDiff * this._gravityValue.getScale(percent)) * delta;
                }
                particle.position.x += velocityX;
                particle.position.y -= velocityY;
            } else {
                if ((updateFlags & UpdateFlags.rotation) !== 0)
                    particle.rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
            }

            let color;
            if ((updateFlags & UpdateFlags.tint) !== 0) color = this._tintValue.getColor(percent);
            else color = particle.tint;

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

        private _generateLifeValues(): void {
            this._life = this._lifeValue.newLowValue;
            this._lifeDiff = this._lifeValue.newHighValue;
            if (!this._lifeValue.relative) this._lifeDiff -= this._life;
        }

        private _generateLifeOffsetValues(): void {
            this._lifeOffset = this._lifeOffsetValue.active ? this._lifeOffsetValue.newLowValue : 0;
            this._lifeOffsetDiff = this._lifeOffsetValue.newHighValue;
            if (!this._lifeOffsetValue.relative) this._lifeOffsetDiff -= this._lifeOffset;
        }
    }
}
