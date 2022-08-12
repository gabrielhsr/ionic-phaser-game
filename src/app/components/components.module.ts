import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PauseModalComponent } from './pause-modal/pause-modal.component';
import { GameoverModalComponent } from './gameover-modal/gameover-modal.component';

@NgModule({
	declarations: [PauseModalComponent, GameoverModalComponent],
	imports: [CommonModule, SharedModule, RouterModule],
	exports: [PauseModalComponent, GameoverModalComponent],
})
export class ComponentsModule {}
