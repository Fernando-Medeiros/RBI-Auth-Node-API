export const customerSchema = {
  firstName: {
    type: String,
    required: true,
    minlength: 4,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    minlength: 9,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    required: true,
  },
};

export class CustomerCreateSchema {
  constructor({ firstName, lastName, email, password }) {
    this.props = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      createdAt: new Date(),
    };
  }
  getValidData() {
    return this.props;
  }
}

export class CustomerUpdateSchema {
  constructor({ firstName, lastName, email }) {
    this.props = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
  }
  getValidData() {
    return this.props;
  }
}
