import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'ImgBlobConverter'
})
export class ImgBlobConverter implements PipeTransform {
    transform(img: string): string {
        const blobPrefix = "data:image/JPEG;base64,";
        const blobSuffixe = atob(img);
        if (blobSuffixe.includes("%")) {
            return blobPrefix + img
        } else {
            return blobPrefix + atob(img);
        }
    }
}