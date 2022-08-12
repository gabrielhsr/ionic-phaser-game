import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { GamePage } from './game.page';

const routes = [{ path: '', component: GamePage }];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		ComponentsModule,
		RouterModule.forChild(routes),
	],
	declarations: [GamePage],
})
export class GamePageModule {}
