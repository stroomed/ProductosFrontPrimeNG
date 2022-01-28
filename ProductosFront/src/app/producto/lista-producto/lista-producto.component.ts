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
  producto: Producto;
  selectedProduct: Producto;
  displayDialog: boolean;
  newProducto: boolean;
  cols: any[];

  constructor(
    private prodServ: ProductoService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.cols = [
      {field: 'nombre', header: 'Nombre'},
      {field: 'precio', header: 'Precio'}
    ];
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

  showDialogToAdd() {
    this.newProducto = true;
    this.producto;
    this.displayDialog = true;
  }

  save() {
    let productos = [...this.productos];
    if (this.newProducto) {
      productos.push(this.producto);
    } else {
      productos[this.productos.indexOf(this.selectedProduct)] = this.producto;
    }

    this.productos = productos;
    this.producto = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.productos.indexOf(this.selectedProduct);
    this.productos = this.productos.filter((val, i) => i != index);
    this.producto = null;
    this.displayDialog = false;
  }

  cloneProducto(p: Producto): Producto {
    let producto;
    for (let prop in p) {
      producto[prop] = p[prop];
    }
    return producto;
  }

  onRowSelect(event) {
    this.newProducto = false;
    this.producto = this.cloneProducto(event.data);
    this.displayDialog = true;
  }

}
