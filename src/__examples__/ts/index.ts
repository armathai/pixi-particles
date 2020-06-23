/* eslint-disable @typescript-eslint/ban-ts-ignore */
/// <reference types="../../../bin/pixi-particles.min.js" />
// @ts-ignore
import '../../../bin/pixi-particles.min';
// import { Default } from './effects/default';
// import { Burnout } from './effects/burnout';
// import { Dust } from './effects/dust';
// import { DustLeft } from './effects/dust-left';
// import { DustRight } from './effects/dust-right';
// import { ExplosionEnemy } from './effects/explosion-enemy';
// import { ExplosionSmall } from './effects/explosion-small';
// import { Explosion } from './effects/explosion';
// import { FireballBlue } from './effects/fireball-blue';
// import { Fireball } from './effects/fireball';
// import { FireworksTracerWithDazzler } from './effects/fireworks-tracer-with-dazzler';
// import { FireworksTracer } from './effects/fireworks-tracer';
// import { Fireworks } from './effects/fireworks';
// import { FlamePixel } from './effects/flame-pixel';
// import { Flame } from './effects/flame';
// import { Glass } from './effects/glass';
// import { HallucinogenFull } from './effects/hallucinogen-full';
// import { Hallucinogen } from './effects/hallucinogen';
// import { Laser } from './effects/laser';
// import { MuzzleFlashWithSmoke } from './effects/muzzle-flash-with-smoke';
// import { MuzzleFlash } from './effects/muzzle-flash';
// import { PentagramGlitchy } from './effects/pentagram-glitchy';
// import { Pentagram } from './effects/pentagram';
// import { RainCinematic } from './effects/rain-cinematic';
// import { Rain } from './effects/rain';
// import { SmokeTrail } from './effects/smoke-trail';
// import { SmokeTrain } from './effects/smoke-train';
// import { Smoke } from './effects/smoke';
// import { SnowFlakes } from './effects/snow-flakes';
// import { Sparks } from './effects/sparks';
// import { SplashPixel } from './effects/splash-pixel';
// import { Splash } from './effects/splash';
// import { StarTrail } from './effects/star-trail';
// import { Star } from './effects/star';
// import { Starlight } from './effects/starlight';
// import { Stink } from './effects/stink';
// import { Thrust } from './effects/thrust';
// import { ThrusterPixel } from './effects/thruster-pixel';
// import { Thruster } from './effects/thruster';
// import { TrailFart } from './effects/trail-fart';
// import { TrailPixel } from './effects/trail-pixel';
// import { Trail } from './effects/trail';
import { Confetti } from './effects/confetti';

class Game extends PIXI.Application {
    static readonly EFFECT = Confetti;
    private _effect: PIXI.particles.core.ParticleEffect;
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0x000000 });
        document.getElementById('gameContainer')?.appendChild(this.view);
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
                const effect = new Game.EFFECT();
                effect.start();
                this.ticker.add(delta => {
                    effect.update(this.ticker.deltaMS);
                });
                // setInterval(() => {
                //     effect.update(10);
                // }, 10);
                effect.x = this.renderer.width / 2;
                effect.y = this.renderer.height / 2;
                this.stage.addChild(effect);
                this._effect = effect;
                setInterval(() => {
                    this._effect.reset();
                    this._effect.start();
                    // @ts-ignore
                }, this._effect.duration);
            });
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        new Game();
    }
};
