import { ParticleEffectConfig } from './ParticleEffectConfig';
import { ParticleEmitter } from './ParticleEmitter';
import { ParticleEmitterConfig } from './ParticleEmitterConfig';

export class ParticleEffect extends PIXI.Container {
    private readonly _emitters: ParticleEmitter[];

    public constructor(config: ParticleEffectConfig) {
        super();
        this._emitters = [];
        Object.keys(config).forEach((e) => {
            const emitter = this.newEmitter(e, config[e]);
            this._emitters.push(emitter);
        });
    }

    public start(): void {
        this._emitters.forEach((e) => e.start());
    }

    /** Resets the effect so it can be started again like a new effect. */
    public reset(): void {
        this._emitters.forEach((e) => e.reset());
    }

    public update(delta: number): void {
        this._emitters.forEach((e) => e.update(delta));
    }

    public allowCompletion(): void {
        this._emitters.forEach((e) => e.allowCompletion());
    }

    public isComplete(): boolean {
        return !this._emitters.find((e) => !e.isComplete());
    }

    public setDuration(duration: number): void {
        this._emitters.forEach((e) => {
            e.continuous = false;
            e.duration = duration;
            e.durationTimer = 0;
        });
    }

    public getEmitters(): ParticleEmitter[] {
        return this._emitters;
    }

    /** Returns the emitter with the specified name, or null. */
    public findEmitter(name: string): ParticleEmitter {
        return this._emitters.find((e) => e.name === name);
    }

    /** Allocates all emitters particles. */
    public preAllocateParticles(): void {
        this._emitters.forEach((e) => e.preAllocateParticles());
    }

    /** Disposes the texture for each sprite for each ParticleEmitter. */
    public destroy(
        options: { children?: boolean; texture?: boolean; baseTexture?: boolean } = { children: true },
    ): void {
        super.destroy(options);
    }

    protected newEmitter(name: string, emitterConfig: ParticleEmitterConfig): ParticleEmitter {
        return new ParticleEmitter(this, name, emitterConfig);
    }
}
