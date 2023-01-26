import { HttpStatus } from '@nestjs/common';
export declare class TokenGetDTO {
    status: HttpStatus;
    message: string;
    token: string;
}
