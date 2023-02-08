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
