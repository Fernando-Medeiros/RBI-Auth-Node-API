import type { PropsCreate, ICustomer } from "../interfaces/customer.interface";

export class Customer implements ICustomer {
  private props: PropsCreate;

  get getEmail(): string {
    return this.props.email;
  }
  get getPassword(): string {
    return this.props.password;
  }
  set setPassword(password: string) {
    this.props.password = password;
  }
  get getDataToCreate(): PropsCreate {
    return this.props;
  }
  constructor(data: PropsCreate) {
    this.props = data;
  }
}
