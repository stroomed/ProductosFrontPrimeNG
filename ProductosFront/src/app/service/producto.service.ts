import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  prodUrl = 'http://localhost:8080/productos/';

  constructor(private hc: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.hc.get<Producto[]>(this.prodUrl + 'listar');
  }

  public detalleID(id: number): Observable<Producto> {
    return this.hc.get<Producto>(this.prodUrl + `detallesId/${id}`);
  }

  public detalleNombre(nombre: string): Observable<Producto> {
    return this.hc.get<Producto>(this.prodUrl + `detallesNombre/${nombre}`);
  }

  public save(prod: Producto): Observable<any> {
    return this.hc.post<any>(this.prodUrl + `crear`, prod);
  }

  public editar(id: number, prod: Producto): Observable<any> {
    return this.hc.put<any>(this.prodUrl + `editar/${id}`, prod);
  }

  public delete(id: number): Observable<any> {
    return this.hc.delete<any>(this.prodUrl + `borrar/${id}`);
  }


}
