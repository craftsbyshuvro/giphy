import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GifSearchComponent } from './giphy/gif-search.component';

const routes: Routes = [
  {
    path: 'giphy',
    component: AppComponent,
    children: [
      {
        path: 'gif-search',
        component: GifSearchComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
