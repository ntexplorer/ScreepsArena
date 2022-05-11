import './importAll.mjs'
import {ERR_NOT_IN_RANGE} from "game/constants";


let creep1, creep2, creep3, creep4;


export function loop() {
    let enemyCreeps = getObjectsByPrototype(Creep).filter(creep => !creep.my);
    const mySpawn = getObjectsByPrototype(StructureSpawn).find(spawn => spawn.my);
    const source = findClosestByPath(mySpawn, getObjectsByPrototype(Source));
    if (!creep1) {
        creep1 = mySpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE]).object;
        return;
    } else {
        harvestEnergy(creep1);
    }
    if (!creep2) {
        creep2 = mySpawn.spawnCreep([ATTACK, ATTACK, MOVE, MOVE]).object;
        return;
    } else {
        attackEnemy(creep2);
    }
    if (!creep3) {
        creep3 = mySpawn.spawnCreep([HEAL, MOVE]).object;
        return;
    } else {
        let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
        let myDamagedCreeps = myCreeps.filter(creep => creep.hits < creep.hitsMax);
        if (myDamagedCreeps.length === 0) {
            creep3.moveTo(creep2);
        } else {
            let healingTarget = creep3.findClosestByRange(myDamagedCreeps);
            if (creep3.heal(healingTarget) === ERR_NOT_IN_RANGE) {
                creep3.moveTo(healingTarget);
            }
        }
    }

    if (!creep4) {
        creep4 = mySpawn.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]).object;
    } else {
        rangeAttackEnemy(creep4);
    }

    function attackEnemy(creep) {
        let closestEnemy = findClosestByPath(creep, enemyCreeps);
        if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestEnemy);
        }
    }

    function rangeAttackEnemy(creep) {
        let closestEnemy = findClosestByPath(creep, enemyCreeps);
        if (creep.rangedAttack(closestEnemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestEnemy);
        }
    }

    function harvestEnergy(creep) {
        if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if (creep.transfer(mySpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(mySpawn);
            }
        }
    }
}