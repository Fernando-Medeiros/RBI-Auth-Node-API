import { CustomerModel } from "@inf/models/customers.model";
import { CacheHandler } from "@inf/services/cache/cache.handler";

export class SessionRepository {
  static async customerExists(sub: string): Promise<boolean | null> {
    const customer = await CustomerModel.exists({ pubId: sub });
    return customer?._id ? true : null;
  }

  static async findByIdCache(sub: string): Promise<string | null> {
    return await CacheHandler.find(sub);
  }

  static async setCache(key: string, value: string): Promise<void> {
    await CacheHandler.set(key, value);
  }
}
