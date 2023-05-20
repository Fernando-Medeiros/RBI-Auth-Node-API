export const emailConfig = () => {
    return {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env['EMAIL_USERNAME'],
            pass: process.env['EMAIL_PASSWORD'],
        },
    };
};

export interface IEmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string | undefined;
        pass: string | undefined;
    };
}
