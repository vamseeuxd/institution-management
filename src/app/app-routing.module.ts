import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageInstitutionsComponent} from './pages/manage-institutions/manage-institutions.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'manage-institutions',
  },
  {
    path: 'manage-institutions',
    component: ManageInstitutionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
