import './importAll.mjs'

export function loop() {
    const mySpawn = getObjectsByPrototype(StructureSpawn).find(spawn => spawn.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    if (!checkMinerNum(myCreeps)) {
        if (!verifyInProgress(myCreeps, mySpawn)) {
            generateMiner(mySpawn);
        }
    }
    let myMiners = getMiners(myCreeps);
    for (const miner of myMiners) {
        transferEnergy(miner, mySpawn);
    }
    if (checkMinerNum(myCreeps)) {
        if (!verifyInProgress(myCreeps, mySpawn)) {
            generateAttacker(mySpawn);
        }
    }
    let myAttackers = getAttackers(myCreeps);
    for (const attacker of myAttackers) {
        attackEnemies(attacker);
    }

}

//检查spawn中是否有正在生产的creep，有则返回true
function verifyInProgress(myCreeps, mySpawn) {
    for (const creep of myCreeps) {
        if (getRange(creep, mySpawn) === 0) {
            return true;
        }
    }
    return false;
}

// generate a miner with enough energy
function generateMiner(spawn) {
    console.log("Generating miner...");
    let generateResult = spawn.spawnCreep([CARRY, MOVE]);
    if (generateResult !== ERR_NOT_ENOUGH_ENERGY) {
        let miner = generateResult.object;
        miner.type = "MINER";
        return miner;
    }
}

// generate an attacker with enough energy
function generateAttacker(spawn) {
    console.log("Generating attacker...");
    let generateResult = spawn.spawnCreep([ATTACK, MOVE]);
    if (generateResult !== ERR_NOT_ENOUGH_ENERGY) {
        let attacker = generateResult.object;
        attacker.type = "ATTACKER";
        return attacker;
    }
}

// find the closest container with energy, transfer it to the spawn
function transferEnergy(creep, spawn) {
    let containers = getObjectsByPrototype(StructureContainer);
    let availableContainers = containers.filter(container => container.store[RESOURCE_ENERGY] > 0);
    let closestAvailableContainer = findClosestByPath(creep, availableContainers);
    if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
        if (creep.withdraw(closestAvailableContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestAvailableContainer);
        }
    } else {
        if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
}

function attackEnemies(creep) {
    let enemyCreeps = getObjectsByPrototype(Creep).filter(creep => !creep.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(spawn => !spawn.my);
    if (enemyCreeps.length === 0) {
        if (creep.attack(enemySpawn) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemySpawn);
        }
    } else {
        let closestEnemy = findClosestByPath(creep, enemyCreeps);
        if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestEnemy);
        }
    }
}

// check whether current miner number is full
function checkMinerNum(creepArray) {
    let minerArray = [];
    let targetMinerNum = 3
    creepArray.forEach(function (creep) {
        if (creep.hasOwnProperty("type") && creep.type === "MINER") {
            minerArray.push(creep);
        }
    })
    return minerArray.length === targetMinerNum;
}

// return the miner array
function getMiners(creepArray) {
    let minerArray = [];
    creepArray.forEach(function (creep) {
        if (creep.hasOwnProperty("type") && creep.type === "MINER") {
            minerArray.push(creep);
        }
    })
    return minerArray;
}

// return the attacker array
function getAttackers(creepArray) {
    let attackerArray = [];
    creepArray.forEach(function (creep) {
        if (creep.hasOwnProperty("type") && creep.type === "ATTACKER") {
            attackerArray.push(creep);
        }
    })
    return attackerArray;
}

