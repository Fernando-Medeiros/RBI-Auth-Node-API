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

export interface CustomerInterface {
  props: PropsCreate;
  get getEmail(): string;
  get getPassword(): string;
  set setPassword(v: string);
  get getDataToCreate(): PropsCreate;
}
