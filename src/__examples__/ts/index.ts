/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from '@pixi/app';
import { ParticleEffect } from '../../ParticleEffect';
import { Burnout } from './effects/burnout';
import { Confetti } from './effects/confetti';
import { Dust } from './effects/dust';
import { DustLeft } from './effects/dust-left';
import { DustRight } from './effects/dust-right';
import { Explosion } from './effects/explosion';
import { ExplosionEnemy } from './effects/explosion-enemy';
import { ExplosionSmall } from './effects/explosion-small';
import { Fireball } from './effects/fireball';
import { FireballBlue } from './effects/fireball-blue';
import { Fireworks } from './effects/fireworks';
import { FireworksTracer } from './effects/fireworks-tracer';
import { FireworksTracerWithDazzler } from './effects/fireworks-tracer-with-dazzler';
import { Flame } from './effects/flame';
import { FlamePixel } from './effects/flame-pixel';
import { Glass } from './effects/glass';
import { Hallucinogen } from './effects/hallucinogen';
import { HallucinogenFull } from './effects/hallucinogen-full';
import { Laser } from './effects/laser';
import { MuzzleFlash } from './effects/muzzle-flash';
import { MuzzleFlashWithSmoke } from './effects/muzzle-flash-with-smoke';
import { Pentagram } from './effects/pentagram';
import { PentagramGlitchy } from './effects/pentagram-glitchy';
import { Rain } from './effects/rain';
import { RainCinematic } from './effects/rain-cinematic';
import { Smoke } from './effects/smoke';
import { SmokeTrail } from './effects/smoke-trail';
import { SmokeTrain } from './effects/smoke-train';
import { SnowFlakes } from './effects/snow-flakes';
import { Sparks } from './effects/sparks';
import { Splash } from './effects/splash';
import { SplashPixel } from './effects/splash-pixel';
import { Star } from './effects/star';
import { Starlight } from './effects/starlight';
import { Stink } from './effects/stink';
import { Thrust } from './effects/thrust';
import { Thruster } from './effects/thruster';
import { ThrusterPixel } from './effects/thruster-pixel';
import { Trail } from './effects/trail';
import { TrailFart } from './effects/trail-fart';
import { TrailPixel } from './effects/trail-pixel';

class Game extends Application {
    private static readonly _effects = [
        Burnout,
        Dust,
        DustLeft,
        DustRight,
        ExplosionEnemy,
        ExplosionSmall,
        Explosion,
        FireballBlue,
        Fireball,
        FireworksTracerWithDazzler,
        FireworksTracer,
        Fireworks,
        FlamePixel,
        Flame,
        Glass,
        HallucinogenFull,
        Hallucinogen,
        Laser,
        MuzzleFlashWithSmoke,
        MuzzleFlash,
        PentagramGlitchy,
        Pentagram,
        RainCinematic,
        Rain,
        SmokeTrail,
        SmokeTrain,
        Smoke,
        SnowFlakes,
        Sparks,
        SplashPixel,
        Splash,
        Star,
        Starlight,
        Stink,
        Thrust,
        ThrusterPixel,
        Thruster,
        TrailFart,
        TrailPixel,
        Trail,
        Confetti,
    ];

    private _effect: ParticleEffect & { duration: number };
    private _effectInterval: NodeJS.Timer;

    public constructor() {
        super({ resizeTo: window, backgroundColor: 0x000000 });
        document.getElementById('gameContainer').appendChild(this.view);
    }

    public async init(): Promise<void> {
        await this._load();
        this._addButtons();
        this._initEffect(13);
        this.ticker.add(() => {
            this._effect.update(this.ticker.deltaMS);
        });
    }

    private _addButtons(): void {
        const buttonsContainer = document.getElementById('buttonsContainer');
        Game._effects.forEach((e, index) => {
            const button = document.createElement('button');
            button.onclick = () => {
                this._initEffect(index);
            };
            button.innerHTML = e.name;
            buttonsContainer.appendChild(button);
        });
    }

    private _initEffect(index: number): void {
        this._effect && this._effect.destroy();
        this._effectInterval && clearInterval(this._effectInterval);
        this._effect = new Game._effects[index]();
        this._effect.start();
        this._effect.x = this.renderer.width / 2;
        this._effect.y = this.renderer.height / 2;
        this.stage.addChild(this._effect);
        this._effectInterval = setInterval(() => {
            this._effect.reset();
            this._effect.start();
        }, this._effect.duration);
    }

    private _load(): Promise<void> {
        return new Promise((resolve) => {
            this.loader
                .add('default.png', require('../assets/particles/default.png'))
                .add('explosion-1.png', require('../assets/particles/explosion-1.png'))
                .add('explosion-2.png', require('../assets/particles/explosion-2.png'))
                .add('explosion-3.png', require('../assets/particles/explosion-3.png'))
                .add('thrust-1.png', require('../assets/particles/thrust-1.png'))
                .add('thrust-2.png', require('../assets/particles/thrust-2.png'))
                .add('thrust-3.png', require('../assets/particles/thrust-3.png'))
                .add('circle.png', require('../assets/particles/circle.png'))
                .add('circle1.png', require('../assets/particles/circle1.png'))
                .add('circle2.png', require('../assets/particles/circle2.png'))
                .add('circle3.png', require('../assets/particles/circle3.png'))
                .add('circle4.png', require('../assets/particles/circle4.png'))
                .add('cloud_1.png', require('../assets/particles/cloud_1.png'))
                .add('firework.png', require('../assets/particles/firework.png'))
                .add('rect.png', require('../assets/particles/rect.png'))
                .add('glass-1.png', require('../assets/particles/glass-1.png'))
                .add('glass-2.png', require('../assets/particles/glass-2.png'))
                .add('glass-3.png', require('../assets/particles/glass-3.png'))
                .add('glass-4.png', require('../assets/particles/glass-4.png'))
                .add('glass-5.png', require('../assets/particles/glass-5.png'))
                .add('glass-6.png', require('../assets/particles/glass-6.png'))
                .add('neutron-full.png', require('../assets/particles/neutron-full.png'))
                .add('neutron.png', require('../assets/particles/neutron.png'))
                .add('dash.png', require('../assets/particles/dash.png'))
                .add('pentagram.png', require('../assets/particles/pentagram.png'))
                .add('pentagram-glow.png', require('../assets/particles/pentagram-glow.png'))
                .add('rain-cinematic.png', require('../assets/particles/rain-cinematic.png'))
                .add('rain-blurred.png', require('../assets/particles/rain-blurred.png'))
                .add('snow-flake.png', require('../assets/particles/snow-flake.png'))
                .add('star-real.png', require('../assets/particles/star-real.png'))
                .add('star_1.png', require('../assets/particles/star_1.png'))
                .add('spark-colored.png', require('../assets/particles/spark-colored.png'))
                .add('confetti1.png', require('../assets/particles/confetti1.png'))
                .add('confetti2.png', require('../assets/particles/confetti2.png'))
                .add('confetti3.png', require('../assets/particles/confetti3.png'))
                .add('confetti4.png', require('../assets/particles/confetti4.png'))
                .add('confetti5.png', require('../assets/particles/confetti5.png'))
                .add('confetti6.png', require('../assets/particles/confetti6.png'))
                .load(() => {
                    resolve();
                });
        });
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const game = new Game();
        game.init();
    }
};
