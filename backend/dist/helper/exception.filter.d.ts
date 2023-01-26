import { ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
export declare class HttpExceptionFilter implements GqlExceptionFilter {
    catch(exception: any, host: ArgumentsHost): {
        isError: boolean;
        messages: any[];
    };
}
