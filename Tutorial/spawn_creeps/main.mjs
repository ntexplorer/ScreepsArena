import {constants, prototypes, utils} from '/game';

let creep1, creep2;

export function loop() {
    let mySpawn = utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
    let flags = utils.getObjectsByPrototype(prototypes.Flag);

    if (!creep1) {
        creep1 = mySpawn.spawnCreep([constants.MOVE]).object;
        return;
    } else {
        creep1.moveTo(flags[0]);
    }
    if (!creep2) {
        creep2 = mySpawn.spawnCreep([constants.MOVE]).object;
    } else {
        creep2.moveTo(flags[1]);
    }
}