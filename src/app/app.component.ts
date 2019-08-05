import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { resolve } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = '(fake) NLP with ReSTFul WebService';
  private positive = ['y', 'yes', 'yep', 's', 'si', 't', 'true'];
  private baseUrl = 'http://localhost:3000';

  subscribeResult = JSON;
  promiseResult = JSON;
  asyncResult = JSON;

  constructor(
    private http: HttpClient,
    ) { }

  getDataUsingSubscribe(params) {
    this.http.get<JSON>(this.baseUrl + '/answer', {params}).subscribe(data => {
      // this.jsonAnswer = JSON.parse(JSON.stringify(data));
      console.log('Subscribe executed.', data);
      this.subscribeResult = data;
    });
    console.log('I will not wait until subscribe is executed..');
  }

  getDataUsingPromise(params) {
    this.http.get<JSON>(this.baseUrl + '/answer', {params}).toPromise().then(data => {
      // this.jsonAnswer = JSON.parse(JSON.stringify(data));
      console.log('Promise executed.', data);
      this.promiseResult = data;
    });
    console.log('I will not wait until promise is resolved..');
  }

  async getAsyncData(params) {
    this.asyncResult = await this.http.get<JSON>(this.baseUrl + '/answer', {params}).toPromise();
    console.log('No issues, I will wait until promise is resolved..');
    console.log('Async executed.', this.asyncResult);
  }

  async send(ask) {
    console.log(ask);
    const app = this.positive.includes(ask);
    console.log(app);
    const  params = new  HttpParams().set('ask', String(app));

    this.getAsyncData(params);
    this.getDataUsingSubscribe(params);
    this.getDataUsingPromise(params);

  }

}
