/// <reference types="pixi.js" />

namespace pixiparticles.core {
    export type ParticleEmitterConfig = {
        delay: values.RangedNumericValueType;
        duration: values.RangedNumericValueType;
        count: { min: number; max: number };
        emission: values.ScaledNumericValueType;
        life: values.IndependentScaledNumericValueType & {
            offset: values.IndependentScaledNumericValueType;
        };
        offset: {
            x: values.ScaledNumericValueType;
            y: values.ScaledNumericValueType;
        };
        spawn: values.SpawnShapeValueType & {
            width: values.ScaledNumericValueType;
            height: values.ScaledNumericValueType;
        };
        scale: {
            x: values.ScaledNumericValueType;
            y: values.ScaledNumericValueType;
        };
        velocity: values.ScaledNumericValueType;
        angle: values.ScaledNumericValueType;
        rotation: values.ScaledNumericValueType;
        wind: values.ScaledNumericValueType;
        gravity: values.ScaledNumericValueType;
        tint: values.GradientColorValueType;
        transparency: values.ScaledNumericValueType;
        options: {
            attached: boolean;
            continuous: boolean;
            aligned: boolean;
            additive: boolean;
            behind: boolean;
            premultipliedAlpha: boolean;
            spriteMode: constants.SpriteMode;
        };
        textures: string[];
    };
}
