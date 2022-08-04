const player = 'player';
const playerSheet = 'player-sheet';
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
    },
    obstacleHole: {
        key: `${obstacleHole}_key`,
        path: `assets/${obstacleHole}.png`,
    },
    obstacleTruck: {
        key: `${obstacleTruck}_key`,
        path: `assets/${obstacleTruck}.png`,
    },
    obstacleVan: {
        key: `${obstacleVan}_key`,
        path: `assets/${obstacleVan}.png`,
    },
};

export interface Asset {
    key: string;
    path: string;
}
