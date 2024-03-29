import SniperTower from "../../objects/towers/SniperTower.js"
import MissileTower from "../../objects/towers/MissileTower.js"
import FlamethrowerTower from "../../objects/towers/FlamethrowerTower.js"

export function createHotSpot(object, scene, displayManager, audioManager) {

    const tower = scene.add.sprite(object.x, object.y, 'hotspot').setOrigin(0.5);

    tower.setInteractive({cursor: 'pointer'});
    tower.on('pointerdown', () => {
        const popUpMenu = scene.add.group();
        scene.towerMenuGroup.push(popUpMenu);
        
        if (scene.towerMenuGroup) {
            scene.towerMenuGroup.forEach(group => {
                group.setVisible(false);
            });
        }
        popUpMenu.setVisible(false);

        // Store tower menu coordinates
        let towerMenuX = object.x;
        let towerMenuY = object.y;

        // Adjust tower menu coordinates based on object position on screen so that it doesn't go off screen but do not move object
        if (object.x < 100) {
            towerMenuX = 125;
        }
        else if (object.x > 700) {
            towerMenuX = 700;
        }
        if (object.y < 100) {
            towerMenuY = 100;
        }
        else if (object.y > 500) {
            towerMenuY = 500;
        }

        //Tower Menu
        const TowerMenu = scene.add.image(towerMenuX, towerMenuY, 'TowerMenu').setOrigin(0.5).setAlpha(0.7).setDepth(4);
        const TowerMenu_Sniper = scene.add.image(towerMenuX - 112, towerMenuY - 40, 'TowerMenu_Sniper').setOrigin(0).setInteractive({cursor: 'pointer'}).setAlpha(0.7).setDepth(4);
        const TowerMenu_Missile = scene.add.image(towerMenuX- 48, towerMenuY - 40, 'TowerMenu_Missile').setOrigin(0).setInteractive({cursor: 'pointer'}).setAlpha(0.7).setDepth(4);
        const TowerMenu_Flamethrower = scene.add.image(towerMenuX + 16, towerMenuY - 40, 'TowerMenu_Flamethrower').setOrigin(0).setInteractive({cursor: 'pointer'}).setAlpha(0.7).setDepth(4);
        const TowerMenu_Cancel = scene.add.image(towerMenuX + 80, towerMenuY - 16, 'TowerMenu_Cancel').setOrigin(0).setInteractive({cursor: 'pointer'}).setAlpha(0.7).setDepth(4);
        const Sniper_Cost = scene.add.text(towerMenuX - 88, towerMenuY + 24, '100', {fill: '#000000'}).setOrigin(0.5, 0.5).setDepth(4);
        const Missile_Cost = scene.add.text(towerMenuX - 24, towerMenuY + 24, '200', {fill: '#000000'}).setOrigin(0.5, 0.5).setDepth(4);
        const Flamethrower_Cost = scene.add.text(towerMenuX + 40, towerMenuY + 24, '125', {fill: '#000000'}).setOrigin(0.5, 0.5).setDepth(4);

        popUpMenu.add(TowerMenu);
        popUpMenu.add(TowerMenu_Sniper);
        popUpMenu.add(TowerMenu_Missile);
        popUpMenu.add(TowerMenu_Flamethrower);
        popUpMenu.add(TowerMenu_Cancel);
        popUpMenu.add(Sniper_Cost);
        popUpMenu.add(Missile_Cost);
        popUpMenu.add(Flamethrower_Cost);

        popUpMenu.setVisible(true);

        //Sniper Tower
        TowerMenu_Sniper.on('pointerdown', () => {
            if (displayManager.playerCurrencyManager.currentCurrency >= 100) {
                tower.destroy();
                const towerBase = scene.add.sprite(object.x, object.y, 'tower_base').setOrigin(0.5);
                towerBase.setScale(0.15);
                const sniperTower = new SniperTower(scene, object.x, object.y, audioManager).setDepth(1);
                scene.add.existing(sniperTower);
                scene.towers.add(sniperTower);
                sniperTower.setScale(0.15);
                displayManager.playerCurrencyManager.reduceCurrency(100);
            }
            else {
                tower.setVisible(true);
            }
            popUpMenu.setVisible(false);
        });

        //Missile Tower
        TowerMenu_Missile.on('pointerdown', () => {
            if (displayManager.playerCurrencyManager.currentCurrency >= 200) {
                tower.destroy();
                const towerBase = scene.add.sprite(object.x, object.y, 'tower_base');
                towerBase.setScale(0.15);
                const missileTower = new MissileTower(scene, object.x, object.y, audioManager).setDepth(1);
                scene.add.existing(missileTower);
                scene.towers.add(missileTower);
                missileTower.setScale(0.15);
                displayManager.playerCurrencyManager.reduceCurrency(200);
            }
            else {
                tower.setVisible(true);
            }
            popUpMenu.setVisible(false);
        });

        //Flamethrower Tower
        TowerMenu_Flamethrower.on('pointerdown', () => {
            if (displayManager.playerCurrencyManager.currentCurrency >= 125) {
                tower.destroy();
                const towerBase = scene.add.sprite(object.x, object.y, 'tower_base');
                towerBase.setScale(0.15);
                const flamethrowerTower = new FlamethrowerTower(scene, object.x, object.y, audioManager).setDepth(1);
                scene.add.existing(flamethrowerTower);
                scene.towers.add(flamethrowerTower);
                flamethrowerTower.setScale(0.2);
                displayManager.playerCurrencyManager.reduceCurrency(125);
            }
            else {
                tower.setVisible(true);
            }
            popUpMenu.setVisible(false);
        });

        TowerMenu_Cancel.on('pointerdown', () => {
            popUpMenu.setVisible(false);
            tower.setVisible(true);
        });

    });
}