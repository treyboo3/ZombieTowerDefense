import Tower from './TowerObject.js';
import Projectile from './Projectile.js';

export default class FlamethrowerTower extends Tower {
    constructor(scene, x, y, audioManager) {
        // (scene, x, y, texture, damage, range, speed)
        // speed is the delay between attacks in milliseconds
        super(scene, x, y, 'flame_tower_1', 'flame_projectile', 30, 100, 2000, audioManager);

        this.audioManager = audioManager;

        this.damageUpgradeVal = 10;
        this.damageUpgradeCost = 100;
        this.attackSpeedUpgradeVal = 300;
        this.attackSpeedUpgradeCost = 150;
        this.rangeUpgradeVal = 20;
        this.rangeUpgradeCost = 50;

        this.damageUpgradeNum = 0;
        this.attackSpeedUpgradeNum = 0;
        this.rangeUpgradeNum = 0;

        this.maxDamageUpgradeNum = 3;
        this.maxAttackSpeedUpgradeNum = 3;
        this.maxRangeUpgradeNum = 3;

        // Upgrade tower menu
        this.on('pointerdown', () => {
            const popUpMenu = scene.add.group();
            scene.upgradeMenuGroup.push(popUpMenu);

            scene.upgradeMenuGroup.forEach(group => {
                group.setVisible(false);
            });

            popUpMenu.setVisible(false);

            //Upgrade Menu
            const UpgradeMenu = scene.add.image(this.x, this.y, 'UpgradeMenu').setOrigin(0.5).setAlpha(0.6).setDepth(3);
            const Upgrade_Damage = scene.add.image(this.x - 120, this.y - 48, 'Upgrade_Damage').setOrigin(0).setAlpha(0.6).setInteractive({cursor: 'pointer'}).setDepth(3);
            const Upgrade_AttackSpeed = scene.add.image(this.x - 120, this.y - 16, 'Upgrade_AttackSpeed').setOrigin(0).setAlpha(0.6).setInteractive({cursor: 'pointer'}).setDepth(3);
            const Upgrade_Range = scene.add.image(this.x - 120, this.y  + 16, 'Upgrade_Range').setOrigin(0).setAlpha(0.6).setInteractive({cursor: 'pointer'}).setDepth(3);
            const UpgradeMenu_Cancel = scene.add.image(this.x + 88, this.y - 16, 'UpgradeMenu_Cancel').setOrigin(0).setAlpha(0.6).setInteractive({cursor: 'pointer'}).setDepth(3);

            const upgrade_damage_text = scene.add.text(this.x - 80, this.y - 32, `+${this.damageUpgradeVal} Damage`, {fill: '#000000'}).setOrigin(0, 0.5).setDepth(3);
            const upgrade_attackSpeed_text = scene.add.text(this.x - 80, this.y, `+${this.attackSpeedUpgradeVal} Speed`, {fill: '#000000'}).setOrigin(0, 0.5).setDepth(3);
            const upgrade_range_text = scene.add.text(this.x - 80, this.y + 32, `+${this.rangeUpgradeVal} Range`, {fill: '#000000'}).setOrigin(0, 0.5).setDepth(3);

            const upgrade_damage_cost = scene.add.text(this.x + 48, this.y - 32, `$${this.damageUpgradeCost}`, {fill: '#000000'}).setOrigin(0.5).setDepth(3);
            const upgrade_attackSpeed_cost = scene.add.text(this.x + 48, this.y, `$${this.attackSpeedUpgradeCost}`, {fill: '#000000'}).setOrigin(0.5).setDepth(3);
            const upgrade_range_cost = scene.add.text(this.x + 48, this.y + 32, `$${this.rangeUpgradeCost}`, {fill: '#000000'}).setOrigin(0.5).setDepth(3);

            popUpMenu.add(UpgradeMenu);
            popUpMenu.add(Upgrade_Damage);
            popUpMenu.add(Upgrade_AttackSpeed);
            popUpMenu.add(Upgrade_Range);
            popUpMenu.add(UpgradeMenu_Cancel);
            popUpMenu.add(upgrade_damage_text);
            popUpMenu.add(Upgrade_AttackSpeed);
            popUpMenu.add(upgrade_attackSpeed_text);
            popUpMenu.add(upgrade_range_text);
            popUpMenu.add(upgrade_damage_cost);
            popUpMenu.add(upgrade_attackSpeed_cost);
            popUpMenu.add(upgrade_range_cost);
            
            popUpMenu.setVisible(true);

            // Increase damage
            Upgrade_Damage.on('pointerdown', () => {
                if (this.damageUpgradeNum < this.maxDamageUpgradeNum && scene.displayManager.playerCurrencyManager.currentCurrency >= this.damageUpgradeCost) {
                    this.damage += this.damageUpgradeVal;
                    this.damageUpgradeNum += 1;
                    scene.add.image(this.x + 24 + (this.damageUpgradeNum * 8), this.y - 16, 'DamageIcon').setOrigin(0.5).setScale(0.7).setDepth(0);
                    scene.displayManager.playerCurrencyManager.currentCurrency -= this.damageUpgradeCost;
                    scene.events.emit('updateCurrencyDisplay', scene.displayManager.playerCurrencyManager.currentCurrency);
                }
                popUpMenu.setVisible(false);
            });

            // Increase speed
            Upgrade_AttackSpeed.on('pointerdown', () => {
                if (this.attackSpeedUpgradeNum < this.maxAttackSpeedUpgradeNum && scene.displayManager.playerCurrencyManager.currentCurrency >= this.attackSpeedUpgradeCost) {
                    this.speed -= this.attackSpeedUpgradeVal;
                    this.attackSpeedUpgradeNum += 1;
                    scene.add.image(this.x + 24 + (this.attackSpeedUpgradeNum * 8), this.y, 'AttackSpeedIcon').setOrigin(0.5).setScale(0.6).setDepth(0);
                    scene.displayManager.playerCurrencyManager.currentCurrency -= this.attackSpeedUpgradeCost;
                    scene.events.emit('updateCurrencyDisplay', scene.displayManager.playerCurrencyManager.currentCurrency);
                }
                popUpMenu.setVisible(false);
            });

            // Increase range
            Upgrade_Range.on('pointerdown', () => {
                if (this.rangeUpgradeNum < this.maxRangeUpgradeNum && scene.displayManager.playerCurrencyManager.currentCurrency >= this.rangeUpgradeCost) {
                    this.range += this.rangeUpgradeVal;
                    this.rangeUpgradeNum += 1;
                    scene.add.image(this.x + 24 + (this.rangeUpgradeNum * 8), this.y + 16, 'RangeIcon').setOrigin(0.5).setScale(0.6).setDepth(0);
                    scene.displayManager.playerCurrencyManager.currentCurrency -= this.rangeUpgradeCost;
                    scene.events.emit('updateCurrencyDisplay', scene.displayManager.playerCurrencyManager.currentCurrency);
                }
                popUpMenu.setVisible(false);
            });

            UpgradeMenu_Cancel.on('pointerdown', () => {
                popUpMenu.setVisible(false);
            });
        });
    }

    attack(zombies) {
        if (this.canAttack) {
            // attack delay
            this.canAttack = false;
            
            // find closest zombie
            const closestZombie = this.findClosetZombie(zombies);

            // create projectile
            if (closestZombie) {
                let projectile = new Projectile(this.scene, this.x, this.y, closestZombie.x, closestZombie.y, this.projectileTexture);
                projectile.fire(this.x, this.y, closestZombie.x, closestZombie.y);
                closestZombie.reduceHealth(5);

                // play audio
                this.audioManager.playTowerShootAudio(this.towerType);
                this.audioManager.playZombieHitAudio();
                
                // Apply burn damage to zombies
                if (closestZombie.zombieType == "walkerZombie") {
                    closestZombie.burnDamage += this.damage;
                }
                else if (closestZombie.zombieType == "runnerZombie") {
                    closestZombie.burnDamage += this.damage / 2;
                }
                else if (closestZombie.zombieType = "tankZombie") {
                    closestZombie.burnDamage += this.damage / 0.4;
                }
            }

            setTimeout(() => {
                this.canAttack = true;
            }, this.speed);
        }
    }
}