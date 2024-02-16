import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'SortByIdFloorPipe',
  standalone: true,
})
export class SortByIdFloorPipe implements PipeTransform {
  transform(items: any[]): any[] {
    return items.sort((a,b)=> a.id-b.id)
  }

}
