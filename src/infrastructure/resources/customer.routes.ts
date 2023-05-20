import { Router } from 'express';
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from 'infra/controllers/customer.controller';

const publicRoute = Router();

const privateRoute = Router();

export const customerRoutes = {
    public() {
        publicRoute.post('/customers', createCustomer);

        return publicRoute;
    },
    private() {
        privateRoute.get('/customers', getAllCustomers);

        privateRoute.get('/customers/:id', getCustomerById);

        privateRoute.patch('/customers', updateCustomer);

        privateRoute.delete('/customers', deleteCustomer);

        return privateRoute;
    },
};
