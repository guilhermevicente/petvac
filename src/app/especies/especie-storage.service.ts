import { Especie } from './../../model/especie';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError} from 'rxjs/operators';

import { Observable } from 'rxjs';
import { RoutesAPI } from '../util/routes-api';
import { ErrorUtil } from '../util/error-handler';

@Injectable({
  providedIn: 'root',
})
export class EspecieStorageService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getEspecies(): Observable<Especie[]> {
    return this.httpClient.get<Especie[]>(`${RoutesAPI.ESPECIES}`).pipe(
      catchError(ErrorUtil.handleError)
    );
  }
}
