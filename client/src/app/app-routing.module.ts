import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/insert', pathMatch: 'full' },
  { path: 'insert', component: ProductInsertComponent },
  { path: 'list', component: ProductListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
