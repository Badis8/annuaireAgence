import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnClickHandlerService {
  private _agencyClicked = new EventEmitter<string>();
  get agencyClicked() {
    return this._agencyClicked.asObservable();
  }

  emitClickEvent(agencyID:string){
    this._agencyClicked.emit(agencyID);
  }
  constructor() { }
}
