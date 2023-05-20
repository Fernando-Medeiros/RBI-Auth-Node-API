export interface IEmailService {
    sendEmail(email: string, token: string): Promise<string | void>;
}
