import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppDataService } from './app.dataService';

const baseIP = 'hbprdctiwbap1.hbctxdom.com:85';
const baseURL = 'https://' + baseIP + '/apiCTI/api/';

@Injectable({
  providedIn: 'root',
})
export class CommonWebApiService {

  constructor(private httpClient: HttpClient,private appDataService: AppDataService) {}

  POSTInsertRTOData(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertRTOData', data);
  }

  POSTInsertRTOWrapupData(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertRTOWrapupData', data);
  }

  POSTInsertOutcome(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertOutcome', data);
  }
  SetBusinessOutcomeWithComments(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + ' SetBusinessOutcomeWithComments', data);
  }
  POSTInsertDNC(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertDNC', data);
  }

  SetCallResults(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'SetCallResults', data);
  }

  POSTInsertCallBackData(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertCallBackData', data);
  }

  SetBusinessOutcomeWithCallback(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'SetBusinessOutcomeWithCallback', data);
  }
  SetPersonalCallbackWithComments(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'SetPersonalCallbackWithComments', data);
  }
  GetBOGroupParent(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'GetBOGroupParent', data);
  }
  GetBusinessOutCome(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'GetProcessInfo', data);
  }
  GetProcessInfo(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'GetProcessInfo', data);
  }
  GetBusinessOutcomeParent(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'GetBusinessOutcomeParent', data);
  }
  GetModes(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'GetModes', data);
  }
  GetAccountDetails(url: any, data: any): Observable<any> {
    return this.httpClient.get(url + 'GetAccountDetails?callernumber=' + data);
  }

  GETHistoryDetails(url: any, data: any): Observable<any> {
    return this.httpClient.get(url + 'GETHistoryDetails?ani' + data + '&modeofcall=PredictiveOutbound');
  }

  GetScreenPopData(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'GetScreenPopData', data);
  }

  // ------------------------------- outbound -----------------------------------------

   // GetBusinessOutCome(url: any, data: any): Observable<any> {
  //   return this.httpClient.post(url + 'getAllBusinessOutcome', data);
  // }

  // GetBusinessOutcomeParent(){}
  SetAgentStatus(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + 'SetAgentStatus', data);
  }

  POSTInsertCallData(url: any, data: any): Observable<any> {
    return this.httpClient.post(url + ' POSTInsertCallData', data);
  }
  
}
