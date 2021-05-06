import { SpriteMode } from './constants/SpriteMode';
import { GradientColorValueType } from './values/GradientColorValue';
import { IndependentScaledNumericValueType } from './values/IndependentScaledNumericValue';
import { RangedNumericValueType } from './values/RangedNumericValue';
import { ScaledNumericValueType } from './values/ScaledNumericValue';
import { SpawnShapeValueType } from './values/SpawnShapeValue';
export declare type ParticleEmitterConfig = {
    delay: RangedNumericValueType;
    duration: RangedNumericValueType;
    count: {
        min: number;
        max: number;
    };
    emission: ScaledNumericValueType;
    life: IndependentScaledNumericValueType & {
        offset: IndependentScaledNumericValueType;
    };
    offset: {
        x: ScaledNumericValueType;
        y: ScaledNumericValueType;
    };
    spawn: SpawnShapeValueType & {
        width: ScaledNumericValueType;
        height: ScaledNumericValueType;
    };
    scale: {
        x: ScaledNumericValueType;
        y: ScaledNumericValueType;
    };
    velocity: ScaledNumericValueType;
    angle: ScaledNumericValueType;
    rotation: ScaledNumericValueType;
    wind: ScaledNumericValueType;
    gravity: ScaledNumericValueType;
    tint: GradientColorValueType;
    transparency: ScaledNumericValueType;
    options: {
        attached: boolean;
        continuous: boolean;
        aligned: boolean;
        additive: boolean;
        behind: boolean;
        premultipliedAlpha: boolean;
        spriteMode: SpriteMode;
    };
    textures: string[];
};
