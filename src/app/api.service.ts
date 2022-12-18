import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url: string = '';
  private mode: string = 'UAT';

  giturl = 'https://api.github.com/users';
  zooUrl =
    'https://insentstaging1.widget.insent.ai/pusher/presence/auth/visitor?userid=RzwL48pTfJoItRp4g1671260252954';
  zooUrlG =
    'https://insentstaging1.widget.insent.ai/getuser?url=insent-staging10.firebaseapp.com/fe-assignment';

  constructor(private http: HttpClient) {
    switch (this.mode) {
      case 'DEV': {
        this.url = 'http://192.168.0.122:9090/tafesaral/saral/';
        break;
      }
    }
  }

  getGitUsers(): Observable<any> {
    return this.http.get(this.zooUrlG);
  }

  getchatbotData(data): Observable<any> {
    return this.http.post(this.zooUrl, data);
  }

  // Dashboard ends
  //Jagadeesh change ends
  //Job ends
}
