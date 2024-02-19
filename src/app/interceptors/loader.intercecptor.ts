import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize, mergeMap, timer } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
    let loader = inject(LoaderService)
    loader.start();
    return timer(1000).pipe(
        mergeMap(() => next(req).pipe(
            finalize(() => {
                loader.stop();
            }))));
};
