import {prototypes, utils} from '/game';

export function loop() {
    let creeps = utils.getObjectsByPrototype(prototypes.Creep);
    let flags = utils.getObjectsByPrototype(prototypes.Flag);
    creeps.forEach(creep => moveToFlag(creep));

    function moveToFlag(creep) {
        let closestFlag = creep.findClosestByPath(flags);
        creep.moveTo(closestFlag);
    }
}