import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  prod: Producto = null;

  constructor(
    private prodServ: ProductoService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    this.prodServ.detalleID(id).subscribe(
      data => {
        this.prod = data;
      }, err => {
        this.toastr.error(
          err.error.mensaje,
          'Fail',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          }
        );
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
