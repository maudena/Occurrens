import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 4) return value;
    const resultado = [];
    for (let evento of value) {
      if (
        evento.location.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        evento.owner.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        evento.name.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultado.push(evento);
      }
    }
    return resultado;
  }
}
