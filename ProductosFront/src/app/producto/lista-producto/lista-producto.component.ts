import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  producto: Producto = null;

  constructor(
    private prodServ: ProductoService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.prodServ.lista().subscribe(
      data => {
        this.productos = data;
      }, err => {
        console.log(err);
      }
    );
  }

  borrarProducto(id: number){
    this.prodServ.delete(id).subscribe(
      data => {
        this.toastr.success(
          'Producto eliminado',
          'OK',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          }
        );
        this.cargarProductos();
      }, err => {
        this.toastr.error(
          err.error.mensaje,
          'Fail',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          }
        );
        this.cargarProductos();
      }
    );
  }

  onUpdate(): void {
    const id = this.actRoute.snapshot.params.id;
    this.prodServ.editar(id, this.producto).subscribe(
      data => {
        this.toastr.success(
          'Producto Actualizado',
          'OK',
          {
            timeOut: 3000, positionClass: 'toast-top-center'
          }
        );
        this.router.navigate(['/']);
      }, err => {
        this.toastr.error(
          err.error.mensaje,
          'Fail',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
        this.router.navigate(['/']);
      }
    );
  }

}
