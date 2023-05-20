import { BadRequest, BaseException, NotFound } from 'utils/http.exceptions';

class TypeValidator {
    constructor(obj: unknown, exception: BaseException) {
        const exp = obj === null || obj === false || obj === undefined;
        if (exp) {
            throw exception;
        }
    }
}

export const isTrue_or_404 = (obj: unknown, message: string): void => {
    new TypeValidator(obj, new NotFound(message));
};

export const isTrue_or_400 = (obj: unknown, message: string): void => {
    new TypeValidator(obj, new BadRequest(message));
};
