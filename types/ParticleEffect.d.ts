import { Container, Texture } from 'pixi.js';
import { ParticleEffectConfig } from './ParticleEffectConfig';
import { ParticleEmitter } from './ParticleEmitter';
import { ParticleEmitterConfig } from './ParticleEmitterConfig';
export declare class ParticleEffect extends Container {
    private readonly _emitters;
    constructor(config: ParticleEffectConfig, textureFactory: typeof Texture.from);
    start(): void;
    /** Resets the effect so it can be started again like a new effect. */
    reset(): void;
    update(delta: number): void;
    allowCompletion(): void;
    isComplete(): boolean;
    setDuration(duration: number): void;
    getEmitters(): ParticleEmitter[];
    /** Returns the emitter with the specified name, or null. */
    findEmitter(name: string): ParticleEmitter;
    /** Allocates all emitters particles. */
    preAllocateParticles(): void;
    /** Disposes the texture for each sprite for each ParticleEmitter. */
    destroy(options?: {
        children?: boolean;
        texture?: boolean;
        baseTexture?: boolean;
    }): void;
    protected newEmitter(name: string, emitterConfig: ParticleEmitterConfig, textureFactory: typeof Texture.from): ParticleEmitter;
}
