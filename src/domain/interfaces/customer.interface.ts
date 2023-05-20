export type PropsCreate = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type PropsUpdate = {
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type Customer = {
    pubId?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
};

export interface ICustomer {
    get getEmail(): string;
    get getPassword(): string;
    set setPassword(v: string);
    get getDataToCreate(): PropsCreate;
}
