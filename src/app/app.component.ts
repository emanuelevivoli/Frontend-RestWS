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
  formula = '';
  realResult = '';
  modelResult: string;
  score: number;

  constructor(
    private http: HttpClient,
    ) { }

  update(data: JSON) {
    console.log(data);
    this.score = data['score'];
    if (data['model_result'] == true){
      this.modelResult = 'positive';
    }else{
      this.modelResult = 'negative';
    }

  }

  getDataUsingPromise(params: HttpParams) {
    this.http.get<JSON>(this.baseUrl + '/answer', {params}).toPromise().then(data => {
      // this.jsonAnswer = JSON.parse(JSON.stringify(data));
      console.log('Promise executed.', data);
      this.update(data);
    });
    console.log('I will not wait until promise is resolved..');
  }

  async send(name: string, result: string) {

    const params = new HttpParams().set('user', name).set('sentence', result);

    this.getDataUsingPromise(params);

  }

}
