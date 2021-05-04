import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/muzzle-flash-with-smoke.json';

export class MuzzleFlashWithSmoke extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 600;
    }
}
