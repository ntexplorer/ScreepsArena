import './importAll.mjs'

export function loop() {
    // Your code goes here
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    let mySpawn = getObjectsByPrototype(StructureSpawn)[0];
    let source = getObjectsByPrototype(Source)[0];
    harvestEnergy(myCreeps[0]);


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