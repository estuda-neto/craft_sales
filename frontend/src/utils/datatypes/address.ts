export enum BrazilStates {
    AC = "AC",
    AL = "AL",
    AP = "AP",
    AM = "AM",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MT = "MT",
    MS = "MS",
    MG = "MG",
    PA = "PA",
    PB = "PB",
    PR = "PR",
    PE = "PE",
    PI = "PI",
    RJ = "RJ",
    RN = "RN",
    RS = "RS",
    RO = "RO",
    RR = "RR",
    SC = "SC",
    SP = "SP",
    SE = "SE",
    TO = "TO",
}

export interface AddressIn {
    country: string;
    CEP: string;
    state: BrazilStates;
    city: string;
    neighborhood: string;
    streetAndHouseNumber: string;
}
export interface AddressOut {
    addressId: string;
    country: string;
    CEP: string;
    state: BrazilStates;
    city: string;
    neighborhood: string;
    streetAndHouseNumber: string;
    createdAt: string;   // ISO date string
    updatedAt: string;
}

export interface Address {
    addressId: string,
    country: string,
    CEP: string,
    state: BrazilStates,
    city: string,
    neighborhood: string,
    streetAndHouseNumber: string,
    createdAt: Date,
    updatedAt: Date,
}