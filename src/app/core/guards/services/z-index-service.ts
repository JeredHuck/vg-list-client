import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZIndexService {
  private zIndexValues: { [key: string]: number } = {};

  setZIndex(component: string, zIndex: number) {
    this.zIndexValues[component] = zIndex;
  }

  getZIndex(component: string): number {
    return this.zIndexValues[component] || 0;
  }
}
