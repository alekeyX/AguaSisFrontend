import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', component: HomeComponent },
  // { path: '**', pathMatch: 'full', redirectTo: '/' },
  {
    path: '', 
    loadChildren: () => import('./main.module').then(m => m.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
