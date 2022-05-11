import './importAll.mjs'

export function loop() {
    const creep = getObjectsByPrototype(Creep).find(creep => creep.my);

    if (!creep.store[RESOURCE_ENERGY]) {
        const container = findClosestByPath(creep, getObjectsByPrototype(StructureContainer));
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    } else {
        const constructionSite = getObjectsByPrototype(ConstructionSite).find(tower => tower.my);
        if (!constructionSite) {
            createConstructionSite(50, 55, StructureTower);
        } else {
            if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite);
            }
        }
    }

}