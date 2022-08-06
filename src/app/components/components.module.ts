import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestartModalComponent } from './restart-modal/restart-modal.component';

@NgModule({
	declarations: [RestartModalComponent],
	imports: [CommonModule],
	exports: [RestartModalComponent],
})
export class ComponentsModule {}
