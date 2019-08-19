import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CajerosComponent } from './componentes/cajeros/cajeros.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { SociosComponent } from './componentes/socios/socios.component';
import { SucursalesComponent } from './componentes/sucursales/sucursales.component';
import { TarjetasComponent } from './componentes/tarjetas/tarjetas.component';
import { TransaccionesComponent } from './componentes/transacciones/transacciones.component';

@NgModule({
  declarations: [
    AppComponent,
    CajerosComponent,
    ClientesComponent,
    SociosComponent,
    SucursalesComponent,
    TarjetasComponent,
    TransaccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
