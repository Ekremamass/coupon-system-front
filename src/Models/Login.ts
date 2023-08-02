export enum ClientType{
    ADMINISTRATOR = "ADMINISTRATOR",
    COMPANY = "COMPANY",
    CUSTOMER = "CUSTOMER",
    LOGGED_OUT = "LOGGED_OUT",
}

export interface LoginReqModel{
    email : string;
    password : string;
    clientType : ClientType;
}

export interface LoginResModel{
    email : string;
    token : string;
    clientType : ClientType;
}
