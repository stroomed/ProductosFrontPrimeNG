import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';

const routes: Routes = [
  {path: '', component: ListaProductoComponent},
  {path: 'nuevo', component: ListaProductoComponent},
  {path: 'editar/:id', component: ListaProductoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
