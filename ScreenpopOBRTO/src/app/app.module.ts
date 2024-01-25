import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenpopOBRTOComponent } from './screenpop-obrto/screenpop-obrto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonWebApiService } from './common-web-api.service';
import { AppDataService } from './app.dataService';
// import { ScreenpopObrtoOutboundComponent } from './screenpop-obrto-outbound/screenpop-obrto-outbound.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenpopOBRTOComponent,
    // ScreenpopObrtoOutboundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbModalModule,
    ReactiveFormsModule,
  ],
  providers: [AppDataService, CommonWebApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
