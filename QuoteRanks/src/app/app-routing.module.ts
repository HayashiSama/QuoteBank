import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { AddquotesComponent } from './addquotes/addquotes.component';
import { ListComponent } from './list/list.component';
import { ListquotesComponent } from './listquotes/listquotes.component';

const routes: Routes = [
{ path: 'add', component: AddComponent },
{ path: 'list', component: ListComponent },
{ path: 'edit', component: EditComponent },
{ path: 'addquotes', component: AddquotesComponent },
{ path: 'listquotes', component: ListquotesComponent },
{ path: '**', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
