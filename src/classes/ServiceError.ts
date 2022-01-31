export class ServiceError extends Error {
    constructor(message: string, public httpCode: number){
        super(message);
    }
}