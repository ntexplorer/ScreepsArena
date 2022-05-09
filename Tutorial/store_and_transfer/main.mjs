import {constants, prototypes, utils} from '/game';

export function loop() {
    // Your code goes here
    let myCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    let enemyCreep = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => !creep.my)[0];
    let myTower = utils.getObjectsByPrototype(prototypes.StructureTower)[0];
    let container = utils.getObjectsByPrototype(prototypes.StructureContainer)[0];
    if (myTower.attack(enemyCreep) === constants.ERR_NOT_ENOUGH_ENERGY) {
        myCreeps.forEach(creep => transferEnergy(creep));
    }


    function transferEnergy(creep) {
        if (creep.store[constants.RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if (creep.withdraw(container, constants.RESOURCE_ENERGY) === constants.ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
        if (creep.transfer(myTower, constants.RESOURCE_ENERGY) === constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(myTower);
        }
    }
}