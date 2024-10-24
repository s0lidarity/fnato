export enum StatsConfigOptions {
    ManualInput = 'ManualInput',
    PointBuy = 'PointBuy',
    Dice = 'Dice',
};

export enum ProfessionConfigOptions {
    StandardProfessions = 'StandardProfessions',
    CustomProfessions = 'CustomProfessions',
};

export type ConfigOptions = StatsConfigOptions | ProfessionConfigOptions;