import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseModalComponent } from './components/modals/base/modal.component';
import { GameoverModalComponent } from './components/modals/gameover-modal/gameover-modal.component';
import { PauseModalComponent } from './components/modals/pause-modal/pause-modal.component';

import { MaxLengthDirective } from './directives/max-length/max-length.directive';

@NgModule({
	declarations: [
		BaseModalComponent,
		GameoverModalComponent,
		PauseModalComponent,
		MaxLengthDirective,
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule,],
	exports: [GameoverModalComponent, PauseModalComponent],
})
export class SharedModule {}
