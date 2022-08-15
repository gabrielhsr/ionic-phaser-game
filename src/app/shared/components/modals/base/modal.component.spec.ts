import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaseModalComponent } from './modal.component';

describe('ModalComponent', () => {
	let component: BaseModalComponent;
	let fixture: ComponentFixture<BaseModalComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [BaseModalComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(BaseModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
