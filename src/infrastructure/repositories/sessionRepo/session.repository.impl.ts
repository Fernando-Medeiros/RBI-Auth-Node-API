import { CustomerModel } from 'infra/models/customers.model';
import { CacheHandler } from 'infra/services/cache/cache.handler';

export class SessionRepository {
    static async customerExists(sub: string): Promise<boolean | null> {
        const customer = await CustomerModel.exists({ pubId: sub });

        return customer?._id ? true : null;
    }

    static async findById(key: string): Promise<string | null> {
        return await CacheHandler.find(key);
    }

    static async setCache(key: string, value: string): Promise<void> {
        await CacheHandler.set(key, value);
    }
}
