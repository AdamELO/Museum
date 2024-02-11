import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'imgBlobConverter'
})
export class imgBlobConverter implements PipeTransform {
    transform(img: string): string {
        return "data:image/JPEG;base64," + atob(img);
      }
}