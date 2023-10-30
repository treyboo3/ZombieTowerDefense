import Enemy from "../objects/enemies/EnemyObject.js";
import WalkerZombie from "../objects/enemies/WalkerZombie.js";
import { findPath } from "../utils/PathfindingUtil.js";

import Tower1 from "../objects/towers/Tower1.js"

class DemoLevelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DemoLevelScene' });
    }

    // load the Demo_Level map
    preload() {
        this.load.image('ZombieApocalypseTilesetReferenceFixed', 'src/assets/images/tilesets/ZombieApocalypseTilesetReferenceFixed.png');
        this.load.tilemapTiledJSON('demomap', 'src/assets/maps/DemoMap.json');
        this.load.spritesheet('zombies', 'src/assets/images/tilesets/ZombieApocalypseTilesetReferenceFixed.png', {frameWidth: 16, frameHeight: 16})
        
        // (Randy)
        this.load.image('tower_hotspot', 'src/assets/images/towers/blue.png');
        this.load.image('tower_ui', 'src/assets/images/towers/menu.png');
        this.load.image('tower1', 'src/assets/images/towers/tower1.png');
    }

    create() {
        // Create the map
        const map = this.make.tilemap({key: 'demomap'});
        console.log('Map:', map);  // Debugging line
        const tileset = map.addTilesetImage('ZombieApocalypseTilesetReferenceFixed', 'ZombieApocalypseTilesetReferenceFixed');
        console.log('Tileset:', tileset);  // Debugging line
        const walkableLayer = map.createLayer('Walkable Layer', tileset);
        console.log('Walkable Layer:', walkableLayer);  // Debugging line

        // Towers-(Randy)------------------------------------------------
        const tower_hotspot = this.add.sprite(400, 304, 'tower_hotspot').setInteractive();
        tower_hotspot.setScale(0.05);
        const tower_ui = this.add.sprite(180, 560, 'tower_ui');
        tower_ui.setScale(0.5, 0.3);

        const tower1_select = this.add.sprite(60, 560, 'tower1').setInteractive();
        tower1_select.setScale(0.15);

        tower1_select.on('pointerdown', () => {
            this.createNewSprite();
        });
        // Towers-(Randy)------------------------------------------------

        // Create the grid for A* pathfinding
        let grid = [];
        walkableLayer.forEachTile((tile) => {
            const x = tile.x;
            const y = tile.y;
            
            // Initialize this row if needed
            if (!grid[y]) {
                grid[y] = [];
            };

            //Set the grid value of whether the tile is walkable or not
            grid[y][x] = tile.index === 634 ? 1 : 0; // 1 is non-walkable, 0 is walkable
        });
        console.log("Grid:", grid);  // Debugging line

        // Find a path

        // Spawning a zombie
        const zombie = new WalkerZombie(this, 0, 0, 'zombies', 100, 2);
    }

    update () {

    }

    // create new sprites
    createNewSprite() {
        const tower1 = this.add.sprite(60, 560, 'tower1').setInteractive();
        tower1.setScale(0.15);
        
        // make the towers draggable
        this.input.setDraggable(tower1);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
}

export default DemoLevelScene;