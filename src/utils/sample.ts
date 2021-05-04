import { between } from './between';

export const sample = <T>(array: T[]): T => {
    return array[between(0, array.length - 1)];
};
