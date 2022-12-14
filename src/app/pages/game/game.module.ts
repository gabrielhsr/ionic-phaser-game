import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { GamePage } from './game.page';

const routes = [{ path: '', component: GamePage }];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		SharedModule,
		RouterModule.forChild(routes),
	],
	declarations: [GamePage],
})
export class GamePageModule {}
