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

  operation = ['-', '*'];

  name = '';
  formula = '0 + 0';
  realResult = 0;
  modelResult: number;
  score: number;

  numbers = [0, 0];
  op = 0;

  constructor(
    private http: HttpClient,
    ) { }

  generateFormula() {
    this.numbers[0] = Math.floor(Math.random() * 100);
    this.numbers[1] = Math.floor(Math.random() * 100);
    this.op = Math.floor(Math.random() * this.operation.length);

    this.formula = String(this.numbers[0]) + ' ' + this.operation[this.op] + ' ' + String(this.numbers[1]);
  }

  update(data: JSON) {
    console.log(data);
    this.score = data['score'];
    this.modelResult = data['model_result'];
    this.realResult = data['user_result'];
  }

  getDataUsingPromise(params: HttpParams) {
    this.http.get<JSON>(this.baseUrl + '/answer', {params}).toPromise().then(data => {
      // this.jsonAnswer = JSON.parse(JSON.stringify(data));
      console.log('Promise executed.', data);
      this.update(data);
    });
    console.log('I will not wait until promise is resolved..');
  }

  async send(name: string, result: number) {

    const params = new HttpParams().set('user', name).set('formula', this.formula).set('result', String(result));

    this.getDataUsingPromise(params);

  }

}
