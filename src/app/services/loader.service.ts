import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading: WritableSignal<boolean> = signal(false);
  public get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }
  constructor() { }

  start() {
    this._isLoading.set(true);
  }

  stop() {
    this._isLoading.set(false);
  }
}
