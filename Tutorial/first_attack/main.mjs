import {getObjectsByPrototype} from 'game/utils';
import {Creep} from 'game/prototypes';
import {ERR_NOT_IN_RANGE} from 'game/constants';

export function loop() {
    // Your code goes here
    var myCreep = getObjectsByPrototype(Creep).filter(creep => creep.my)[0];
    var enemyCreep = getObjectsByPrototype(Creep).filter(creep => !creep.my)[0];
    if (myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
        myCreep.moveTo(enemyCreep);
    }
}