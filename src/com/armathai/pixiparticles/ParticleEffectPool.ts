namespace pixiparticles.core {
    /** Objects implementing this interface will have {@link #reset()} called when passed to {@link Pool#free(Object)}. */
    interface Poolable {
        /** Resets the object for reuse. Object references should be nulled and fields may be set to default values. */
        reset(): void;
    }

    /** A pool of objects that can be reused to avoid allocation.
     * @see Pools
     * @author Nathan Sweet */
    abstract class Pool<T extends Poolable> {
        /** The maximum number of objects that will be pooled. */
        public readonly max: number;
        /** The highest number of free objects. Can be reset any time. */
        public peak: number;

        private readonly _freeObjects: T[];

        /** Creates a pool with an initial capacity of 16 and no maximum. */
        public constructor(initialCapacity = 16, max = Number.MAX_SAFE_INTEGER, preFill = false) {
            if (initialCapacity > max && preFill)
                throw new Error('max must be larger than initialCapacity if preFill is set to true.');
            this._freeObjects = [];
            this.max = max;
            if (preFill) {
                for (let i = 0; i < initialCapacity; i++) {
                    this._freeObjects.push(this.newObject());
                }
                this.peak = this._freeObjects.length;
            }
        }

        /** Returns an object from this pool. The object may be new (from {@link #newObject()}) or reused (previously
         * {@link #free(Object) freed}). */
        public obtain(): T {
            return this._freeObjects.length == 0 ? this.newObject() : this._freeObjects.pop();
        }

        /** Puts the specified object in the pool, making it eligible to be returned by {@link #obtain()}. If the pool already contains
         * {@link #max} free objects, the specified object is reset but not added to the pool.
         * <p>
         * The pool does not check if an object is already freed, so the same object must not be freed multiple times. */
        public free(object: T): void {
            if (object == null) throw new Error('object cannot be null.');
            if (this._freeObjects.length < this.max) {
                this._freeObjects.push(object);
                this.peak = Math.max(this.peak, this._freeObjects.length);
            }
            this.reset(object);
        }

        /** Adds the specified number of new free objects to the pool. Usually called early on as a pre-allocation mechanism but can be
         * used at any time.
         *
         * @param size the number of objects to be added */
        public fill(size: number): void {
            for (let i = 0; i < size; i++)
                if (this._freeObjects.length < this.max) this._freeObjects.push(this.newObject());
            this.peak = Math.max(this.peak, this._freeObjects.length);
        }

        /** Puts the specified objects in the pool. Null objects within the array are silently ignored.
         * <p>
         * The pool does not check if an object is already freed, so the same object must not be freed multiple times.
         * @see #free(Object) */
        public freeAll(objects: T[]): void {
            if (objects == null) throw new Error('objects cannot be null.');
            const freeObjects = this._freeObjects;
            const max = this.max;
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (object == null) continue;
                if (freeObjects.length < max) freeObjects.push(object);
                this.reset(object);
            }
            this.peak = Math.max(this.peak, freeObjects.length);
        }

        /** Removes all free objects from this pool. */
        public clear(): void {
            this._freeObjects.length = 0;
        }

        /** The number of objects available to be obtained. */
        public getFree(): number {
            return this._freeObjects.length;
        }

        /** Called when an object is freed to clear the state of the object for possible later reuse. The default implementation calls
         * {@link Poolable#reset()} if the object is {@link Poolable}. */
        protected reset(object: T): void {
            object.reset();
        }

        protected abstract newObject(): T;
    }

    class PooledEffect extends ParticleEffect {
        private _pool: ParticleEffectPool;
        public constructor(pool: ParticleEffectPool, effect?: ParticleEffect) {
            super(effect);
            this._pool = pool;
        }

        public free(): void {
            this._pool.free(this);
        }
    }

    export class ParticleEffectPool extends Pool<PooledEffect> {
        private readonly _effect: ParticleEffect;

        public constructor(effect: ParticleEffect, initialCapacity: number, max: number) {
            super(initialCapacity, max);
            this._effect = effect;
        }

        public free(effect: PooledEffect): void {
            super.free(effect);

            effect.reset(); // copy parameters exactly to avoid introducing error
        }

        protected newObject(): PooledEffect {
            const pooledEffect = new PooledEffect(this, this._effect);
            pooledEffect.start();
            return pooledEffect;
        }
    }
}
