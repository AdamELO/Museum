import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'ImgBlobConverter'
})
export class ImgBlobConverter implements PipeTransform {
    transform(img: string): string {
        return "data:image/JPEG;base64," + atob(img);
      }
}