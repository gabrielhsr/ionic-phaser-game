import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'menu',
		pathMatch: 'full',
	},
	{
		path: 'menu',
		loadChildren: () =>
			import('./menu/menu.module').then((m) => m.MenuPageModule),
	},
	{
		path: 'game',
		loadChildren: () =>
			import('./game/game.module').then((m) => m.GamePageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
