import Tower from './TowerObject.js';

export default class SniperTower extends Tower {
    constructor(scene, x, y) {
        super(scene, x, y, 'sniper_tower', 100, 200, 1);
    }
}