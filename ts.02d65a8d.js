// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"TTUu":[function(require,module,exports) {
var pixiparticles;

(function (pixiparticles) {
  var core;

  (function (core) {
    var Particle = function () {
      function Particle(additive, texture) {
        this.rotation = 0;
        this.position = new PIXI.Point(0, 0);
        this.positionOffset = new PIXI.Point(0, 0);
        this.scale = new PIXI.Point(0, 0);
        this._sprite = new PIXI.Sprite(texture);

        this._sprite.anchor.set(0.5);

        this._sprite.blendMode = additive ? PIXI.BLEND_MODES.ADD : PIXI.BLEND_MODES.NORMAL;
      }

      Object.defineProperty(Particle.prototype, "sprite", {
        get: function get() {
          return this._sprite;
        },
        enumerable: false,
        configurable: true
      });

      Particle.prototype.reset = function () {
        this.position.set(0, 0);
        this.scale.set(1, 1);
        this.texture = null;
      };

      Particle.prototype.update = function () {
        this._sprite.texture = this.texture;
        this._sprite.tint = PIXI.utils.rgb2hex(this.color);
        this._sprite.alpha = this.color[3];
        this.scale.copyTo(this._sprite.scale);
        this._sprite.position.x = this.position.x + this.positionOffset.x;
        this._sprite.position.y = this.position.y + this.positionOffset.y;
        this._sprite.angle = this.rotation;
      };

      return Particle;
    }();

    core.Particle = Particle;
  })(core = pixiparticles.core || (pixiparticles.core = {}));
})(pixiparticles || (pixiparticles = {}));

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var pixiparticles;

(function (pixiparticles) {
  var core;

  (function (core) {
    var ParticleEffect = function (_super) {
      __extends(ParticleEffect, _super);

      function ParticleEffect(config) {
        var _this = _super.call(this) || this;

        _this._emitters = [];
        Object.keys(config).forEach(function (e) {
          var emitter = _this.newEmitter(e, config[e]);

          _this._emitters.push(emitter);
        });
        return _this;
      }

      ParticleEffect.prototype.start = function () {
        this._emitters.forEach(function (e) {
          return e.start();
        });
      };

      ParticleEffect.prototype.reset = function () {
        this._emitters.forEach(function (e) {
          return e.reset();
        });
      };

      ParticleEffect.prototype.update = function (delta) {
        this._emitters.forEach(function (e) {
          return e.update(delta);
        });
      };

      ParticleEffect.prototype.allowCompletion = function () {
        this._emitters.forEach(function (e) {
          return e.allowCompletion();
        });
      };

      ParticleEffect.prototype.isComplete = function () {
        return !this._emitters.find(function (e) {
          return !e.isComplete();
        });
      };

      ParticleEffect.prototype.setDuration = function (duration) {
        this._emitters.forEach(function (e) {
          e.continuous = false;
          e.duration = duration;
          e.durationTimer = 0;
        });
      };

      ParticleEffect.prototype.getEmitters = function () {
        return this._emitters;
      };

      ParticleEffect.prototype.findEmitter = function (name) {
        return this._emitters.find(function (e) {
          return e.name === name;
        });
      };

      ParticleEffect.prototype.preAllocateParticles = function () {
        this._emitters.forEach(function (e) {
          return e.preAllocateParticles();
        });
      };

      ParticleEffect.prototype.destroy = function (options) {
        if (options === void 0) {
          options = {
            children: true
          };
        }

        _super.prototype.destroy.call(this, options);
      };

      ParticleEffect.prototype.newEmitter = function (name, emitterConfig) {
        return new core.ParticleEmitter(this, name, emitterConfig);
      };

      return ParticleEffect;
    }(PIXI.Container);

    core.ParticleEffect = ParticleEffect;
  })(core = pixiparticles.core || (pixiparticles.core = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var core;

  (function (core) {
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

    var ParticleEmitter = function () {
      function ParticleEmitter(container, name, emitterConfig) {
        this.duration = 1;
        this.durationTimer = 0;
        this.continuous = false;
        this._delayValue = new pixiparticles.values.RangedNumericValue();
        this._lifeOffsetValue = new pixiparticles.values.IndependentScaledNumericValue();
        this._durationValue = new pixiparticles.values.RangedNumericValue();
        this._lifeValue = new pixiparticles.values.IndependentScaledNumericValue();
        this._emissionValue = new pixiparticles.values.ScaledNumericValue();
        this._xScaleValue = new pixiparticles.values.ScaledNumericValue();
        this._yScaleValue = new pixiparticles.values.ScaledNumericValue();
        this._rotationValue = new pixiparticles.values.ScaledNumericValue();
        this._velocityValue = new pixiparticles.values.ScaledNumericValue();
        this._angleValue = new pixiparticles.values.ScaledNumericValue();
        this._windValue = new pixiparticles.values.ScaledNumericValue();
        this._gravityValue = new pixiparticles.values.ScaledNumericValue();
        this._transparencyValue = new pixiparticles.values.ScaledNumericValue();
        this._tintValue = new pixiparticles.values.GradientColorValue();
        this._xOffsetValue = new pixiparticles.values.ScaledNumericValue();
        this._yOffsetValue = new pixiparticles.values.ScaledNumericValue();
        this._spawnWidthValue = new pixiparticles.values.ScaledNumericValue();
        this._spawnHeightValue = new pixiparticles.values.ScaledNumericValue();
        this._spawnShapeValue = new pixiparticles.values.SpawnShapeValue();
        this._accumulator = 0;
        this._spriteMode = pixiparticles.constants.SpriteMode.single;
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
        var options = emitterConfig.options;
        this._attached = options.attached;
        this.continuous = options.continuous;
        this._aligned = options.aligned;
        this._additive = options.additive;
        this._spriteMode = options.spriteMode;

        this._delayValue.init(emitterConfig.delay);

        this._durationValue.init(emitterConfig.duration);

        var count = emitterConfig.count;

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

        var textures = emitterConfig.textures;
        this.setTextures(textures.map(function (t) {
          return PIXI.Texture.from(t);
        }));
      }

      ParticleEmitter.prototype.update = function (delta) {
        this._accumulator += delta;
        if (this._accumulator < 1) return;
        var deltaMillis = this._accumulator;
        this._accumulator -= deltaMillis;

        if (this._delayTimer < this._delay) {
          this._delayTimer += deltaMillis;
        } else {
          var done = false;

          if (this._firstUpdate) {
            this._firstUpdate = false;

            this._addParticle();
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

            var emissionTime = this._emission + this._emissionDiff * this._emissionValue.getScale(this.durationTimer / this.duration);

            if (emissionTime > 0) {
              emissionTime = 1000 / emissionTime;

              if (this._emissionDelta >= emissionTime) {
                var emitCount = this._emissionDelta / emissionTime;
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

        var active = this._active;
        var activeCount = this._activeCount;
        var particles = this._particles;

        for (var i = 0, n = active.length; i < n; i++) {
          if (active[i] && !this._updateParticle(particles[i], delta, deltaMillis)) {
            active[i] = false;

            this._deactivateParticle(particles[i]);

            activeCount--;
          }
        }

        this._activeCount = activeCount;
      };

      ParticleEmitter.prototype.setTextures = function (sprites) {
        var _this = this;

        this.sprites = sprites;
        if (sprites.length === 0) return;

        this._particles.forEach(function (particle) {
          if (particle === null) return;
          var sprite = null;

          switch (_this._spriteMode) {
            case pixiparticles.constants.SpriteMode.single:
              sprite = sprites[0];
              break;

            case pixiparticles.constants.SpriteMode.random:
              sprite = pixiparticles.utils.sample(sprites);
              break;

            case pixiparticles.constants.SpriteMode.animated:
              var percent = 1 - particle.currentLife / particle.life;
              particle.frame = Math.min(percent * sprites.length, sprites.length - 1);
              sprite = sprites[particle.frame];
              break;
          }

          particle.texture = sprite;
        });
      };

      ParticleEmitter.prototype.setSpriteMode = function (spriteMode) {
        this._spriteMode = spriteMode;
      };

      ParticleEmitter.prototype.preAllocateParticles = function () {
        var _this = this;

        if (this.sprites.length === 0) throw new Error('ParticleEmitter.setSprites() must have been called before preAllocateParticles()');

        this._particles.forEach(function (particle, index) {
          if (particle === null) {
            _this._particles[index] = particle = _this._newParticle(_this.sprites[0]);
            particle.flip.x = _this._flipX;
            particle.flip.y = _this._flipY;
          }
        });
      };

      ParticleEmitter.prototype.allowCompletion = function () {
        this._allowCompletion = true;
        this.durationTimer = this.duration;
      };

      ParticleEmitter.prototype.start = function () {
        this._firstUpdate = true;
        this._allowCompletion = false;

        this._restart();
      };

      ParticleEmitter.prototype.reset = function () {
        this._emissionDelta = 0;
        this.durationTimer = this.duration;
        var active = this._active;

        for (var i = 0, n = active.length; i < n; i++) {
          active[i] = false;
        }

        this._activeCount = 0;
        this.start();
      };

      ParticleEmitter.prototype.isComplete = function () {
        if (this.continuous && !this._allowCompletion) return false;
        if (this._delayTimer < this._delay) return false;
        return this.durationTimer >= this.duration && this._activeCount == 0;
      };

      ParticleEmitter.prototype.getPercentComplete = function () {
        if (this._delayTimer < this._delay) return 0;
        return Math.min(1, this.durationTimer / this.duration);
      };

      ParticleEmitter.prototype._newParticle = function (sprite) {
        return new core.Particle(this._additive, sprite);
      };

      ParticleEmitter.prototype._setMaxParticleCount = function (maxParticleCount) {
        var _this = this;

        this._maxParticleCount = maxParticleCount;
        this._active = Array.apply(void 0, Array(maxParticleCount)).map(function () {
          return false;
        });
        this._activeCount = 0;
        this._particles = Array.apply(void 0, Array(maxParticleCount)).map(function () {
          return new core.Particle(_this._additive);
        });
      };

      ParticleEmitter.prototype._setMinParticleCount = function (minParticleCount) {
        this._minParticleCount = minParticleCount;
      };

      ParticleEmitter.prototype._addParticle = function () {
        var activeCount = this._activeCount;
        if (activeCount === this._maxParticleCount) return;
        var active = this._active;

        for (var i = 0, n = active.length; i < n; i++) {
          if (!active[i]) {
            this._activateParticle(i);

            active[i] = true;
            this._activeCount = activeCount + 1;
            break;
          }
        }
      };

      ParticleEmitter.prototype._addParticles = function (count) {
        count = Math.min(count, this._maxParticleCount - this._activeCount);
        if (count == 0) return;
        var active = this._active;
        var index = 0;
        var n = active.length;

        outer: for (var i = 0; i < count; i++) {
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
      };

      ParticleEmitter.prototype._restart = function () {
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
        if (this._yScaleValue.active && this._yScaleValue.timeline.length > 1) this._updateFlags |= UpdateFlags.scale;
        if (this._rotationValue.active && this._rotationValue.timeline.length > 1) this._updateFlags |= UpdateFlags.rotation;
        if (this._windValue.active) this._updateFlags |= UpdateFlags.wind;
        if (this._gravityValue.active) this._updateFlags |= UpdateFlags.gravity;
        if (this._tintValue.timeline.length > 1) this._updateFlags |= UpdateFlags.tint;
        if (this._spriteMode == pixiparticles.constants.SpriteMode.animated) this._updateFlags |= UpdateFlags.sprite;
      };

      ParticleEmitter.prototype._initialize = function () {
        this.sprites = [];
        this._durationValue.alwaysActive = true;
        this._emissionValue.alwaysActive = true;
        this._lifeValue.alwaysActive = true;
        this._xScaleValue.alwaysActive = true;
        this._transparencyValue.alwaysActive = true;
        this._spawnShapeValue.alwaysActive = true;
        this._spawnWidthValue.alwaysActive = true;
        this._spawnHeightValue.alwaysActive = true;
      };

      ParticleEmitter.prototype._activateParticle = function (index) {
        var sprite = null;

        switch (this._spriteMode) {
          case pixiparticles.constants.SpriteMode.single:
          case pixiparticles.constants.SpriteMode.animated:
            sprite = this.sprites[0];
            break;

          case pixiparticles.constants.SpriteMode.random:
            sprite = pixiparticles.utils.sample(this.sprites);
            break;
        }

        var particle = this._particles[index];

        if (particle === null) {
          this._particles[index] = particle = this._newParticle(sprite);
          particle.flip.x = this._flipX;
          particle.flip.y = this._flipY;
        } else {
          particle.reset();
          particle.texture = sprite;
        }

        var percent = this.durationTimer / this.duration;
        var updateFlags = this._updateFlags;
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
        var angle = 0;

        if ((updateFlags & UpdateFlags.angle) === 0) {
          angle = particle.angle + particle.angleDiff * this._angleValue.getScale(0);
          particle.angle = angle;
          particle.angleCos = Math.cos(PIXI.DEG_TO_RAD * angle);
          particle.angleSin = Math.sin(PIXI.DEG_TO_RAD * angle);
        }

        var spriteWidth = sprite.width;
        var spriteHeight = sprite.height;
        particle.xScale = this._xScaleValue.newLowValue / spriteWidth;
        particle.xScaleDiff = this._xScaleValue.newHighValue / spriteWidth;
        if (!this._xScaleValue.relative) particle.xScaleDiff -= particle.xScale;

        if (this._yScaleValue.active) {
          particle.yScale = this._yScaleValue.newLowValue / spriteHeight;
          particle.yScaleDiff = this._yScaleValue.newHighValue / spriteHeight;
          if (!this._yScaleValue.relative) particle.yScaleDiff -= particle.yScale;
          particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(0), particle.yScale + particle.yScaleDiff * this._yScaleValue.getScale(0));
        } else {
          particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(0));
        }

        if (this._rotationValue.active) {
          particle.rotation = this._rotationValue.newLowValue;
          particle.rotationDiff = this._rotationValue.newHighValue;
          if (!this._rotationValue.relative) particle.rotationDiff -= particle.rotation;

          var rotation = particle.rotation + particle.rotationDiff * this._rotationValue.getScale(0);

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

        var color = particle.tint;
        if (color == null) particle.tint = color = [0, 0, 0];

        var temp = this._tintValue.getColor(0);

        color[0] = temp[0];
        color[1] = temp[1];
        color[2] = temp[2];
        particle.transparency = this._transparencyValue.newLowValue;
        particle.transparencyDiff = this._transparencyValue.newHighValue - particle.transparency;
        var x = this._x;
        if (this._xOffsetValue.active) x += this._xOffsetValue.newLowValue;
        var y = this._y;
        if (this._yOffsetValue.active) y += this._yOffsetValue.newLowValue;

        switch (this._spawnShapeValue.shape) {
          case pixiparticles.constants.SpawnShape.square:
            {
              var width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);

              var height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);

              x += pixiparticles.utils.between(0, width) - width / 2;
              y += pixiparticles.utils.between(0, height) - height / 2;
              break;
            }

          case pixiparticles.constants.SpawnShape.ellipse:
            {
              var width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);

              var height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);

              var radiusX = width / 2;
              var radiusY = height / 2;
              if (radiusX === 0 || radiusY === 0) break;
              var scaleY = radiusX / radiusY;

              if (this._spawnShapeValue.edges) {
                var spawnAngle = void 0;

                switch (this._spawnShapeValue.side) {
                  case pixiparticles.constants.SpawnEllipseSide.top:
                    spawnAngle = pixiparticles.utils.between(0, 179);
                    break;

                  case pixiparticles.constants.SpawnEllipseSide.bottom:
                    spawnAngle = pixiparticles.utils.between(0, 179);
                    break;

                  default:
                    spawnAngle = pixiparticles.utils.between(0, 360);
                    break;
                }

                var cosDeg = Math.cos(PIXI.DEG_TO_RAD * angle);
                var sinDeg = Math.sin(PIXI.DEG_TO_RAD * angle);
                x += cosDeg * radiusX;
                y += sinDeg * radiusX / scaleY;

                if ((updateFlags & UpdateFlags.angle) === 0) {
                  particle.angle = spawnAngle;
                  particle.angleCos = cosDeg;
                  particle.angleSin = sinDeg;
                }
              } else {
                var radius2 = radiusX * radiusX;

                while (true) {
                  var px = pixiparticles.utils.between(0, width) - radiusX;
                  var py = pixiparticles.utils.between(0, width) - radiusX;

                  if (px * px + py * py <= radius2) {
                    x += px;
                    y += py / scaleY;
                    break;
                  }
                }
              }

              break;
            }

          case pixiparticles.constants.SpawnShape.line:
            {
              var width = this._spawnWidth + this._spawnWidthDiff * this._spawnWidthValue.getScale(percent);

              var height = this._spawnHeight + this._spawnHeightDiff * this._spawnHeightValue.getScale(percent);

              if (width != 0) {
                var lineX = width * Math.random();
                x += lineX;
                y += lineX * (height / width);
              } else y += height * Math.random();

              break;
            }
        }

        particle.positionOffset.set(x, y);

        var offsetTime = this._lifeOffset + this._lifeOffsetDiff * this._lifeOffsetValue.getScale(percent);

        if (offsetTime > 0) {
          if (offsetTime >= particle.currentLife) offsetTime = particle.currentLife - 1;

          this._updateParticle(particle, offsetTime, offsetTime);
        }

        this._container.addChild(particle.sprite);
      };

      ParticleEmitter.prototype._deactivateParticle = function (particle) {
        this._container.removeChild(particle.sprite);
      };

      ParticleEmitter.prototype._updateParticle = function (particle, delta, deltaMillis) {
        var life = particle.currentLife - deltaMillis;
        if (life <= 0) return false;
        particle.currentLife = life;
        var percent = 1 - particle.currentLife / particle.life;
        var updateFlags = this._updateFlags;

        if ((updateFlags & UpdateFlags.scale) !== 0) {
          if (this._yScaleValue.active) {
            particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(percent), particle.yScale + particle.yScaleDiff * this._yScaleValue.getScale(percent));
          } else {
            particle.scale.set(particle.xScale + particle.xScaleDiff * this._xScaleValue.getScale(percent));
          }
        }

        if ((updateFlags & UpdateFlags.velocity) !== 0) {
          var velocity = (particle.velocity + particle.velocityDiff * this._velocityValue.getScale(percent)) * delta;
          var velocityX = 0,
              velocityY = 0;

          if ((updateFlags & UpdateFlags.angle) !== 0) {
            var angle = particle.angle + particle.angleDiff * this._angleValue.getScale(percent);

            velocityX = velocity * Math.cos(PIXI.DEG_TO_RAD * angle);
            velocityY = velocity * Math.sin(PIXI.DEG_TO_RAD * angle);

            if ((updateFlags & UpdateFlags.rotation) !== 0) {
              var rotation = particle.rotationDiff * this._rotationValue.getScale(percent);

              if (this._aligned) rotation -= angle;
              particle.rotation = rotation;
            }
          } else {
            velocityX = velocity * particle.angleCos;
            velocityY = velocity * particle.angleSin;

            if (this._aligned || (updateFlags & UpdateFlags.rotation) !== 0) {
              var rotation = particle.rotationDiff * this._rotationValue.getScale(percent);

              if (this._aligned) rotation -= particle.angle;
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
        } else {
          if ((updateFlags & UpdateFlags.rotation) !== 0) particle.rotation = particle.rotationDiff * this._rotationValue.getScale(percent);
        }

        var color;
        if ((updateFlags & UpdateFlags.tint) !== 0) color = this._tintValue.getColor(percent);else color = particle.tint;
        particle.color = [color[0], color[1], color[2], particle.transparency + particle.transparencyDiff * this._transparencyValue.getScale(percent)];

        if ((updateFlags & UpdateFlags.sprite) !== 0) {
          var frame = Math.min(percent * this.sprites.length, this.sprites.length - 1);

          if (particle.frame !== frame) {
            var sprite = this.sprites[frame];
            particle.texture = sprite;
          }
        }

        particle.update();
        return true;
      };

      ParticleEmitter.prototype._generateLifeValues = function () {
        this._life = this._lifeValue.newLowValue;
        this._lifeDiff = this._lifeValue.newHighValue;
        if (!this._lifeValue.relative) this._lifeDiff -= this._life;
      };

      ParticleEmitter.prototype._generateLifeOffsetValues = function () {
        this._lifeOffset = this._lifeOffsetValue.active ? this._lifeOffsetValue.newLowValue : 0;
        this._lifeOffsetDiff = this._lifeOffsetValue.newHighValue;
        if (!this._lifeOffsetValue.relative) this._lifeOffsetDiff -= this._lifeOffset;
      };

      return ParticleEmitter;
    }();

    core.ParticleEmitter = ParticleEmitter;
  })(core = pixiparticles.core || (pixiparticles.core = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  PIXI.particles = pixiparticles;
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var constants;

  (function (constants) {
    var SpawnEllipseSide;

    (function (SpawnEllipseSide) {
      SpawnEllipseSide[SpawnEllipseSide["both"] = 0] = "both";
      SpawnEllipseSide[SpawnEllipseSide["top"] = 1] = "top";
      SpawnEllipseSide[SpawnEllipseSide["bottom"] = 2] = "bottom";
    })(SpawnEllipseSide = constants.SpawnEllipseSide || (constants.SpawnEllipseSide = {}));
  })(constants = pixiparticles.constants || (pixiparticles.constants = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var constants;

  (function (constants) {
    var SpawnShape;

    (function (SpawnShape) {
      SpawnShape[SpawnShape["point"] = 0] = "point";
      SpawnShape[SpawnShape["line"] = 1] = "line";
      SpawnShape[SpawnShape["square"] = 2] = "square";
      SpawnShape[SpawnShape["ellipse"] = 3] = "ellipse";
    })(SpawnShape = constants.SpawnShape || (constants.SpawnShape = {}));
  })(constants = pixiparticles.constants || (pixiparticles.constants = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var constants;

  (function (constants) {
    var SpriteMode;

    (function (SpriteMode) {
      SpriteMode[SpriteMode["single"] = 0] = "single";
      SpriteMode[SpriteMode["random"] = 1] = "random";
      SpriteMode[SpriteMode["animated"] = 2] = "animated";
    })(SpriteMode = constants.SpriteMode || (constants.SpriteMode = {}));
  })(constants = pixiparticles.constants || (pixiparticles.constants = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var utils;

  (function (utils) {
    utils.between = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
  })(utils = pixiparticles.utils || (pixiparticles.utils = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var utils;

  (function (utils) {
    utils.isNullOrUndefined = function (obj) {
      return typeof obj === 'undefined' || obj === null;
    };
  })(utils = pixiparticles.utils || (pixiparticles.utils = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var utils;

  (function (utils) {
    utils.sample = function (array) {
      return array[utils.between(0, array.length - 1)];
    };
  })(utils = pixiparticles.utils || (pixiparticles.utils = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var values;

  (function (values) {
    var Value = function () {
      function Value() {}

      Value.prototype.init = function (value) {
        if (!this.alwaysActive) {
          this.active = value.active;
        } else {
          this.active = true;
        }
      };

      return Value;
    }();

    values.Value = Value;
  })(values = pixiparticles.values || (pixiparticles.values = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var values;

  (function (values) {
    var GradientColorValue = function (_super) {
      __extends(GradientColorValue, _super);

      function GradientColorValue() {
        var _this = _super.call(this) || this;

        _this.colors = [1, 1, 1];
        _this.timeline = [0];
        _this.alwaysActive = true;
        return _this;
      }

      GradientColorValue.prototype.getColor = function (percent) {
        var startIndex = 0;
        var endIndex = -1;
        var timeline = this.timeline;
        var n = timeline.length;

        for (var i = 1; i < n; i++) {
          var t = timeline[i];

          if (t > percent) {
            endIndex = i;
            break;
          }

          startIndex = i;
        }

        var startTime = timeline[startIndex];
        startIndex *= 3;
        var r1 = this.colors[startIndex];
        var g1 = this.colors[startIndex + 1];
        var b1 = this.colors[startIndex + 2];

        if (endIndex == -1) {
          GradientColorValue._temp[0] = r1;
          GradientColorValue._temp[1] = g1;
          GradientColorValue._temp[2] = b1;
          return GradientColorValue._temp;
        }

        var factor = (percent - startTime) / (timeline[endIndex] - startTime);
        endIndex *= 3;
        GradientColorValue._temp[0] = r1 + (this.colors[endIndex] - r1) * factor;
        GradientColorValue._temp[1] = g1 + (this.colors[endIndex + 1] - g1) * factor;
        GradientColorValue._temp[2] = b1 + (this.colors[endIndex + 2] - b1) * factor;
        return GradientColorValue._temp;
      };

      GradientColorValue.prototype.init = function (value) {
        _super.prototype.init.call(this, value);

        if (!this.active) return;
        var colorsCount = value.colorsCount;

        for (var i = 0; i < colorsCount; i++) {
          this.colors[i] = value['colors' + i];
        }

        var timelineCount = value.timelineCount;

        for (var i = 0; i < timelineCount; i++) {
          this.timeline[i] = value['timeline' + i];
        }
      };

      GradientColorValue._temp = [0, 0, 0, 0];
      return GradientColorValue;
    }(values.Value);

    values.GradientColorValue = GradientColorValue;
  })(values = pixiparticles.values || (pixiparticles.values = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var values;

  (function (values) {
    var RangedNumericValue = function (_super) {
      __extends(RangedNumericValue, _super);

      function RangedNumericValue() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      Object.defineProperty(RangedNumericValue.prototype, "newLowValue", {
        get: function get() {
          return this.lowMin + (this.lowMax - this.lowMin) * Math.random();
        },
        enumerable: false,
        configurable: true
      });

      RangedNumericValue.prototype.setLow = function (min, max) {
        this.lowMin = min;
        this.lowMax = pixiparticles.utils.isNullOrUndefined(max) ? min : max;
      };

      RangedNumericValue.prototype.scale = function (scale) {
        this.lowMin *= scale;
        this.lowMax *= scale;
      };

      RangedNumericValue.prototype.init = function (value) {
        _super.prototype.init.call(this, value);

        this.lowMin = value.lowMin;
        this.lowMax = value.lowMax;
      };

      return RangedNumericValue;
    }(values.Value);

    values.RangedNumericValue = RangedNumericValue;
  })(values = pixiparticles.values || (pixiparticles.values = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var values;

  (function (values) {
    var ScaledNumericValue = function (_super) {
      __extends(ScaledNumericValue, _super);

      function ScaledNumericValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.scaling = [1];
        _this.timeline = [0];
        return _this;
      }

      Object.defineProperty(ScaledNumericValue.prototype, "newHighValue", {
        get: function get() {
          return this.highMin + (this.highMax - this.highMin) * Math.random();
        },
        enumerable: false,
        configurable: true
      });

      ScaledNumericValue.prototype.setHigh = function (min, max) {
        this.highMin = min;
        this.highMax = pixiparticles.utils.isNullOrUndefined(max) ? min : max;
      };

      ScaledNumericValue.prototype.scale = function (scale) {
        _super.prototype.scale.call(this, scale);

        this.highMin *= scale;
        this.highMax *= scale;
      };

      ScaledNumericValue.prototype.getScaling = function () {
        return this.scaling;
      };

      ScaledNumericValue.prototype.getScale = function (percent) {
        var endIndex = -1;
        var timeline = this.timeline;
        var n = timeline.length;

        for (var i = 1; i < n; i++) {
          var t = timeline[i];

          if (t > percent) {
            endIndex = i;
            break;
          }
        }

        if (endIndex == -1) return this.scaling[n - 1];
        var scaling = this.scaling;
        var startIndex = endIndex - 1;
        var startValue = scaling[startIndex];
        var startTime = timeline[startIndex];
        return startValue + (scaling[endIndex] - startValue) * ((percent - startTime) / (timeline[endIndex] - startTime));
      };

      ScaledNumericValue.prototype.init = function (value) {
        _super.prototype.init.call(this, value);

        if (!this.active) return;
        this.highMin = value.highMin;
        this.highMax = value.highMax;
        this.relative = value.relative;
        var scalingCount = value.scalingCount;
        this.scaling = [];

        for (var i = 0; i < scalingCount; i++) {
          this.scaling.push(value['scaling' + i]);
        }

        var timelineCount = value.timelineCount;
        this.timeline = [];

        for (var i = 0; i < timelineCount; i++) {
          this.timeline.push(value['timeline' + i]);
        }
      };

      return ScaledNumericValue;
    }(values.RangedNumericValue);

    values.ScaledNumericValue = ScaledNumericValue;
  })(values = pixiparticles.values || (pixiparticles.values = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var values;

  (function (values) {
    var IndependentScaledNumericValue = function (_super) {
      __extends(IndependentScaledNumericValue, _super);

      function IndependentScaledNumericValue() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      IndependentScaledNumericValue.prototype.init = function (value) {
        _super.prototype.init.call(this, value);

        this.independent = value.independent;
      };

      return IndependentScaledNumericValue;
    }(values.ScaledNumericValue);

    values.IndependentScaledNumericValue = IndependentScaledNumericValue;
  })(values = pixiparticles.values || (pixiparticles.values = {}));
})(pixiparticles || (pixiparticles = {}));

var pixiparticles;

(function (pixiparticles) {
  var values;

  (function (values) {
    var SpawnShapeValue = function (_super) {
      __extends(SpawnShapeValue, _super);

      function SpawnShapeValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.shape = pixiparticles.constants.SpawnShape.point;
        _this.side = pixiparticles.constants.SpawnEllipseSide.both;
        return _this;
      }

      SpawnShapeValue.prototype.init = function (value) {
        _super.prototype.init.call(this, value);

        if (!this.active) return;
        this.shape = value.shape;

        if (this.shape === pixiparticles.constants.SpawnShape.ellipse) {
          this.edges = value.edges;
          this.side = value.side;
        }
      };

      return SpawnShapeValue;
    }(values.Value);

    values.SpawnShapeValue = SpawnShapeValue;
  })(values = pixiparticles.values || (pixiparticles.values = {}));
})(pixiparticles || (pixiparticles = {}));
},{}],"ImUG":[function(require,module,exports) {
module.exports = {
  "smoke": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 75,
      "highMax": 75,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 1,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.30821916,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 90,
      "highMax": 270,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 0.94520545
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.037,
      "highMax": 0.037,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 0.9298246,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.21232876,
      "timeline2": 0.77397263,
      "timeline3": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["cloud_1.png"]
  }
};
},{}],"OaIm":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Burnout = void 0;

var burnout_json_1 = __importDefault(require("../../assets/effects/burnout.json"));

var Burnout = function (_super) {
  __extends(Burnout, _super);

  function Burnout() {
    return _super.call(this, burnout_json_1.default) || this;
  }

  Object.defineProperty(Burnout.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Burnout;
}(PIXI.particles.core.ParticleEffect);

exports.Burnout = Burnout;
},{"../../assets/effects/burnout.json":"ImUG"}],"bweM":[function(require,module,exports) {
module.exports = {
  "confetti": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 500,
      "lowMax": 500
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 3000,
      "highMax": 3000,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 1,
      "scaling1": 1,
      "scaling2": 0.3,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.66,
      "timeline2": 1,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.15,
      "highMax": 0.45,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 21,
      "lowMax": 21,
      "highMin": 10,
      "highMax": 50,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 1,
      "scaling1": 0,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.5,
      "timeline2": 1
    },
    "rotation": {
      "active": true,
      "lowMin": -1,
      "lowMax": -360,
      "highMin": -180,
      "highMax": -180,
      "relative": true,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.05,
      "highMax": -0.15,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 1,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.2,
      "timeline2": 0.82191783,
      "timeline3": 0.9726027
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["confetti1.png", "confetti2.png", "confetti3.png", "confetti4.png", "confetti5.png", "confetti6.png"]
  }
};
},{}],"V8IA":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Confetti = void 0;

var confetti_json_1 = __importDefault(require("../../assets/effects/confetti.json"));

var Confetti = function (_super) {
  __extends(Confetti, _super);

  function Confetti() {
    return _super.call(this, confetti_json_1.default) || this;
  }

  Object.defineProperty(Confetti.prototype, "duration", {
    get: function get() {
      return 4000;
    },
    enumerable: false,
    configurable: true
  });
  return Confetti;
}(PIXI.particles.core.ParticleEffect);

exports.Confetti = Confetti;
},{"../../assets/effects/confetti.json":"bweM"}],"C5J3":[function(require,module,exports) {
module.exports = {
  "dust": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 43,
      "highMax": 43,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 430,
      "highMax": 430,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -10,
        "lowMax": -10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 51,
        "highMax": 51,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.9589041
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.134,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -30,
      "highMax": 30,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.41568628,
      "colors1": 0.23137255,
      "colors2": 0.019607844,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["cloud_1.png"]
  },
  "dust1": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 43,
      "highMax": 43,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 430,
      "highMax": 430,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": 10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 51,
        "highMax": 51,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.9589041
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.134,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 150,
      "highMax": 210,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.41568628,
      "colors1": 0.23137255,
      "colors2": 0.019607844,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["cloud_1.png"]
  }
};
},{}],"OUFj":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dust = void 0;

var dust_json_1 = __importDefault(require("../../assets/effects/dust.json"));

var Dust = function (_super) {
  __extends(Dust, _super);

  function Dust() {
    return _super.call(this, dust_json_1.default) || this;
  }

  Object.defineProperty(Dust.prototype, "duration", {
    get: function get() {
      return 1500;
    },
    enumerable: false,
    configurable: true
  });
  return Dust;
}(PIXI.particles.core.ParticleEffect);

exports.Dust = Dust;
},{"../../assets/effects/dust.json":"C5J3"}],"rPEF":[function(require,module,exports) {
module.exports = {
  "dust": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 43,
      "highMax": 43,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 430,
      "highMax": 430,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 51,
        "highMax": 51,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.9589041
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.134,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 150,
      "highMax": 210,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.41568628,
      "colors1": 0.23137255,
      "colors2": 0.019607844,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["cloud_1.png"]
  }
};
},{}],"ko7t":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DustLeft = void 0;

var dust_left_json_1 = __importDefault(require("../../assets/effects/dust-left.json"));

var DustLeft = function (_super) {
  __extends(DustLeft, _super);

  function DustLeft() {
    return _super.call(this, dust_left_json_1.default) || this;
  }

  Object.defineProperty(DustLeft.prototype, "duration", {
    get: function get() {
      return 1500;
    },
    enumerable: false,
    configurable: true
  });
  return DustLeft;
}(PIXI.particles.core.ParticleEffect);

exports.DustLeft = DustLeft;
},{"../../assets/effects/dust-left.json":"rPEF"}],"CPHa":[function(require,module,exports) {
module.exports = {
  "dust": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 43,
      "highMax": 43,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 430,
      "highMax": 430,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 51,
        "highMax": 51,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.9589041
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.134,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -30,
      "highMax": 30,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.41568628,
      "colors1": 0.23137255,
      "colors2": 0.019607844,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["cloud_1.png"]
  }
};
},{}],"JSgh":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DustRight = void 0;

var dust_right_json_1 = __importDefault(require("../../assets/effects/dust-right.json"));

var DustRight = function (_super) {
  __extends(DustRight, _super);

  function DustRight() {
    return _super.call(this, dust_right_json_1.default) || this;
  }

  Object.defineProperty(DustRight.prototype, "duration", {
    get: function get() {
      return 1500;
    },
    enumerable: false,
    configurable: true
  });
  return DustRight;
}(PIXI.particles.core.ParticleEffect);

exports.DustRight = DustRight;
},{"../../assets/effects/dust-right.json":"CPHa"}],"AJM1":[function(require,module,exports) {
module.exports = {
  "explosion": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 540,
      "highMax": 540,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 64,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 1,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.36301368,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.05,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  },
  "spark": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 25,
      "highMax": 25,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 8,
        "highMax": 8,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.2,
      "highMax": 0.3,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.88235295,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  },
  "spark1": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 25,
      "highMax": 25,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 8,
        "highMax": 8,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.2,
      "highMax": 0.3,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"E0bi":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explosion = void 0;

var explosion_json_1 = __importDefault(require("../../assets/effects/explosion.json"));

var Explosion = function (_super) {
  __extends(Explosion, _super);

  function Explosion() {
    return _super.call(this, explosion_json_1.default) || this;
  }

  Object.defineProperty(Explosion.prototype, "duration", {
    get: function get() {
      return 1600;
    },
    enumerable: false,
    configurable: true
  });
  return Explosion;
}(PIXI.particles.core.ParticleEffect);

exports.Explosion = Explosion;
},{"../../assets/effects/explosion.json":"AJM1"}],"PwJF":[function(require,module,exports) {
module.exports = {
  "explosion": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 400,
      "highMax": 400,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -2,
        "lowMax": 2,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -2,
        "lowMax": 2,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  },
  "explosion1": {
    "delay": {
      "active": true,
      "lowMin": 175,
      "lowMax": 175
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 400,
      "highMax": 400,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": 13,
        "lowMax": 17,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -2,
        "lowMax": 2,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  },
  "explosion2": {
    "delay": {
      "active": true,
      "lowMin": 350,
      "lowMax": 350
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 400,
      "highMax": 400,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -13,
        "lowMax": -17,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": 13,
        "lowMax": 17,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  },
  "explosion3": {
    "delay": {
      "active": true,
      "lowMin": 525,
      "lowMax": 525
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 400,
      "highMax": 400,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": 13,
        "lowMax": 17,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -13,
        "lowMax": -17,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  },
  "explosion4": {
    "delay": {
      "active": true,
      "lowMin": 700,
      "lowMax": 700
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 400,
      "highMax": 400,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -2,
        "lowMax": 2,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": 13,
        "lowMax": 17,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  }
};
},{}],"Lm7E":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExplosionEnemy = void 0;

var explosion_enemy_json_1 = __importDefault(require("../../assets/effects/explosion-enemy.json"));

var ExplosionEnemy = function (_super) {
  __extends(ExplosionEnemy, _super);

  function ExplosionEnemy() {
    return _super.call(this, explosion_enemy_json_1.default) || this;
  }

  Object.defineProperty(ExplosionEnemy.prototype, "duration", {
    get: function get() {
      return 1600;
    },
    enumerable: false,
    configurable: true
  });
  return ExplosionEnemy;
}(PIXI.particles.core.ParticleEffect);

exports.ExplosionEnemy = ExplosionEnemy;
},{"../../assets/effects/explosion-enemy.json":"PwJF"}],"SZC4":[function(require,module,exports) {
module.exports = {
  "explosion": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 540,
      "highMax": 540,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 1,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.36301368,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.05,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["explosion-1.png", "explosion-2.png", "explosion-3.png"]
  },
  "spark": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 25,
      "highMax": 25,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 4,
        "highMax": 4,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.1,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.88235295,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  },
  "spark1": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 25,
      "highMax": 25,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 4,
        "highMax": 4,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.1,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"Jg5U":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExplosionSmall = void 0;

var explosion_small_json_1 = __importDefault(require("../../assets/effects/explosion-small.json"));

var ExplosionSmall = function (_super) {
  __extends(ExplosionSmall, _super);

  function ExplosionSmall() {
    return _super.call(this, explosion_small_json_1.default) || this;
  }

  Object.defineProperty(ExplosionSmall.prototype, "duration", {
    get: function get() {
      return 1600;
    },
    enumerable: false,
    configurable: true
  });
  return ExplosionSmall;
}(PIXI.particles.core.ParticleEffect);

exports.ExplosionSmall = ExplosionSmall;
},{"../../assets/effects/explosion-small.json":"SZC4"}],"ptaR":[function(require,module,exports) {
module.exports = {
  "fireball": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 90,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 180,
      "highMax": -180,
      "relative": true,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.739726,
      "timeline2": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["thrust-1.png", "thrust-2.png", "thrust-3.png"]
  },
  "trail": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 50,
        "highMax": 50,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.01,
      "highMax": 0.01,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 180,
      "highMax": -180,
      "relative": true,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.3,
      "highMax": -0.3,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["thrust-1.png", "thrust-2.png", "thrust-3.png"]
  }
};
},{}],"Ok7n":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fireball = void 0;

var fireball_json_1 = __importDefault(require("../../assets/effects/fireball.json"));

var Fireball = function (_super) {
  __extends(Fireball, _super);

  function Fireball() {
    return _super.call(this, fireball_json_1.default) || this;
  }

  Object.defineProperty(Fireball.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Fireball;
}(PIXI.particles.core.ParticleEffect);

exports.Fireball = Fireball;
},{"../../assets/effects/fireball.json":"ptaR"}],"WP5A":[function(require,module,exports) {
module.exports = {
  "fireball": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 90,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 180,
      "highMax": -180,
      "relative": true,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 0.33333334,
      "colors1": 0.047058824,
      "colors2": 1,
      "colors3": 0.047058824,
      "colors4": 0.8235294,
      "colors5": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.739726,
      "timeline2": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["thrust-1.png", "thrust-2.png", "thrust-3.png"]
  },
  "trail": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -10,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 50,
        "highMax": 50,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.01,
      "highMax": 0.01,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 180,
      "highMax": -180,
      "relative": true,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.3,
      "highMax": -0.3,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 0.105882354,
      "colors1": 0.047058824,
      "colors2": 1,
      "colors3": 0.047058824,
      "colors4": 0.52156866,
      "colors5": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["thrust-1.png", "thrust-2.png", "thrust-3.png"]
  }
};
},{}],"iY9E":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireballBlue = void 0;

var fireball_blue_json_1 = __importDefault(require("../../assets/effects/fireball-blue.json"));

var FireballBlue = function (_super) {
  __extends(FireballBlue, _super);

  function FireballBlue() {
    return _super.call(this, fireball_blue_json_1.default) || this;
  }

  Object.defineProperty(FireballBlue.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return FireballBlue;
}(PIXI.particles.core.ParticleEffect);

exports.FireballBlue = FireballBlue;
},{"../../assets/effects/fireball-blue.json":"WP5A"}],"Tnvu":[function(require,module,exports) {
module.exports = {
  "effect1": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 250,
      "highMax": 250,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 600,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 56,
        "highMax": 56,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.05,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.23,
      "highMax": -0.23,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0,
      "colors2": 0,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 1,
      "scaling1": 1,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.70547944,
      "timeline2": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "effect2": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 250,
      "lowMax": 250
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 250,
      "highMax": 250,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 600,
      "highMax": 700,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 56,
        "highMax": 56,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.116,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.23,
      "highMax": -0.23,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 0,
      "colors1": 0.047058824,
      "colors2": 1,
      "colors3": 0.49019608,
      "colors4": 0.5137255,
      "colors5": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 1,
      "scaling1": 0.98245615,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.45890412,
      "timeline2": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  }
};
},{}],"jArv":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fireworks = void 0;

var fireworks_json_1 = __importDefault(require("../../assets/effects/fireworks.json"));

var Fireworks = function (_super) {
  __extends(Fireworks, _super);

  function Fireworks() {
    return _super.call(this, fireworks_json_1.default) || this;
  }

  Object.defineProperty(Fireworks.prototype, "duration", {
    get: function get() {
      return 1200;
    },
    enumerable: false,
    configurable: true
  });
  return Fireworks;
}(PIXI.particles.core.ParticleEffect);

exports.Fireworks = Fireworks;
},{"../../assets/effects/fireworks.json":"Tnvu"}],"sv7L":[function(require,module,exports) {
module.exports = {
  "firework-tracer": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 77,
      "highMax": 77,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 40,
        "highMax": 60,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0.025,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.02,
      "highMax": -0.02,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 0.85882354,
      "colors1": 0.91764706,
      "colors2": 1,
      "colors3": 0,
      "colors4": 0.83137256,
      "colors5": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "firework": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 10,
      "highMax": 10,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 60,
        "highMax": 60,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.004,
      "highMax": 0.004,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0,
      "colors1": 0.7647059,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  }
};
},{}],"URHl":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireworksTracer = void 0;

var fireworks_tracer_json_1 = __importDefault(require("../../assets/effects/fireworks-tracer.json"));

var FireworksTracer = function (_super) {
  __extends(FireworksTracer, _super);

  function FireworksTracer() {
    return _super.call(this, fireworks_tracer_json_1.default) || this;
  }

  Object.defineProperty(FireworksTracer.prototype, "duration", {
    get: function get() {
      return 3000;
    },
    enumerable: false,
    configurable: true
  });
  return FireworksTracer;
}(PIXI.particles.core.ParticleEffect);

exports.FireworksTracer = FireworksTracer;
},{"../../assets/effects/fireworks-tracer.json":"sv7L"}],"W1vy":[function(require,module,exports) {
module.exports = {
  "firework-tracer": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 77,
      "highMax": 77,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 40,
        "highMax": 60,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0.025,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.02,
      "highMax": -0.02,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 0.85882354,
      "colors1": 0.91764706,
      "colors2": 1,
      "colors3": 0,
      "colors4": 0.83137256,
      "colors5": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "firework": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 10,
      "highMax": 10,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 60,
        "highMax": 60,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.004,
      "highMax": 0.004,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0,
      "colors1": 0.7647059,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "dazzler": {
    "delay": {
      "active": true,
      "lowMin": 1250,
      "lowMax": 1250
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 8,
      "highMax": 8,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 20,
      "highMax": 20,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 67,
        "highMax": 67,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.021,
      "highMax": 0.021,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.58431375,
      "colors1": 0.9882353,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "dazzler1": {
    "delay": {
      "active": true,
      "lowMin": 1250,
      "lowMax": 1250
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 8,
      "highMax": 8,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 20,
      "highMax": 20,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 67,
        "highMax": 67,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.021,
      "highMax": 0.021,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.58431375,
      "colors1": 0.9882353,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "dazzler2": {
    "delay": {
      "active": true,
      "lowMin": 1250,
      "lowMax": 1250
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 8,
      "highMax": 8,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 20,
      "highMax": 20,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 67,
        "highMax": 67,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.021,
      "highMax": 0.021,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.58431375,
      "colors1": 0.9882353,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "dazzler3": {
    "delay": {
      "active": true,
      "lowMin": 1250,
      "lowMax": 1250
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 8,
      "highMax": 8,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 20,
      "highMax": 20,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 67,
        "highMax": 67,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.021,
      "highMax": 0.021,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.58431375,
      "colors1": 0.9882353,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  },
  "dazzler4": {
    "delay": {
      "active": true,
      "lowMin": 1250,
      "lowMax": 1250
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 8,
      "highMax": 8,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 20,
      "highMax": 20,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 67,
        "highMax": 67,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.021,
      "highMax": 0.021,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.58431375,
      "colors1": 0.9882353,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["firework.png"]
  }
};
},{}],"iOuL":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireworksTracerWithDazzler = void 0;

var fireworks_tracer_with_dazzler_json_1 = __importDefault(require("../../assets/effects/fireworks-tracer-with-dazzler.json"));

var FireworksTracerWithDazzler = function (_super) {
  __extends(FireworksTracerWithDazzler, _super);

  function FireworksTracerWithDazzler() {
    return _super.call(this, fireworks_tracer_with_dazzler_json_1.default) || this;
  }

  Object.defineProperty(FireworksTracerWithDazzler.prototype, "duration", {
    get: function get() {
      return 3000;
    },
    enumerable: false,
    configurable: true
  });
  return FireworksTracerWithDazzler;
}(PIXI.particles.core.ParticleEffect);

exports.FireworksTracerWithDazzler = FireworksTracerWithDazzler;
},{"../../assets/effects/fireworks-tracer-with-dazzler.json":"W1vy"}],"atxa":[function(require,module,exports) {
module.exports = {
  "ember": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 10,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1200,
      "highMax": 1800,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -15,
        "lowMax": 15,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 15,
        "lowMax": 15,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0.27450982,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.34931508,
        "timeline2": 0.9931507
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0.05,
      "lowMax": 0.05,
      "highMin": 0.069,
      "highMax": 0.159,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 15,
      "lowMax": 165,
      "highMin": 90,
      "highMax": 90,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.047058824,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 0.80701756,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.15068494,
      "timeline2": 0.48630136,
      "timeline3": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle4.png"]
  },
  "flame": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 79,
      "highMax": 79,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 900,
      "highMax": 1500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 55,
        "highMax": 55,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0.27450982,
        "scaling1": 1,
        "scaling2": 0.49019608,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.34931508,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.04,
      "highMax": 0.085,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 45,
      "lowMax": 135,
      "highMin": 90,
      "highMax": 90,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.21176471,
      "colors2": 0.078431375,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 0.80701756,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.15068494,
      "timeline2": 0.48630136,
      "timeline3": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle3.png"]
  }
};
},{}],"VBic":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flame = void 0;

var flame_json_1 = __importDefault(require("../../assets/effects/flame.json"));

var Flame = function (_super) {
  __extends(Flame, _super);

  function Flame() {
    return _super.call(this, flame_json_1.default) || this;
  }

  Object.defineProperty(Flame.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Flame;
}(PIXI.particles.core.ParticleEffect);

exports.Flame = Flame;
},{"../../assets/effects/flame.json":"atxa"}],"XEJW":[function(require,module,exports) {
module.exports = {
  "flame": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 20,
      "highMax": 20,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 900,
      "highMax": 1500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -15,
        "lowMax": 15,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 15,
        "lowMax": 15,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0.27450982,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.34931508,
        "timeline2": 0.9931507
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0.05,
      "lowMax": 0.05,
      "highMin": 0.069,
      "highMax": 0.159,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 45,
      "lowMax": 135,
      "highMin": 90,
      "highMax": 90,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.5568628,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 0.80701756,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.15068494,
      "timeline2": 0.48630136,
      "timeline3": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rect.png"]
  }
};
},{}],"lTqa":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlamePixel = void 0;

var flame_pixel_json_1 = __importDefault(require("../../assets/effects/flame-pixel.json"));

var FlamePixel = function (_super) {
  __extends(FlamePixel, _super);

  function FlamePixel() {
    return _super.call(this, flame_pixel_json_1.default) || this;
  }

  Object.defineProperty(FlamePixel.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return FlamePixel;
}(PIXI.particles.core.ParticleEffect);

exports.FlamePixel = FlamePixel;
},{"../../assets/effects/flame-pixel.json":"XEJW"}],"TgGu":[function(require,module,exports) {
module.exports = {
  "glass": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 200,
      "highMax": 200,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 5,
        "lowMax": 5,
        "highMin": 10,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.225,
      "highMax": 0.387,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": -360,
      "highMin": 360,
      "highMax": -360,
      "relative": true,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.34,
      "highMax": -0.34,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.6784314,
      "colors1": 0.6862745,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.09589041,
      "timeline2": 0.6712329,
      "timeline3": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["glass-1.png", "glass-2.png", "glass-3.png", "glass-4.png", "glass-5.png", "glass-6.png"]
  }
};
},{}],"NUt3":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Glass = void 0;

var glass_json_1 = __importDefault(require("../../assets/effects/glass.json"));

var Glass = function (_super) {
  __extends(Glass, _super);

  function Glass() {
    return _super.call(this, glass_json_1.default) || this;
  }

  Object.defineProperty(Glass.prototype, "duration", {
    get: function get() {
      return 1500;
    },
    enumerable: false,
    configurable: true
  });
  return Glass;
}(PIXI.particles.core.ParticleEffect);

exports.Glass = Glass;
},{"../../assets/effects/glass.json":"TgGu"}],"oza3":[function(require,module,exports) {
module.exports = {
  "neutron": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 14,
      "highMax": 14,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 100,
        "highMax": 100,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 27,
      "colors0": 1,
      "colors1": 0.047058824,
      "colors2": 0.047058824,
      "colors3": 1,
      "colors4": 0.69411767,
      "colors5": 0.047058824,
      "colors6": 0.95686275,
      "colors7": 1,
      "colors8": 0.047058824,
      "colors9": 0.047058824,
      "colors10": 1,
      "colors11": 0.09019608,
      "colors12": 0.047058824,
      "colors13": 0.9254902,
      "colors14": 1,
      "colors15": 0.047058824,
      "colors16": 0.11764706,
      "colors17": 1,
      "colors18": 0.4509804,
      "colors19": 0.047058824,
      "colors20": 1,
      "colors21": 1,
      "colors22": 0.047058824,
      "colors23": 0.972549,
      "colors24": 1,
      "colors25": 0.047058824,
      "colors26": 0.047058824,
      "timelineCount": 9,
      "timeline0": 0,
      "timeline1": 0.16351119,
      "timeline2": 0.2616179,
      "timeline3": 0.38554215,
      "timeline4": 0.51979345,
      "timeline5": 0.6506024,
      "timeline6": 0.7555938,
      "timeline7": 0.8915663,
      "timeline8": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["neutron.png", "neutron-full.png"]
  }
};
},{}],"BjDA":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hallucinogen = void 0;

var hallucinogen_json_1 = __importDefault(require("../../assets/effects/hallucinogen.json"));

var Hallucinogen = function (_super) {
  __extends(Hallucinogen, _super);

  function Hallucinogen() {
    return _super.call(this, hallucinogen_json_1.default) || this;
  }

  Object.defineProperty(Hallucinogen.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Hallucinogen;
}(PIXI.particles.core.ParticleEffect);

exports.Hallucinogen = Hallucinogen;
},{"../../assets/effects/hallucinogen.json":"oza3"}],"assN":[function(require,module,exports) {
module.exports = {
  "neutron": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 14,
      "highMax": 14,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 100,
        "highMax": 100,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 27,
      "colors0": 1,
      "colors1": 0.047058824,
      "colors2": 0.047058824,
      "colors3": 1,
      "colors4": 0.69411767,
      "colors5": 0.047058824,
      "colors6": 0.95686275,
      "colors7": 1,
      "colors8": 0.047058824,
      "colors9": 0.047058824,
      "colors10": 1,
      "colors11": 0.09019608,
      "colors12": 0.047058824,
      "colors13": 0.9254902,
      "colors14": 1,
      "colors15": 0.047058824,
      "colors16": 0.11764706,
      "colors17": 1,
      "colors18": 0.4509804,
      "colors19": 0.047058824,
      "colors20": 1,
      "colors21": 1,
      "colors22": 0.047058824,
      "colors23": 0.972549,
      "colors24": 1,
      "colors25": 0.047058824,
      "colors26": 0.047058824,
      "timelineCount": 9,
      "timeline0": 0,
      "timeline1": 0.16351119,
      "timeline2": 0.2616179,
      "timeline3": 0.38554215,
      "timeline4": 0.51979345,
      "timeline5": 0.6506024,
      "timeline6": 0.7555938,
      "timeline7": 0.8915663,
      "timeline8": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["neutron-full.png"]
  }
};
},{}],"nBHU":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HallucinogenFull = void 0;

var hallucinogen_full_json_1 = __importDefault(require("../../assets/effects/hallucinogen-full.json"));

var HallucinogenFull = function (_super) {
  __extends(HallucinogenFull, _super);

  function HallucinogenFull() {
    return _super.call(this, hallucinogen_full_json_1.default) || this;
  }

  Object.defineProperty(HallucinogenFull.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return HallucinogenFull;
}(PIXI.particles.core.ParticleEffect);

exports.HallucinogenFull = HallucinogenFull;
},{"../../assets/effects/hallucinogen-full.json":"assN"}],"jjRj":[function(require,module,exports) {
module.exports = {
  "laser": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 200,
      "highMax": 200,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 1,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 800,
        "highMax": 800,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 2,
        "highMax": 2,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0.1,
      "highMin": 0,
      "highMax": 0.1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.047058824,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.63013697,
      "timeline2": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"QTQ1":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Laser = void 0;

var laser_json_1 = __importDefault(require("../../assets/effects/laser.json"));

var Laser = function (_super) {
  __extends(Laser, _super);

  function Laser() {
    return _super.call(this, laser_json_1.default) || this;
  }

  Object.defineProperty(Laser.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Laser;
}(PIXI.particles.core.ParticleEffect);

exports.Laser = Laser;
},{"../../assets/effects/laser.json":"jjRj"}],"vPmm":[function(require,module,exports) {
module.exports = {
  "muzzle flash": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 300
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 142,
        "highMax": 142,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": true,
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 41,
        "highMax": 41,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.47945204,
        "timeline2": 1
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 0.5,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.20784314,
      "colors2": 0.11372549,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png", "dash.png"]
  }
};
},{}],"pNHk":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuzzleFlash = void 0;

var muzzle_flash_json_1 = __importDefault(require("../../assets/effects/muzzle-flash.json"));

var MuzzleFlash = function (_super) {
  __extends(MuzzleFlash, _super);

  function MuzzleFlash() {
    return _super.call(this, muzzle_flash_json_1.default) || this;
  }

  Object.defineProperty(MuzzleFlash.prototype, "duration", {
    get: function get() {
      return 300;
    },
    enumerable: false,
    configurable: true
  });
  return MuzzleFlash;
}(PIXI.particles.core.ParticleEffect);

exports.MuzzleFlash = MuzzleFlash;
},{"../../assets/effects/muzzle-flash.json":"vPmm"}],"PLyr":[function(require,module,exports) {
module.exports = {
  "smoke": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 75,
      "highMax": 75,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": 0,
        "lowMax": 10,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 88,
        "highMax": 88,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.1,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -60,
      "highMax": 60,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.094,
      "highMax": 0.094,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.5882353,
      "colors1": 0.5882353,
      "colors2": 0.5882353,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle3.png"]
  },
  "muzzle flash": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 300
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 142,
        "highMax": 142,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": true,
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 41,
        "highMax": 41,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.47945204,
        "timeline2": 1
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 0.5,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.2,
      "colors2": 0.11372549,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": false,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png", "dash.png"]
  }
};
},{}],"HF9b":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuzzleFlashWithSmoke = void 0;

var muzzle_flash_with_smoke_json_1 = __importDefault(require("../../assets/effects/muzzle-flash-with-smoke.json"));

var MuzzleFlashWithSmoke = function (_super) {
  __extends(MuzzleFlashWithSmoke, _super);

  function MuzzleFlashWithSmoke() {
    return _super.call(this, muzzle_flash_with_smoke_json_1.default) || this;
  }

  Object.defineProperty(MuzzleFlashWithSmoke.prototype, "duration", {
    get: function get() {
      return 600;
    },
    enumerable: false,
    configurable: true
  });
  return MuzzleFlashWithSmoke;
}(PIXI.particles.core.ParticleEffect);

exports.MuzzleFlashWithSmoke = MuzzleFlashWithSmoke;
},{"../../assets/effects/muzzle-flash-with-smoke.json":"PLyr"}],"zVyH":[function(require,module,exports) {
module.exports = {
  "Pentagram": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 14,
      "highMax": 14,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -3,
        "lowMax": 3,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -3,
        "lowMax": 3,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 100,
        "highMax": 100,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["pentagram-glow.png"]
  }
};
},{}],"AqCd":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pentagram = void 0;

var pentagram_json_1 = __importDefault(require("../../assets/effects/pentagram.json"));

var Pentagram = function (_super) {
  __extends(Pentagram, _super);

  function Pentagram() {
    return _super.call(this, pentagram_json_1.default) || this;
  }

  Object.defineProperty(Pentagram.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Pentagram;
}(PIXI.particles.core.ParticleEffect);

exports.Pentagram = Pentagram;
},{"../../assets/effects/pentagram.json":"zVyH"}],"tllq":[function(require,module,exports) {
module.exports = {
  "pentagram": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 14,
      "highMax": 14,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -3,
        "lowMax": 3,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -3,
        "lowMax": 3,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 100,
        "highMax": 100,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["pentagram.png"]
  }
};
},{}],"SRow":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PentagramGlitchy = void 0;

var pentagram_glitchy_json_1 = __importDefault(require("../../assets/effects/pentagram-glitchy.json"));

var PentagramGlitchy = function (_super) {
  __extends(PentagramGlitchy, _super);

  function PentagramGlitchy() {
    return _super.call(this, pentagram_glitchy_json_1.default) || this;
  }

  Object.defineProperty(PentagramGlitchy.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return PentagramGlitchy;
}(PIXI.particles.core.ParticleEffect);

exports.PentagramGlitchy = PentagramGlitchy;
},{"../../assets/effects/pentagram-glitchy.json":"tllq"}],"KPPu":[function(require,module,exports) {
module.exports = {
  "rain": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 500
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 200,
      "highMax": 200,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 2000,
      "highMax": 2000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 1,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 800,
        "highMax": 800,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 9,
        "highMax": 9,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 1,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.60958904,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.6,
      "highMax": 0.6,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 270,
      "highMax": 270,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.047058824,
      "colors1": 0.19215687,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rain-blurred.png"]
  }
};
},{}],"nFt8":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rain = void 0;

var rain_json_1 = __importDefault(require("../../assets/effects/rain.json"));

var Rain = function (_super) {
  __extends(Rain, _super);

  function Rain() {
    return _super.call(this, rain_json_1.default) || this;
  }

  Object.defineProperty(Rain.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Rain;
}(PIXI.particles.core.ParticleEffect);

exports.Rain = Rain;
},{"../../assets/effects/rain.json":"KPPu"}],"kQtM":[function(require,module,exports) {
module.exports = {
  "rain": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 2000,
      "highMax": 2000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 1,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 800,
        "highMax": 800,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 204,
        "highMax": 408,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.10958904
      },
      "y": {
        "active": true,
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 4,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0.09803922,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.31506848
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1.5,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 225,
      "highMax": 225,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -45,
      "highMax": -45,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rain-cinematic.png"]
  }
};
},{}],"HmBr":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RainCinematic = void 0;

var rain_cinematic_json_1 = __importDefault(require("../../assets/effects/rain-cinematic.json"));

var RainCinematic = function (_super) {
  __extends(RainCinematic, _super);

  function RainCinematic() {
    return _super.call(this, rain_cinematic_json_1.default) || this;
  }

  Object.defineProperty(RainCinematic.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return RainCinematic;
}(PIXI.particles.core.ParticleEffect);

exports.RainCinematic = RainCinematic;
},{"../../assets/effects/rain-cinematic.json":"kQtM"}],"L8eT":[function(require,module,exports) {
module.exports = {
  "smoke": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 500
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 87,
      "highMax": 87,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 700,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -3,
        "lowMax": 3,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -3,
        "lowMax": 3,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 10,
        "lowMax": 10,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.032,
      "highMax": 0.032,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 0.7294118,
      "colors1": 0.7294118,
      "colors2": 0.7294118,
      "colors3": 0.3764706,
      "colors4": 0.3764706,
      "colors5": 0.3764706,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"f0QK":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Smoke = void 0;

var smoke_json_1 = __importDefault(require("../../assets/effects/smoke.json"));

var Smoke = function (_super) {
  __extends(Smoke, _super);

  function Smoke() {
    return _super.call(this, smoke_json_1.default) || this;
  }

  Object.defineProperty(Smoke.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Smoke;
}(PIXI.particles.core.ParticleEffect);

exports.Smoke = Smoke;
},{"../../assets/effects/smoke.json":"L8eT"}],"BHvT":[function(require,module,exports) {
module.exports = {
  "smoke": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1000,
      "highMax": 1000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 50,
        "highMax": 50,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 0.6862745,
        "scaling2": 1,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.12328767,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.2,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 0.5410959
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 260,
      "highMax": 280,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 5,
      "scaling0": 0.01754386,
      "scaling1": 0.71929824,
      "scaling2": 1,
      "scaling3": 1,
      "scaling4": 0,
      "timelineCount": 5,
      "timeline0": 0,
      "timeline1": 0.16438356,
      "timeline2": 0.39726028,
      "timeline3": 0.74657536,
      "timeline4": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["cloud_1.png"]
  }
};
},{}],"EgWF":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmokeTrail = void 0;

var smoke_trail_json_1 = __importDefault(require("../../assets/effects/smoke-trail.json"));

var SmokeTrail = function (_super) {
  __extends(SmokeTrail, _super);

  function SmokeTrail() {
    return _super.call(this, smoke_trail_json_1.default) || this;
  }

  Object.defineProperty(SmokeTrail.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return SmokeTrail;
}(PIXI.particles.core.ParticleEffect);

exports.SmokeTrail = SmokeTrail;
},{"../../assets/effects/smoke-trail.json":"BHvT"}],"CNgG":[function(require,module,exports) {
module.exports = {
  "smoke": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 300
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 2000,
      "highMax": 2000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": true,
        "lowMin": -5,
        "lowMax": 5,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 64,
        "highMax": 64,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.760274,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.01,
      "highMax": 0.01,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 180,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.128,
      "highMax": 0.128,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.79452056,
      "timeline2": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.38431373,
      "colors1": 0.38431373,
      "colors2": 0.38431373,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 1,
      "scaling1": 1,
      "scaling2": 1,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.8150685,
      "timeline2": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle1.png"]
  }
};
},{}],"mVV0":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmokeTrain = void 0;

var smoke_train_json_1 = __importDefault(require("../../assets/effects/smoke-train.json"));

var SmokeTrain = function (_super) {
  __extends(SmokeTrain, _super);

  function SmokeTrain() {
    return _super.call(this, smoke_train_json_1.default) || this;
  }

  Object.defineProperty(SmokeTrain.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return SmokeTrain;
}(PIXI.particles.core.ParticleEffect);

exports.SmokeTrain = SmokeTrain;
},{"../../assets/effects/smoke-train.json":"CNgG"}],"s5y8":[function(require,module,exports) {
module.exports = {
  "flakes": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 600
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 5,
      "highMax": 5,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 15000,
      "highMax": 20000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": true,
        "lowMin": 32,
        "lowMax": 32,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "spawn": {
      "shape": 1,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 800,
        "highMax": 800,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 16,
        "highMax": 64,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.035,
      "highMax": 0.045,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 270,
      "highMax": 270,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 180,
      "highMax": -180,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["snow-flake.png"]
  }
};
},{}],"BfbF":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnowFlakes = void 0;

var snow_flakes_json_1 = __importDefault(require("../../assets/effects/snow-flakes.json"));

var SnowFlakes = function (_super) {
  __extends(SnowFlakes, _super);

  function SnowFlakes() {
    return _super.call(this, snow_flakes_json_1.default) || this;
  }

  Object.defineProperty(SnowFlakes.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return SnowFlakes;
}(PIXI.particles.core.ParticleEffect);

exports.SnowFlakes = SnowFlakes;
},{"../../assets/effects/snow-flakes.json":"s5y8"}],"TlIK":[function(require,module,exports) {
module.exports = {
  "sparks": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1000,
      "highMax": 1000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 11,
        "highMax": 11,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0.15686275,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": true,
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 2,
        "highMax": 2,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.025,
      "highMax": 0.144,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 0.9794521
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 180,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.9843137,
      "colors2": 0,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 0.96575344
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": true,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle3.png"]
  },
  "flame": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 3,
        "highMax": 3,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.01,
      "highMax": 0.01,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "colors3": 1,
      "colors4": 0.93333334,
      "colors5": 0.047058824,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.24657534,
      "timeline2": 0.60958904,
      "timeline3": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"c5bp":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sparks = void 0;

var sparks_json_1 = __importDefault(require("../../assets/effects/sparks.json"));

var Sparks = function (_super) {
  __extends(Sparks, _super);

  function Sparks() {
    return _super.call(this, sparks_json_1.default) || this;
  }

  Object.defineProperty(Sparks.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Sparks;
}(PIXI.particles.core.ParticleEffect);

exports.Sparks = Sparks;
},{"../../assets/effects/sparks.json":"TlIK"}],"QEE3":[function(require,module,exports) {
module.exports = {
  "splash": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 200,
      "lowMax": 200
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 300,
      "highMax": 300,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1000,
      "highMax": 1000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 5,
        "highMax": 12,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 1,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.5068493,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.1,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 0.8235294,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 120,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.36,
      "highMax": -0.36,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0,
      "colors1": 0.105882354,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["circle1.png"]
  },
  "blurp": {
    "delay": {
      "active": true,
      "lowMin": 200,
      "lowMax": 200
    },
    "duration": {
      "lowMin": 100,
      "lowMax": 100
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 300,
      "highMax": 300,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 2000,
      "highMax": 2000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 12,
        "highMax": 12,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 1,
        "scaling2": 0,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.6438356,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.1,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 89,
      "highMax": 91,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.8,
      "highMax": -0.8,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0,
      "colors1": 0.105882354,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["circle1.png"]
  }
};
},{}],"Y6MS":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Splash = void 0;

var splash_json_1 = __importDefault(require("../../assets/effects/splash.json"));

var Splash = function (_super) {
  __extends(Splash, _super);

  function Splash() {
    return _super.call(this, splash_json_1.default) || this;
  }

  Object.defineProperty(Splash.prototype, "duration", {
    get: function get() {
      return 4000;
    },
    enumerable: false,
    configurable: true
  });
  return Splash;
}(PIXI.particles.core.ParticleEffect);

exports.Splash = Splash;
},{"../../assets/effects/splash.json":"QEE3"}],"yFoc":[function(require,module,exports) {
module.exports = {
  "splash": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 200,
      "lowMax": 200
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1000,
      "highMax": 1000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 11,
        "highMax": 11,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.760274
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.1,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 30,
      "highMax": 150,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.36,
      "highMax": -0.36,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0,
      "colors1": 0.105882354,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rect.png"]
  },
  "blurp": {
    "delay": {
      "active": true,
      "lowMin": 200,
      "lowMax": 200
    },
    "duration": {
      "lowMin": 300,
      "lowMax": 300
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 2000,
      "highMax": 2000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 11,
        "highMax": 11,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 0.6438356
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.2,
      "highMax": 0.3,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 85,
      "highMax": 95,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": -0.8,
      "highMax": -0.8,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 0,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0,
      "colors1": 0.105882354,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": false,
      "continuous": false,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rect.png"]
  }
};
},{}],"VPDe":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplashPixel = void 0;

var splash_pixel_json_1 = __importDefault(require("../../assets/effects/splash-pixel.json"));

var SplashPixel = function (_super) {
  __extends(SplashPixel, _super);

  function SplashPixel() {
    return _super.call(this, splash_pixel_json_1.default) || this;
  }

  Object.defineProperty(SplashPixel.prototype, "duration", {
    get: function get() {
      return 4000;
    },
    enumerable: false,
    configurable: true
  });
  return SplashPixel;
}(PIXI.particles.core.ParticleEffect);

exports.SplashPixel = SplashPixel;
},{"../../assets/effects/splash-pixel.json":"yFoc"}],"qnJN":[function(require,module,exports) {
module.exports = {
  "star": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.2,
      "highMax": 0.2,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 180,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.045,
      "highMax": 0.045,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 24,
      "colors0": 1,
      "colors1": 0.047058824,
      "colors2": 0.047058824,
      "colors3": 1,
      "colors4": 0.5686275,
      "colors5": 0,
      "colors6": 1,
      "colors7": 0.9490196,
      "colors8": 0.047058824,
      "colors9": 0.047058824,
      "colors10": 1,
      "colors11": 0.19215687,
      "colors12": 0.047058824,
      "colors13": 1,
      "colors14": 0.8784314,
      "colors15": 0.047058824,
      "colors16": 0.22352941,
      "colors17": 1,
      "colors18": 1,
      "colors19": 0.047058824,
      "colors20": 0.87058824,
      "colors21": 1,
      "colors22": 0.047058824,
      "colors23": 0.047058824,
      "timelineCount": 8,
      "timeline0": 0,
      "timeline1": 0.12671755,
      "timeline2": 0.24732825,
      "timeline3": 0.38015267,
      "timeline4": 0.51450384,
      "timeline5": 0.64732826,
      "timeline6": 0.84885496,
      "timeline7": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.05479452,
      "timeline2": 0.739726,
      "timeline3": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["star_1.png"]
  }
};
},{}],"e6NX":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = void 0;

var star_json_1 = __importDefault(require("../../assets/effects/star.json"));

var Star = function (_super) {
  __extends(Star, _super);

  function Star() {
    return _super.call(this, star_json_1.default) || this;
  }

  Object.defineProperty(Star.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Star;
}(PIXI.particles.core.ParticleEffect);

exports.Star = Star;
},{"../../assets/effects/star.json":"qnJN"}],"JT3k":[function(require,module,exports) {
module.exports = {
  "flame": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 7,
        "highMax": 7,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.015,
      "highMax": 0.015,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "colors3": 1,
      "colors4": 0.93333334,
      "colors5": 0.047058824,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.24657534,
      "timeline2": 0.60958904,
      "timeline3": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  },
  "sparks": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1000,
      "highMax": 1000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 74,
        "highMax": 74,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": true,
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 8,
        "highMax": 8,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.025,
      "highMax": 0.144,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 0,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.9843137,
      "colors2": 0,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.1849315,
      "timeline2": 0.8082192,
      "timeline3": 0.96575344
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": true,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["spark-colored.png"]
  }
};
},{}],"B6oR":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Starlight = void 0;

var starlight_json_1 = __importDefault(require("../../assets/effects/starlight.json"));

var Starlight = function (_super) {
  __extends(Starlight, _super);

  function Starlight() {
    return _super.call(this, starlight_json_1.default) || this;
  }

  Object.defineProperty(Starlight.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Starlight;
}(PIXI.particles.core.ParticleEffect);

exports.Starlight = Starlight;
},{"../../assets/effects/starlight.json":"JT3k"}],"iFd5":[function(require,module,exports) {
module.exports = {
  "fart": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 734,
      "highMax": 734,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 200,
        "highMax": 200,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.084,
      "highMax": 0.084,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.015686275,
      "colors1": 0.34117648,
      "colors2": 0.019607844,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 3,
      "scaling0": 1,
      "scaling1": 0.6666667,
      "scaling2": 0,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.32876712,
      "timeline2": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"k9RK":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stink = void 0;

var stink_json_1 = __importDefault(require("../../assets/effects/stink.json"));

var Stink = function (_super) {
  __extends(Stink, _super);

  function Stink() {
    return _super.call(this, stink_json_1.default) || this;
  }

  Object.defineProperty(Stink.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Stink;
}(PIXI.particles.core.ParticleEffect);

exports.Stink = Stink;
},{"../../assets/effects/stink.json":"iFd5"}],"ADPC":[function(require,module,exports) {
module.exports = {
  "thrust": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 500
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 200,
      "highMax": 200,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 700,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 10,
        "lowMax": 10,
        "highMin": 16,
        "highMax": 30,
        "relative": true,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.016,
      "highMax": 0.016,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": -360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.9529412,
      "colors1": 0.1882353,
      "colors2": 0,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["thrust-1.png", "thrust-2.png", "thrust-3.png"]
  }
};
},{}],"HWYs":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thrust = void 0;

var thrust_json_1 = __importDefault(require("../../assets/effects/thrust.json"));

var Thrust = function (_super) {
  __extends(Thrust, _super);

  function Thrust() {
    return _super.call(this, thrust_json_1.default) || this;
  }

  Object.defineProperty(Thrust.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Thrust;
}(PIXI.particles.core.ParticleEffect);

exports.Thrust = Thrust;
},{"../../assets/effects/thrust.json":"ADPC"}],"aAAh":[function(require,module,exports) {
module.exports = {
  "thrust": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 100,
      "highMax": 100,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 32,
        "lowMax": 32,
        "highMin": 64,
        "highMax": 64,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0,
        "scaling1": 0.98039216,
        "scaling2": 1,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.49315068,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.2,
      "highMax": 0.3,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 270,
      "highMax": 270,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 360,
      "highMax": -360,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 1,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 0.12156863,
      "colors2": 0.047058824,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 4,
      "scaling0": 0,
      "scaling1": 1,
      "scaling2": 1,
      "scaling3": 0,
      "timelineCount": 4,
      "timeline0": 0,
      "timeline1": 0.21917808,
      "timeline2": 0.65068495,
      "timeline3": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": true,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 1
    },
    "textures": ["thrust-1.png", "thrust-2.png", "thrust-3.png"]
  }
};
},{}],"DB3D":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thruster = void 0;

var thruster_json_1 = __importDefault(require("../../assets/effects/thruster.json"));

var Thruster = function (_super) {
  __extends(Thruster, _super);

  function Thruster() {
    return _super.call(this, thruster_json_1.default) || this;
  }

  Object.defineProperty(Thruster.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Thruster;
}(PIXI.particles.core.ParticleEffect);

exports.Thruster = Thruster;
},{"../../assets/effects/thruster.json":"aAAh"}],"B9Ud":[function(require,module,exports) {
module.exports = {
  "smoke": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 34,
      "highMax": 34,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1200,
      "highMax": 1200,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 17,
        "highMax": 17,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0.39215687,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.14,
      "highMax": 0.14,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 230,
      "highMax": 310,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 6,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "colors3": 0.58431375,
      "colors4": 0.58431375,
      "colors5": 0.58431375,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rect.png"]
  },
  "thruster": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 10000,
      "lowMax": 10000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 12,
      "highMax": 12,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 700,
      "highMax": 1000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 32,
        "highMax": 32,
        "relative": false,
        "scalingCount": 3,
        "scaling0": 0.15686275,
        "scaling1": 1,
        "scaling2": 0.33333334,
        "timelineCount": 3,
        "timeline0": 0,
        "timeline1": 0.19178082,
        "timeline2": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.225,
      "highMax": 0.225,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 260,
      "highMax": 280,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 9,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "colors3": 1,
      "colors4": 0.53333336,
      "colors5": 0,
      "colors6": 1,
      "colors7": 0.12156863,
      "colors8": 0.047058824,
      "timelineCount": 3,
      "timeline0": 0,
      "timeline1": 0.36014625,
      "timeline2": 1
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": true,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rect.png"]
  }
};
},{}],"DFCl":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThrusterPixel = void 0;

var thruster_pixel_json_1 = __importDefault(require("../../assets/effects/thruster-pixel.json"));

var ThrusterPixel = function (_super) {
  __extends(ThrusterPixel, _super);

  function ThrusterPixel() {
    return _super.call(this, thruster_pixel_json_1.default) || this;
  }

  Object.defineProperty(ThrusterPixel.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return ThrusterPixel;
}(PIXI.particles.core.ParticleEffect);

exports.ThrusterPixel = ThrusterPixel;
},{"../../assets/effects/thruster-pixel.json":"B9Ud"}],"LoqE":[function(require,module,exports) {
module.exports = {
  "trail": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 11,
      "highMax": 11,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 2000,
      "highMax": 2000,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 5,
        "highMax": 5,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 1,
        "scaling1": 0,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle3.png"]
  }
};
},{}],"beIB":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trail = void 0;

var trail_json_1 = __importDefault(require("../../assets/effects/trail.json"));

var Trail = function (_super) {
  __extends(Trail, _super);

  function Trail() {
    return _super.call(this, trail_json_1.default) || this;
  }

  Object.defineProperty(Trail.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return Trail;
}(PIXI.particles.core.ParticleEffect);

exports.Trail = Trail;
},{"../../assets/effects/trail.json":"LoqE"}],"S1vW":[function(require,module,exports) {
module.exports = {
  "fart": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 200
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 50,
      "highMax": 50,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 734,
      "highMax": 734,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 20,
        "highMax": 20,
        "relative": false,
        "scalingCount": 2,
        "scaling0": 0,
        "scaling1": 1,
        "timelineCount": 2,
        "timeline0": 0,
        "timeline1": 1
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0.006,
      "highMax": 0.006,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "angle": {
      "active": true,
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 0,
      "highMax": 360,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 0.015686275,
      "colors1": 0.34117648,
      "colors2": 0.019607844,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 2,
      "scaling0": 1,
      "scaling1": 0,
      "timelineCount": 2,
      "timeline0": 0,
      "timeline1": 1
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["circle2.png"]
  }
};
},{}],"fxBz":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrailFart = void 0;

var trail_fart_json_1 = __importDefault(require("../../assets/effects/trail-fart.json"));

var TrailFart = function (_super) {
  __extends(TrailFart, _super);

  function TrailFart() {
    return _super.call(this, trail_fart_json_1.default) || this;
  }

  Object.defineProperty(TrailFart.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return TrailFart;
}(PIXI.particles.core.ParticleEffect);

exports.TrailFart = TrailFart;
},{"../../assets/effects/trail-fart.json":"S1vW"}],"oWKa":[function(require,module,exports) {
module.exports = {
  "trail": {
    "delay": {
      "active": false
    },
    "duration": {
      "lowMin": 1000,
      "lowMax": 1000
    },
    "count": {
      "min": 0,
      "max": 25
    },
    "emission": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 11,
      "highMax": 11,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "life": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 500,
      "highMax": 500,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0,
      "independent": false,
      "offset": {
        "active": false,
        "independent": false
      }
    },
    "offset": {
      "x": {
        "active": false
      },
      "y": {
        "active": false
      }
    },
    "spawn": {
      "shape": 0,
      "width": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "height": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 0,
        "highMax": 0,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      }
    },
    "scale": {
      "x": {
        "lowMin": 0,
        "lowMax": 0,
        "highMin": 2,
        "highMax": 2,
        "relative": false,
        "scalingCount": 1,
        "scaling0": 1,
        "timelineCount": 1,
        "timeline0": 0
      },
      "y": {
        "active": false
      }
    },
    "velocity": {
      "active": false
    },
    "angle": {
      "active": false
    },
    "rotation": {
      "active": false
    },
    "wind": {
      "active": false
    },
    "gravity": {
      "active": false
    },
    "tint": {
      "colorsCount": 3,
      "colors0": 1,
      "colors1": 1,
      "colors2": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "transparency": {
      "lowMin": 0,
      "lowMax": 0,
      "highMin": 1,
      "highMax": 1,
      "relative": false,
      "scalingCount": 1,
      "scaling0": 1,
      "timelineCount": 1,
      "timeline0": 0
    },
    "options": {
      "attached": false,
      "continuous": true,
      "aligned": false,
      "additive": false,
      "behind": false,
      "premultipliedAlpha": false,
      "spriteMode": 0
    },
    "textures": ["rect.png"]
  }
};
},{}],"mpve":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrailPixel = void 0;

var trail_pixel_json_1 = __importDefault(require("../../assets/effects/trail-pixel.json"));

var TrailPixel = function (_super) {
  __extends(TrailPixel, _super);

  function TrailPixel() {
    return _super.call(this, trail_pixel_json_1.default) || this;
  }

  Object.defineProperty(TrailPixel.prototype, "duration", {
    get: function get() {
      return 9999999999;
    },
    enumerable: false,
    configurable: true
  });
  return TrailPixel;
}(PIXI.particles.core.ParticleEffect);

exports.TrailPixel = TrailPixel;
},{"../../assets/effects/trail-pixel.json":"oWKa"}],"M2TG":[function(require,module,exports) {
module.exports = "default.a025414a.png";
},{}],"Vc3g":[function(require,module,exports) {
module.exports = "explosion-1.af478eda.png";
},{}],"tJ14":[function(require,module,exports) {
module.exports = "explosion-2.3f005637.png";
},{}],"Ylob":[function(require,module,exports) {
module.exports = "explosion-3.2f1ce5f7.png";
},{}],"LPIv":[function(require,module,exports) {
module.exports = "thrust-1.e9d75c04.png";
},{}],"Jyfz":[function(require,module,exports) {
module.exports = "thrust-2.903dbec3.png";
},{}],"mdPH":[function(require,module,exports) {
module.exports = "thrust-3.bf187eb5.png";
},{}],"JIeZ":[function(require,module,exports) {
module.exports = "circle.4560016d.png";
},{}],"Aefm":[function(require,module,exports) {
module.exports = "circle1.6b97a76b.png";
},{}],"Ij1B":[function(require,module,exports) {
module.exports = "circle2.4560016d.png";
},{}],"indE":[function(require,module,exports) {
module.exports = "circle3.03cd401b.png";
},{}],"c1hk":[function(require,module,exports) {
module.exports = "circle4.efe40eb2.png";
},{}],"T4zc":[function(require,module,exports) {
module.exports = "cloud_1.900940fb.png";
},{}],"VLIg":[function(require,module,exports) {
module.exports = "firework.882f31b8.png";
},{}],"BFss":[function(require,module,exports) {
module.exports = "rect.2964ad82.png";
},{}],"ACCR":[function(require,module,exports) {
module.exports = "glass-1.6e46777e.png";
},{}],"aqVV":[function(require,module,exports) {
module.exports = "glass-2.c5168be7.png";
},{}],"MUTY":[function(require,module,exports) {
module.exports = "glass-3.aa60cbf1.png";
},{}],"B0pJ":[function(require,module,exports) {
module.exports = "glass-4.ceca9f90.png";
},{}],"y5vm":[function(require,module,exports) {
module.exports = "glass-5.70a9f1d9.png";
},{}],"bsT7":[function(require,module,exports) {
module.exports = "glass-6.76e5e444.png";
},{}],"JlXc":[function(require,module,exports) {
module.exports = "neutron-full.91ec1944.png";
},{}],"oyEA":[function(require,module,exports) {
module.exports = "neutron.a11fede6.png";
},{}],"F7rL":[function(require,module,exports) {
module.exports = "dash.616cd89e.png";
},{}],"gyv8":[function(require,module,exports) {
module.exports = "pentagram.17c30e80.png";
},{}],"GK2o":[function(require,module,exports) {
module.exports = "pentagram-glow.302027c1.png";
},{}],"BQ1h":[function(require,module,exports) {
module.exports = "rain-cinematic.af4ce7b5.png";
},{}],"bvCN":[function(require,module,exports) {
module.exports = "rain-blurred.ff67a3a8.png";
},{}],"d77d":[function(require,module,exports) {
module.exports = "snow-flake.cdf3c970.png";
},{}],"je1y":[function(require,module,exports) {
module.exports = "star-real.9f0a24fb.png";
},{}],"NHi9":[function(require,module,exports) {
module.exports = "star_1.06e52a3c.png";
},{}],"KRYV":[function(require,module,exports) {
module.exports = "spark-colored.6dbb4002.png";
},{}],"Ip6K":[function(require,module,exports) {
module.exports = "confetti1.4a49cd01.png";
},{}],"gv8e":[function(require,module,exports) {
module.exports = "confetti2.5f3a62b7.png";
},{}],"UYUm":[function(require,module,exports) {
module.exports = "confetti3.c7196c1e.png";
},{}],"n50s":[function(require,module,exports) {
module.exports = "confetti4.e7c7e01a.png";
},{}],"b0ec":[function(require,module,exports) {
module.exports = "confetti5.6ce04992.png";
},{}],"YB24":[function(require,module,exports) {
module.exports = "confetti6.46229a8d.png";
},{}],"LQOA":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../../bin/pixi-particles");

var burnout_1 = require("./effects/burnout");

var confetti_1 = require("./effects/confetti");

var dust_1 = require("./effects/dust");

var dust_left_1 = require("./effects/dust-left");

var dust_right_1 = require("./effects/dust-right");

var explosion_1 = require("./effects/explosion");

var explosion_enemy_1 = require("./effects/explosion-enemy");

var explosion_small_1 = require("./effects/explosion-small");

var fireball_1 = require("./effects/fireball");

var fireball_blue_1 = require("./effects/fireball-blue");

var fireworks_1 = require("./effects/fireworks");

var fireworks_tracer_1 = require("./effects/fireworks-tracer");

var fireworks_tracer_with_dazzler_1 = require("./effects/fireworks-tracer-with-dazzler");

var flame_1 = require("./effects/flame");

var flame_pixel_1 = require("./effects/flame-pixel");

var glass_1 = require("./effects/glass");

var hallucinogen_1 = require("./effects/hallucinogen");

var hallucinogen_full_1 = require("./effects/hallucinogen-full");

var laser_1 = require("./effects/laser");

var muzzle_flash_1 = require("./effects/muzzle-flash");

var muzzle_flash_with_smoke_1 = require("./effects/muzzle-flash-with-smoke");

var pentagram_1 = require("./effects/pentagram");

var pentagram_glitchy_1 = require("./effects/pentagram-glitchy");

var rain_1 = require("./effects/rain");

var rain_cinematic_1 = require("./effects/rain-cinematic");

var smoke_1 = require("./effects/smoke");

var smoke_trail_1 = require("./effects/smoke-trail");

var smoke_train_1 = require("./effects/smoke-train");

var snow_flakes_1 = require("./effects/snow-flakes");

var sparks_1 = require("./effects/sparks");

var splash_1 = require("./effects/splash");

var splash_pixel_1 = require("./effects/splash-pixel");

var star_1 = require("./effects/star");

var starlight_1 = require("./effects/starlight");

var stink_1 = require("./effects/stink");

var thrust_1 = require("./effects/thrust");

var thruster_1 = require("./effects/thruster");

var thruster_pixel_1 = require("./effects/thruster-pixel");

var trail_1 = require("./effects/trail");

var trail_fart_1 = require("./effects/trail-fart");

var trail_pixel_1 = require("./effects/trail-pixel");

var Game = function (_super) {
  __extends(Game, _super);

  function Game() {
    var _this = _super.call(this, {
      resizeTo: window,
      backgroundColor: 0x000000
    }) || this;

    document.getElementById('gameContainer').appendChild(_this.view);
    return _this;
  }

  Game.prototype.init = function () {
    return __awaiter(this, void 0, Promise, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this._load()];

          case 1:
            _a.sent();

            this._addButtons();

            this._initEffect(13);

            this.ticker.add(function () {
              _this._effect.update(_this.ticker.deltaMS);
            });
            return [2];
        }
      });
    });
  };

  Game.prototype._addButtons = function () {
    var _this = this;

    var buttonsContainer = document.getElementById('buttonsContainer');

    Game._effects.forEach(function (e, index) {
      var button = document.createElement('button');

      button.onclick = function () {
        _this._initEffect(index);
      };

      button.innerHTML = e.name;
      buttonsContainer.appendChild(button);
    });
  };

  Game.prototype._initEffect = function (index) {
    var _this = this;

    this._effect && this._effect.destroy();
    this._effectInterval && clearInterval(this._effectInterval);
    this._effect = new Game._effects[index]();

    this._effect.start();

    this._effect.x = this.renderer.width / 2;
    this._effect.y = this.renderer.height / 2;
    this.stage.addChild(this._effect);
    this._effectInterval = setInterval(function () {
      _this._effect.reset();

      _this._effect.start();
    }, this._effect.duration);
  };

  Game.prototype._load = function () {
    var _this = this;

    return new Promise(function (resolve) {
      _this.loader.add('default.png', require('../assets/particles/default.png')).add('explosion-1.png', require('../assets/particles/explosion-1.png')).add('explosion-2.png', require('../assets/particles/explosion-2.png')).add('explosion-3.png', require('../assets/particles/explosion-3.png')).add('thrust-1.png', require('../assets/particles/thrust-1.png')).add('thrust-2.png', require('../assets/particles/thrust-2.png')).add('thrust-3.png', require('../assets/particles/thrust-3.png')).add('circle.png', require('../assets/particles/circle.png')).add('circle1.png', require('../assets/particles/circle1.png')).add('circle2.png', require('../assets/particles/circle2.png')).add('circle3.png', require('../assets/particles/circle3.png')).add('circle4.png', require('../assets/particles/circle4.png')).add('cloud_1.png', require('../assets/particles/cloud_1.png')).add('firework.png', require('../assets/particles/firework.png')).add('rect.png', require('../assets/particles/rect.png')).add('glass-1.png', require('../assets/particles/glass-1.png')).add('glass-2.png', require('../assets/particles/glass-2.png')).add('glass-3.png', require('../assets/particles/glass-3.png')).add('glass-4.png', require('../assets/particles/glass-4.png')).add('glass-5.png', require('../assets/particles/glass-5.png')).add('glass-6.png', require('../assets/particles/glass-6.png')).add('neutron-full.png', require('../assets/particles/neutron-full.png')).add('neutron.png', require('../assets/particles/neutron.png')).add('dash.png', require('../assets/particles/dash.png')).add('pentagram.png', require('../assets/particles/pentagram.png')).add('pentagram-glow.png', require('../assets/particles/pentagram-glow.png')).add('rain-cinematic.png', require('../assets/particles/rain-cinematic.png')).add('rain-blurred.png', require('../assets/particles/rain-blurred.png')).add('snow-flake.png', require('../assets/particles/snow-flake.png')).add('star-real.png', require('../assets/particles/star-real.png')).add('star_1.png', require('../assets/particles/star_1.png')).add('spark-colored.png', require('../assets/particles/spark-colored.png')).add('confetti1.png', require('../assets/particles/confetti1.png')).add('confetti2.png', require('../assets/particles/confetti2.png')).add('confetti3.png', require('../assets/particles/confetti3.png')).add('confetti4.png', require('../assets/particles/confetti4.png')).add('confetti5.png', require('../assets/particles/confetti5.png')).add('confetti6.png', require('../assets/particles/confetti6.png')).load(function () {
        resolve();
      });
    });
  };

  Game._effects = [burnout_1.Burnout, dust_1.Dust, dust_left_1.DustLeft, dust_right_1.DustRight, explosion_enemy_1.ExplosionEnemy, explosion_small_1.ExplosionSmall, explosion_1.Explosion, fireball_blue_1.FireballBlue, fireball_1.Fireball, fireworks_tracer_with_dazzler_1.FireworksTracerWithDazzler, fireworks_tracer_1.FireworksTracer, fireworks_1.Fireworks, flame_pixel_1.FlamePixel, flame_1.Flame, glass_1.Glass, hallucinogen_full_1.HallucinogenFull, hallucinogen_1.Hallucinogen, laser_1.Laser, muzzle_flash_with_smoke_1.MuzzleFlashWithSmoke, muzzle_flash_1.MuzzleFlash, pentagram_glitchy_1.PentagramGlitchy, pentagram_1.Pentagram, rain_cinematic_1.RainCinematic, rain_1.Rain, smoke_trail_1.SmokeTrail, smoke_train_1.SmokeTrain, smoke_1.Smoke, snow_flakes_1.SnowFlakes, sparks_1.Sparks, splash_pixel_1.SplashPixel, splash_1.Splash, star_1.Star, starlight_1.Starlight, stink_1.Stink, thrust_1.Thrust, thruster_pixel_1.ThrusterPixel, thruster_1.Thruster, trail_fart_1.TrailFart, trail_pixel_1.TrailPixel, trail_1.Trail, confetti_1.Confetti];
  return Game;
}(PIXI.Application);

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    var game = new Game();
    game.init();
  }
};
},{"../../../bin/pixi-particles":"TTUu","./effects/burnout":"OaIm","./effects/confetti":"V8IA","./effects/dust":"OUFj","./effects/dust-left":"ko7t","./effects/dust-right":"JSgh","./effects/explosion":"E0bi","./effects/explosion-enemy":"Lm7E","./effects/explosion-small":"Jg5U","./effects/fireball":"Ok7n","./effects/fireball-blue":"iY9E","./effects/fireworks":"jArv","./effects/fireworks-tracer":"URHl","./effects/fireworks-tracer-with-dazzler":"iOuL","./effects/flame":"VBic","./effects/flame-pixel":"lTqa","./effects/glass":"NUt3","./effects/hallucinogen":"BjDA","./effects/hallucinogen-full":"nBHU","./effects/laser":"QTQ1","./effects/muzzle-flash":"pNHk","./effects/muzzle-flash-with-smoke":"HF9b","./effects/pentagram":"AqCd","./effects/pentagram-glitchy":"SRow","./effects/rain":"nFt8","./effects/rain-cinematic":"HmBr","./effects/smoke":"f0QK","./effects/smoke-trail":"EgWF","./effects/smoke-train":"mVV0","./effects/snow-flakes":"BfbF","./effects/sparks":"c5bp","./effects/splash":"Y6MS","./effects/splash-pixel":"VPDe","./effects/star":"e6NX","./effects/starlight":"B6oR","./effects/stink":"k9RK","./effects/thrust":"HWYs","./effects/thruster":"DB3D","./effects/thruster-pixel":"DFCl","./effects/trail":"beIB","./effects/trail-fart":"fxBz","./effects/trail-pixel":"mpve","../assets/particles/default.png":"M2TG","../assets/particles/explosion-1.png":"Vc3g","../assets/particles/explosion-2.png":"tJ14","../assets/particles/explosion-3.png":"Ylob","../assets/particles/thrust-1.png":"LPIv","../assets/particles/thrust-2.png":"Jyfz","../assets/particles/thrust-3.png":"mdPH","../assets/particles/circle.png":"JIeZ","../assets/particles/circle1.png":"Aefm","../assets/particles/circle2.png":"Ij1B","../assets/particles/circle3.png":"indE","../assets/particles/circle4.png":"c1hk","../assets/particles/cloud_1.png":"T4zc","../assets/particles/firework.png":"VLIg","../assets/particles/rect.png":"BFss","../assets/particles/glass-1.png":"ACCR","../assets/particles/glass-2.png":"aqVV","../assets/particles/glass-3.png":"MUTY","../assets/particles/glass-4.png":"B0pJ","../assets/particles/glass-5.png":"y5vm","../assets/particles/glass-6.png":"bsT7","../assets/particles/neutron-full.png":"JlXc","../assets/particles/neutron.png":"oyEA","../assets/particles/dash.png":"F7rL","../assets/particles/pentagram.png":"gyv8","../assets/particles/pentagram-glow.png":"GK2o","../assets/particles/rain-cinematic.png":"BQ1h","../assets/particles/rain-blurred.png":"bvCN","../assets/particles/snow-flake.png":"d77d","../assets/particles/star-real.png":"je1y","../assets/particles/star_1.png":"NHi9","../assets/particles/spark-colored.png":"KRYV","../assets/particles/confetti1.png":"Ip6K","../assets/particles/confetti2.png":"gv8e","../assets/particles/confetti3.png":"UYUm","../assets/particles/confetti4.png":"n50s","../assets/particles/confetti5.png":"b0ec","../assets/particles/confetti6.png":"YB24"}]},{},["LQOA"], null)
//# sourceMappingURL=ts.02d65a8d.js.map