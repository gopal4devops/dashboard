import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Account } from '../Account';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/account';
  constructor(private http:HttpClient) { }

  getAccount(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }
}

