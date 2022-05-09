import {constants, prototypes, utils} from '/game';

export function loop() {
    // Your code goes here
    let myCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    let mySpawn = utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
    let source = utils.getObjectsByPrototype(prototypes.Source)[0];
    harvestEnergy(myCreeps[0]);


    function harvestEnergy(creep) {
        if (creep.store[constants.RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if (creep.harvest(source) === constants.ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if (creep.transfer(mySpawn, constants.RESOURCE_ENERGY) === constants.ERR_NOT_IN_RANGE) {
                creep.moveTo(mySpawn);
            }
        }
    }
}