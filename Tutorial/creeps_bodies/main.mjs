import {getObjectsByPrototype} from 'game/utils';
import {Creep} from 'game/prototypes';
import {ATTACK, ERR_NOT_IN_RANGE, HEAL, RANGED_ATTACK} from 'game/constants';

export function loop() {
    // Your code goes here
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    var enemyCreep = getObjectsByPrototype(Creep).filter(creep => !creep.my)[0];
    myCreeps.forEach(creep => creepMovement(creep));

    function creepMovement(creep) {
        if (creep.body.some(bodyPart => bodyPart.type === ATTACK)) {
            if (creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreep);
            }
        } else if (creep.body.some(bodyPart => bodyPart.type === RANGED_ATTACK)) {
            if (creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreep);
            }
        } else if (creep.body.some(bodyPart => bodyPart.type === HEAL)) {
            let myDamagedCreeps = myCreeps.filter(creep => creep.hits < creep.hitsMax);
            let target = creep.findClosestByRange(myDamagedCreeps);
            if (creep.heal(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}