import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, tap } from "rxjs";
import { ResponseModel } from "../Models/ResponseModel";


@Injectable()
export class ResponseModelInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next
            .handle()
            .pipe(tap((response: any) => {
                if (response instanceof ResponseModel) {
                    const httpCtx = context.switchToHttp()
                    const httpResponse: Response = httpCtx.getResponse()
                    httpResponse.status(response.statusCode)
                    if (!response.data)
                        delete response.data
                }
            }))
    }
}