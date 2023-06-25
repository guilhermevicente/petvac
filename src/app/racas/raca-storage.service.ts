import { Injectable } from '@angular/core';
import { Raca } from 'src/model/raca';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoutesAPI } from '../util/routes-api';
import { ErrorUtil } from '../util/error-handler';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RacaStorageService {
  racas!: Raca[];

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getRacas(): Observable<Raca[]> {
    return this.httpClient.get<Raca[]>(`${RoutesAPI.RACAS}`).pipe(
      catchError(ErrorUtil.handleError)
    );
  }
}
