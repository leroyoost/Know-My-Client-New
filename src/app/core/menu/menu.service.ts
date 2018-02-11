import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

    menuItems: Observable<any>;

    constructor(

    ) {

    }

    addMenu() {
        console.log('add menu fired');
    }

    getMenu() {
        return this.menuItems;
    }

}
