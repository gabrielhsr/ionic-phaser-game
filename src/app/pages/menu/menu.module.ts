import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const route = [{ path: '', component: MenuPage }];

@NgModule({
	imports: [CommonModule, IonicModule, RouterModule.forChild(route)],
	declarations: [MenuPage],
})
export class MenuPageModule {}
