import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  //   data: { navVisible: false }
  // },
  {
    path: '',
    loadChildren: () => import('./pages/components/layout.module').then(m => m.LayoutModule),
    data: { navVisible: true }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})
  ]
})
export class AppRoutingModule { }
