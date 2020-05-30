import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MeiraErrorDTO } from '../../models/meiraerror.dto';
   
export class HttpErrorMeiraInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let meiraErrorDTO:MeiraErrorDTO;
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                        meiraErrorDTO = {
                            error:1,
                            status: error.status,
                            statusText:`Error: ${error.message}`,
                            url: `Error: ${error.url}`,
                            message: `Error: ${error.error.message}`
                        }
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;    
                    }
                    //window.alert(errorMessage);
                    errorMessage = `Error: ${error.error.message}`;
                    meiraErrorDTO = {
                        error:2,
                        status: error.status,
                        statusText:`Error: ${error.message}`,
                        url: `Error: ${error.url}`,
                        message: `Error: ${error.error.message}`
                    }
                    return throwError(meiraErrorDTO);
                })
            )
        }
}