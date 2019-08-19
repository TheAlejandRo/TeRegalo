import { Component, OnInit } from '@angular/core';
import { CajerosService } from '../../servicios/cajeros.service';
import { NgForm } from '@angular/forms';
import { Cajeros } from 'src/app/modelos/cajeros';

@Component({
  selector: 'app-cajeros',
  templateUrl: './cajeros.component.html',
  styleUrls: ['./cajeros.component.css'],
  providers: [CajerosService]
})
export class CajerosComponent implements OnInit {

  constructor(private cajerosService: CajerosService) { }

  ngOnInit() {
  }

  AgregarCajero(formulario: NgForm) {
    this.cajerosService.postCajero(formulario.value)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  borrarDatos(formulario?: NgForm) {
    if (formulario) {
      formulario.resetForm();
      this.cajerosService.selecCajeros = new Cajeros();
    }
  }
}
