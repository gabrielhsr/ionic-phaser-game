import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BaseModalComponent } from './components/modals/base/modal.component';
import { GameoverModalComponent } from './components/modals/gameover-modal/gameover-modal.component';
import { PauseModalComponent } from './components/modals/pause-modal/pause-modal.component';

@NgModule({
	declarations: [
		BaseModalComponent,
		GameoverModalComponent,
		PauseModalComponent,
	],
	imports: [CommonModule, RouterModule],
	exports: [GameoverModalComponent, PauseModalComponent],
})
export class SharedModule {}
