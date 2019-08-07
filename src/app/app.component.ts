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
  //Server info
  private title = '(fake) NLP with ReSTFul WebService';
  //private positive = ['y', 'yes', 'yep', 's', 'si', 't', 'true'];
  private baseUrl = 'http://localhost:3000';

  operation = ['-', '*'];
  
  //initial values
  name = '';
  formula = '0 + 0';
  realResult = 0;
  modelResult: number;
  score: number;
  numbers = [0, 0];
  op = 0;

  //Classes need constructors
  //We initialize this class with the HttpClient
  constructor(
    private http: HttpClient,
    ) { }

  //Method for generating formulae for the student to calculate
  generateFormula() {
    this.numbers[0] = Math.floor(Math.random() * 100);
    this.numbers[1] = Math.floor(Math.random() * 100);
    this.op = Math.floor(Math.random() * this.operation.length);

    this.formula = String(this.numbers[0]) + ' ' + this.operation[this.op] + ' ' + String(this.numbers[1]);
  }
  
  //Update what is shown on Client display
  update(data: JSON) {
    console.log(data);
    this.score = data['score'];
    this.modelResult = data['model_result'];
    this.realResult = data['user_result'];
  }

  //Asynchronously request the server to treat our data and respond
  //then update with the answer when it comes
  getDataUsingPromise(params: HttpParams) {
    this.http.get<JSON>(this.baseUrl + '/answer', {params}).toPromise().then(data => {
      console.log('Promise executed.', data);
      this.update(data);
    });
    console.log('I will not wait until promise is resolved..');
  }

  //Asynchronous function to send our results
  async send(name: string, result: number) {

    const params = new HttpParams().set('user', name).set('formula', this.formula).set('result', String(result));

    this.getDataUsingPromise(params);

  }

}
