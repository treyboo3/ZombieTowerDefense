// Enemy Objects
import WalkerZombie from "../objects/enemies/WalkerZombie.js";
import RunnerZombie from "../objects/enemies/RunnerZombie.js";
import TankZombie from "../objects/enemies/TankZombie.js";
import SpitterZombie from "../objects/enemies/SpitterZombie.js";

export default class WaveManager {
  constructor(scene, startTileX, startTileY, endTileX, endTileY, level) {
    this.scene = scene;
    this.currentWave = 0;
    this.nextSpawnTime = 0;
    //this.waveDelay = 30000; // 30 seconds between waves
    //this.lastWaveEndTime = 0;
    this.waves = this.initializeWaves(level);
    this.zombies = {
      walker: WalkerZombie,
      runner: RunnerZombie,
      tank: TankZombie,
      spitter: SpitterZombie,
    };

    // Tile Coordinates for pathfinding (in grid)
    this.startTileX = startTileX;
    this.startTileY = startTileY;
    this.endTileX = endTileX;
    this.endTileY = endTileY;

    // World Coorindates for spawning enemies
    this.startX = this.startTileX * 16;
    this.startY = this.startTileY * 16;
    this.endX = this.endTileX * 16;
    this.endY = this.endTileY * 16;
  }

  initializeWaves(level) {
    // Define the waves
    if (level == 1) {
      return [
        {
          // Wave 1
          enemies: ["walker", "walker", "walker", "walker", "walker"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 2
          enemies: ["walker", "walker", "walker", "walker", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 3
          enemies: ["walker", "walker", "runner", "runner", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 4
          enemies: [
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 5
          enemies: ["tank", "tank", "tank", "tank", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 6
          enemies: [
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 7
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 8
          enemies: [
            "tank",
            "tank",
            "tank",
            "tank",
            "tank",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 9
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 10
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "spitter",
            "spitter",
            "spitter",
          ],
          spawnInterval: 1000, // 1 second
        },
      ];
    }
    if (level == 2) {
      return [
        {
          // Wave 1
          enemies: ["walker", "walker", "walker", "walker", "walker", "walker", "walker", "runner", "runner", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 2
          enemies: ["walker", "walker", "walker", "walker", "tank", "walker", "walker", "tank", "walker", "walker"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 3
          enemies: ["walker", "walker", "runner", "runner", "tank", "walker", "walker", "runner", "runner", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 4
          enemies: [
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 5
          enemies: ["tank", "tank", "tank", "tank", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 6
          enemies: [
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 7
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner",
            "runner",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 8
          enemies: [
            "tank",
            "tank",
            "tank",
            "tank",
            "tank",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "tank",
            "tank",
            "runner",
            "runner",
            "tank",
            "tank",
            "runner",
            "runner"
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 9
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank"
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 10
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "spitter",
            "spitter",
            "spitter",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
          ],
          spawnInterval: 1000, // 1 second
        },
      ];
    }
    if (level == 3) {
      return [
        {
          // Wave 1
          enemies: ["walker", "walker", "walker", "walker", "walker", "walker", "walker", "runner", "runner", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 2
          enemies: ["walker", "walker", "walker", "walker", "tank", "walker", "walker", "runner", "runner", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 3
          enemies: ["walker", "walker", "runner", "runner", "tank", "walker", "walker", "runner", "runner", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 4
          enemies: [
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 5
          enemies: ["tank", "tank", "tank", "tank", "tank"],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 6
          enemies: [
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner",
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 7
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner",
            "walker",
            "walker",
            "runner",
            "runner",
            "walker",
            "walker",
            "walker",
            "walker",
            "runner",
            "runner"
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 8
          enemies: [
            "tank",
            "tank",
            "tank",
            "tank",
            "tank",
            "runner",
            "runner",
            "tank",
            "tank",
            "runner",
            "runner",
            "tank",
            "tank",
            "tank",
            "tank",
            "tank",
            "runner",
            "runner",
            "tank",
            "tank",
            "runner",
            "runner"
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 9
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "runner",
            "runner",
            "tank"
          ],
          spawnInterval: 1000, // 1 second
        },
        {
          // Wave 10
          enemies: [
            "walker",
            "walker",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "spitter",
            "spitter",
            "spitter",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "spitter",
            "spitter",
            "runner",
            "runner",
            "tank",
            "walker",
            "walker",
            "spitter",
            "spitter",
          ],
          spawnInterval: 1000, // 1 second
        },
      ];
    }
  }

  startNextWave() {
    // Increment the wave counter if we're not past the last wave
    if (this.currentWave < this.waves.length - 1) {
      this.currentWave++;
      this.nextSpawnTime = this.scene.time.now; // Reset the spawn timer for the new wave
      //this.lastWaveEndTime = this.scene.time.now; // Update the end time of the wave
      this.scene.displayManager.waveTimerManager.resetTimer(); // Reset the wave timer
    } else {
      // All waves are complete, handle game completion
    }
  }

  spawnEnemy() {
    // Get the next enemy to spawn
    // console.log("Spawning enemy");
    const enemyType = this.waves[this.currentWave].enemies.shift();
    const enemyClass = this.zombies[enemyType];
    const enemy = new enemyClass(this.scene, this.startX, this.startY); // uses global coordinates
    enemy.calculatePath(
      this.startTileX,
      this.startTileY,
      this.endTileX,
      this.endTileY
    ); // uses tile coordinates

    // Add the enemy to the scene
    this.scene.zombies.add(enemy);

    // Add the enemy to the enemy count
    //this.scene.displayManager.enemyCountManager.addEnemy(1);

    // Set the time for the next spawn
    this.nextSpawnTime =
      this.scene.time.now + this.waves[this.currentWave].spawnInterval;
  }

  update() {
    // If we're past the last wave, do nothing
    if (this.currentWave >= this.waves.length) {
      return;
    }

    // If it's time to spawn the next enemy and there are enemies left in the current wave
    if (
      this.scene.time.now > this.nextSpawnTime &&
      this.waves[this.currentWave].enemies.length > 0
    ) {
      this.spawnEnemy();
    }

    // If there are no more enemies to spawn and no active enemies left, the wave is complete
    //&& this.scene.zombies.countActive(true) === 0 ; for when there are no active enemies left
    if (
      this.waves[this.currentWave].enemies.length === 0 &&
      0 >= this.scene.displayManager.waveTimerManager.waveTimer
    ) {
      this.startNextWave();
      this.scene.displayManager.waveTimerManager.resetTimer();
    }
  }
}
