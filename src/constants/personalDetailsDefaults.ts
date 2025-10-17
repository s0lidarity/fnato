import { DetailedDescription } from "../types/characterTypes"

// AJS use faker to generate some defaults
export const DEFAULT_DETAILED_DESCRIPTION: DetailedDescription = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    dateOfBirth: new Date(),
    sex: "",
    employer: "",
    nationality: "",
    appearance: "",
    residence: "",
    education: "",
    personality: "",
    beliefs: "",
    hobbies: "",
    obsessions: "",
    motivations: "",
    admire: "",
    dislike: "",
    trustInDeltaGreen: "",
    deltaGreenAgreement: "",
    damagedVeteranTemplates: [],
    personalMotivations: [],
}