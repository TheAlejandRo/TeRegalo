export class Cajeros {

    constructor(idcajero=0, cajeroUser='', nombres='', apellidos='', telefono=0, idsucursal=0){
        this.idcajero = idcajero;
        this.cajeroUser = cajeroUser;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.idsucursal = idsucursal;
    }

    idcajero: number;
    cajeroUser: string;
    nombres: string;
    apellidos: string;
    telefono: number;
    idsucursal: number;
}
