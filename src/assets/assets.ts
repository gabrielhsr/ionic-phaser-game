const playerSheet = 'player/player';

const obstacleCar = 'obstacle/car01';
const obstacleHole = 'obstacle/hole01';
const obstacleTruck = 'obstacle/truck01';
const obstacleVan = 'obstacle/van01';

const gameSize = 'helpers/gameSize';
const verticalLine = 'helpers/verticalLine';
const horizontalLine = 'helpers/horizontalLine';

export const player = {
	default: {
		key: `${playerSheet}_key`,
		path: `assets/${playerSheet}.png`,
		frameWidth: 64,
		frameHeight: 113,
	},
};

export const helpers = {
	gameSizeBorder: {
		key: `${gameSize}_key`,
		path: `assets/${gameSize}.png`,
	},
	verticalLine: {
		key: `${verticalLine}_key`,
		path: `assets/${verticalLine}.png`,
	},
	horizontalLine: {
		key: `${horizontalLine}_key`,
		path: `assets/${horizontalLine}.png`,
	},
};

export const obstacles = {
	obstacleCar: {
		key: `${obstacleCar}_key`,
		path: `assets/${obstacleCar}.png`,
		speed: 100,
		scale: 1,
	},
	obstacleHole: {
		key: `${obstacleHole}_key`,
		path: `assets/${obstacleHole}.png`,
		speed: 0,
		scale: 1,
	},
	obstacleTruck: {
		key: `${obstacleTruck}_key`,
		path: `assets/${obstacleTruck}.png`,
		speed: 70,
		scale: 1.5,
	},
	obstacleVan: {
		key: `${obstacleVan}_key`,
		path: `assets/${obstacleVan}.png`,
		speed: 85,
		scale: 1.3,
	},
};

export interface Asset {
	key: string;
	path: string;
}

export interface AssetObstacle extends Asset {
	speed: number;
	scale: number;
}

export interface AssetPlayer extends Asset {
	frameWidth: number;
	frameHeight: number;
}
