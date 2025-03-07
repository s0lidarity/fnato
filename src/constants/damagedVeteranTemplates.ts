import { msg } from '@lingui/core/macro';
import { DamagedVeteranAdjustment } from '../types/characterTypes';

// Extreme Violence
export const EXTREME_VIOLENCE: DamagedVeteranAdjustment = {
    id: "extreme-violence",
    label: "Extreme Violence",
    labelMsg: msg({
        message: "Extreme Violence",
    }),
    description: "Add +10% to your Agent's Occult skill. Reduce SAN by 5. Subtract 3 from your Agent's CHA and each Bond. Your Agent is adapted to violence (see page 73).",
    descriptionMsg: msg({
        message: "Add +10% to your Agent's Occult skill. Reduce SAN by 5. Subtract 3 from your Agent's CHA and each Bond. Your Agent is adapted to violence (see page 73).",
    }),
    statAdjustment: {
        charisma: -3,
        power: -1, // This will reduce SAN by 5 (power * 5)
    },
    skillAdjustment: {
        "Occult": 10,
    },
};

// Acute Senses
export const ACUTE_SENSES: DamagedVeteranAdjustment = {
    id: "acute-senses",
    label: "Acute Senses",
    labelMsg: msg({
        message: "Acute Senses",
    }),
    description: "Add +20% to your Agent's Alertness skill. Reduce SAN by 10.",
    descriptionMsg: msg({
        message: "Add +20% to your Agent's Alertness skill. Reduce SAN by 10.",
    }),
    statAdjustment: {
        power: -2, // This will reduce SAN by 10 (power * 5)
    },
    skillAdjustment: {
        "Alertness": 20,
    },
};

// Conspiracy Theorist
export const CONSPIRACY_THEORIST: DamagedVeteranAdjustment = {
    id: "conspiracy-theorist",
    label: "Conspiracy Theorist",
    labelMsg: msg({
        message: "Conspiracy Theorist",
    }),
    description: "Add +20% to your Agent's Occult skill. Reduce SAN by 10.",
    descriptionMsg: msg({
        message: "Add +20% to your Agent's Occult skill. Reduce SAN by 10.",
    }),
    statAdjustment: {
        power: -2, // This will reduce SAN by 10 (power * 5)
    },
    skillAdjustment: {
        "Occult": 20,
    },
};

// Hardened
export const HARDENED: DamagedVeteranAdjustment = {
    id: "hardened",
    label: "Hardened",
    labelMsg: msg({
        message: "Hardened",
    }),
    description: "Add +10% to your Agent's Alertness skill. Reduce SAN by 5.",
    descriptionMsg: msg({
        message: "Add +10% to your Agent's Alertness skill. Reduce SAN by 5.",
    }),
    statAdjustment: {
        power: -1, // This will reduce SAN by 5 (power * 5)
    },
    skillAdjustment: {
        "Alertness": 10,
    },
};

// Mentally Scarred
export const MENTALLY_SCARRED: DamagedVeteranAdjustment = {
    id: "mentally-scarred",
    label: "Mentally Scarred",
    labelMsg: msg({
        message: "Mentally Scarred",
    }),
    description: "Add +20% to your Agent's Unnatural skill. Reduce SAN by 10.",
    descriptionMsg: msg({
        message: "Add +20% to your Agent's Unnatural skill. Reduce SAN by 10.",
    }),
    statAdjustment: {
        power: -2, // This will reduce SAN by 10 (power * 5)
    },
    skillAdjustment: {
        "Unnatural": 20,
    },
};

// Physically Scarred
export const PHYSICALLY_SCARRED: DamagedVeteranAdjustment = {
    id: "physically-scarred",
    label: "Physically Scarred",
    labelMsg: msg({
        message: "Physically Scarred",
    }),
    description: "Add +10% to your Agent's Persuade skill. Reduce CHA by 2.",
    descriptionMsg: msg({
        message: "Add +10% to your Agent's Persuade skill. Reduce CHA by 2.",
    }),
    statAdjustment: {
        charisma: -2,
    },
    skillAdjustment: {
        "Persuade": 10,
    },
};

// All available damaged veteran templates
export const DAMAGED_VETERAN_TEMPLATES: DamagedVeteranAdjustment[] = [
    ACUTE_SENSES,
    CONSPIRACY_THEORIST,
    EXTREME_VIOLENCE,
    HARDENED,
    MENTALLY_SCARRED,
    PHYSICALLY_SCARRED,
]; 