import { AppError } from './app-error-handler';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorUtil {
  public static handleError(error: HttpErrorResponse) {
    console.log('handleError');
    let errorMessage = '';
    console.log(error);
    if (error.status === 0) {
      console.error('cliente');
      errorMessage =
        error instanceof AppError
          ? error.message
          : 'Ocorreu um erro do lado do cliente';
    } else {
      console.error('servidor');
      errorMessage = ErrorUtil.getServerErrorMessage(error);
    }

    return throwError(new Error(errorMessage));
  }

  private static getServerErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 403: {
        return `Acesso negado!`;
      }
      case 500: {
        return `Erro interno na aplicação!`;
      }
      case 404: {
        return `Não foi encontrado!`;
      }
      default: {
        return `Erro não identificado!`;
      }
    }
  }
}
