import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenpopOBRTOComponent } from './screenpop-obrto/screenpop-obrto.component';


const routes: Routes = [
  { path: '', component: ScreenpopOBRTOComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
