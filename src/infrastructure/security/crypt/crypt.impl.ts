import type { ICrypt } from 'app/interfaces/security/crypt.interface';
import bcrypt from 'bcryptjs';

export class Crypt implements ICrypt {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}
