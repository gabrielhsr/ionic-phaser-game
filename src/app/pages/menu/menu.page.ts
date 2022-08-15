import { Component } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.page.html',
	styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
	public app = App;
}
