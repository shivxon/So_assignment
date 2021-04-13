import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  setStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValueByKey(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  clear(): void {
    localStorage.clear();
  }
}
