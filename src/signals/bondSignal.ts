import { signal } from '@preact/signals';
import { DEFAULT_BONDS } from '../constants/gameRules';

export const bondCountSignal = signal(DEFAULT_BONDS);