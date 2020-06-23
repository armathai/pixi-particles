namespace pixiparticles.core {
    export class ParticleEffect extends PIXI.Container {
        private readonly _emitters: ParticleEmitter[];
        private _ownsTexture: boolean;

        public constructor(config: any) {
            super();
            this._emitters = [];
            Object.keys(config).forEach(e => {
                const emitter = this.newEmitter(e, config[e]);
                this._emitters.push(emitter);
            });
        }

        public start(): void {
            for (let i = 0, n = this._emitters.length; i < n; i++) this._emitters[i].start();
        }

        /** Resets the effect so it can be started again like a new effect.
         * @param resetScaling Whether to restore the original size and motion parameters if they were scaled. Repeated scaling and
         *           resetting may introduce error. */
        public reset(): void {
            for (let i = 0, n = this._emitters.length; i < n; i++) this._emitters[i].reset();
        }

        public update(delta: number): void {
            for (let i = 0, n = this._emitters.length; i < n; i++) this._emitters[i].update(delta);
        }

        public allowCompletion(): void {
            for (let i = 0, n = this._emitters.length; i < n; i++) this._emitters[i].allowCompletion();
        }

        public isComplete(): boolean {
            for (let i = 0, n = this._emitters.length; i < n; i++) {
                const emitter = this._emitters[i];
                if (!emitter.isComplete()) return false;
            }
            return true;
        }

        public setDuration(duration: number): void {
            for (let i = 0, n = this._emitters.length; i < n; i++) {
                const emitter = this._emitters[i];
                emitter.continuous = false;
                emitter.duration = duration;
                emitter.durationTimer = 0;
            }
        }

        public getEmitters(): ParticleEmitter[] {
            return this._emitters;
        }

        /** Returns the emitter with the specified name, or null. */
        public findEmitter(name: string): ParticleEmitter {
            for (let i = 0, n = this._emitters.length; i < n; i++) {
                const emitter = this._emitters[i];
                if (emitter.name === name) return emitter;
            }
            return null;
        }

        /** Allocates all emitters particles. See {@link com.badlogic.gdx.graphics.g2d.ParticleEmitter#preAllocateParticles()} */
        public preAllocateParticles(): void {
            this._emitters.forEach(e => e.preAllocateParticles());
        }

        /** Disposes the texture for each sprite for each ParticleEmitter. */
        public destroy(): void {
            if (!this._ownsTexture) return;
            for (let i = 0, n = this._emitters.length; i < n; i++) {
                const emitter = this._emitters[i];
                emitter.sprites.forEach(s => s.destroy());
            }
            super.destroy();
        }

        protected newEmitter(name: string, emitterConfig: any): ParticleEmitter {
            return new ParticleEmitter(this, name, emitterConfig);
        }
    }
}
