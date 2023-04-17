import { Customer } from "@dom/entities/customer";
import { dataToNewCustomer } from "@tes/mock/customers.mock";

export class CustomerMock {
  customer: Customer;

  constructor() {
    this.customer = new Customer(dataToNewCustomer);
  }

  get dataToLogin(): { email: string; password: string } {
    return Object.assign(
      {},
      {
        email: this.customer.getEmail,
        password: this.customer.getPassword,
      }
    );
  }

  get dataToCreate() {
    return Object.assign({}, this.customer.getDataToCreate);
  }
}
