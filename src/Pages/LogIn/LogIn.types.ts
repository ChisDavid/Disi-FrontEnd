export interface ILoginData {
    email: string;
    password: string;
};

export interface IRegisterData extends ILoginData {
    name: string,
    age: number,
    isAdmin: boolean
};

export interface IForgotPassword extends ILoginData {
    validationCode: number
};