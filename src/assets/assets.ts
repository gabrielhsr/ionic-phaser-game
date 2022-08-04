const player = 'player';
const playerSheet = 'player-sheet';
const background = 'road';
const obstacleCar = 'obstacle/car01';
const obstacleHole = 'obstacle/hole01';
const obstacleTruck = 'obstacle/truck01';
const obstacleVan = 'obstacle/van01';

export const assets = {
    player: {
        name: playerSheet,
        key: `${playerSheet}_key`,
        path: `assets/${playerSheet}.png`,
    },
    background: {
        name: background,
        key: `${background}_key`,
        path: `assets/${background}.png`,
    },
    obstacleCar: {
        name: obstacleCar,
        key: `${obstacleCar}_key`,
        path: `assets/${obstacleCar}.png`,
    },
    obstacleHole: {
        name: obstacleHole,
        key: `${obstacleHole}_key`,
        path: `assets/${obstacleHole}.png`,
    },
    obstacleTruck: {
        name: obstacleTruck,
        key: `${obstacleTruck}_key`,
        path: `assets/${obstacleTruck}.png`,
    },
    obstacleVan: {
        name: obstacleVan,
        key: `${obstacleVan}_key`,
        path: `assets/${obstacleVan}.png`,
    },
};

export interface Asset {
    name: string;
    key: string;
    path: string;
}
