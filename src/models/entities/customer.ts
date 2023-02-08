interface CustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class Customer {
  private props: CustomerProps;

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  constructor(props: CustomerProps) {
    this.props = props;
  }
}
