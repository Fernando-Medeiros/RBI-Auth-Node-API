import type {
  PropsCreate,
  CustomerInterface,
} from "../interfaces/customer.interface";

export class Customer implements CustomerInterface {
  readonly props: PropsCreate;

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
  constructor(dataToCreate: PropsCreate) {
    this.props = dataToCreate;
  }
}
