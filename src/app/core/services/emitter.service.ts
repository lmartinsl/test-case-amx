import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {

  public emitterLoad = new EventEmitter();

  public loading(_willShowLoading: boolean) {
    const isLoadingData = _willShowLoading;
    this.emitterLoad.emit(isLoadingData);
  }
}
