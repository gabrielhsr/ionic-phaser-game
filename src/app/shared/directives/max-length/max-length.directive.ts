import {
	Directive,
	EventEmitter,
	HostListener,
	Input,
	Output,
} from '@angular/core';
import { Platform } from '@ionic/angular';

@Directive({
	selector: '[appMaxLength]',
})
export class MaxLengthDirective {
	@Input() appMaxLength: number;
	@Output() ngModelChange: EventEmitter<any> = new EventEmitter();

	constructor(public platform: Platform) {}

	//keypress event doesn't work in ionic android. keydown event will work but the value doesn't
	//effect until this event has finished. hence using keyup event.
	@HostListener('keyup', ['$event']) onKeyup(event: Event) {
		const element = event.target as HTMLInputElement;
		const limit = this.appMaxLength;

		if (this.platform.is('android')) {
			const value = element.value.substring(0, limit);
			if (value.length <= limit) {
				element.value = value;
			} else {
				element.value = value.substring(0, limit - 1);
			}

			this.ngModelChange.emit(element.value);
		}
	}

	@HostListener('focus', ['$event']) onFocus(event: Event) {
		const element = event.target as HTMLInputElement;

		if (!this.platform.is('android')) {
			element.setAttribute('maxlength', this.appMaxLength.toString());
		}
	}
}
