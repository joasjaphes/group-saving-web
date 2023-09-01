import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  // SERVER_ADDRESS = 'https://us-central1-group-saving.cloudfunctions.net/';
  SERVER_ADDRESS = 'http://127.0.0.1:5001/group-saving/us-central1/';
  // http://127.0.0.1:5001/group-saving/us-central1/addPastExpenseByMonth
  constructor(
    private http: HttpClient
  ) { }

  async saveData(url: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer groupsavings',
      ContentType: 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    return  await  this.http.post(`${this.SERVER_ADDRESS}${url}`, data, {headers}).toPromise();
  }
}
