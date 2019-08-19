import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cajeros } from '../modelos/cajeros';

@Injectable({
  providedIn: 'root'
})
export class CajerosService {

  selecCajeros: Cajeros;
  cajeros: Cajeros[];
  readonly URL_API = 'http://localhost:3000/cajero';

  constructor(private http: HttpClient) {
    this.selecCajeros = new Cajeros();
  }

  getCajeros() {
    return this.http.get(this.URL_API + 's');
  }

  postCajero(Cajero: Cajeros) {
    return this.http.post(this.URL_API + '/nuevo', Cajero);
  }

  putCajero(cajero: Cajeros) {
    return this.http.put(this.URL_API + `/${cajero.idcajero}`, Cajeros);
  }

  deleteCajero(idcajero: string) {
    return this.http.delete(this.URL_API + `/${idcajero}`);
  }
}
