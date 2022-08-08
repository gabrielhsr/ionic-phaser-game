const player = 'player';
const playerSheet = 'player';
const background = 'road';
const obstacleCar = 'obstacle/car01';
const obstacleHole = 'obstacle/hole01';
const obstacleTruck = 'obstacle/truck01';
const obstacleVan = 'obstacle/van01';

export const assets = {
	player: {
		key: `${playerSheet}_key`,
		path: `assets/${playerSheet}.png`,
	},
	background: {
		key: `${background}_key`,
		path: `assets/${background}.png`,
	},
	obstacleCar: {
		key: `${obstacleCar}_key`,
		path: `assets/${obstacleCar}.png`,
		speed: 100,
	},
	obstacleHole: {
		key: `${obstacleHole}_key`,
		path: `assets/${obstacleHole}.png`,
		speed: 0,
	},
	obstacleTruck: {
		key: `${obstacleTruck}_key`,
		path: `assets/${obstacleTruck}.png`,
		speed: 70,
	},
	obstacleVan: {
		key: `${obstacleVan}_key`,
		path: `assets/${obstacleVan}.png`,
		speed: 85,
	},
};

export interface Asset {
	key: string;
	path: string;
	speed?: number;
}
