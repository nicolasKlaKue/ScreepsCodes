var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //Wenn die Energy des Creeps kleiner ist als die Kapazität des Creeps und das Creep nicht im Supplymode ist:
        if(creep.carry.energy < creep.carryCapacity && !creep.memory.supplyMode) {
            //scanne den "Room" nach allen Energiequellen
            var sources = creep.room.find(FIND_SOURCES);
            //Versuche die Energiequelle abzubauen, wenn das nicht klappt:
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                //fahre zu quelle
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                //setze das creep in den Supplymode
                creep.memory.supplyMode = true;
            }
        //Wenn das Creep Energie hat und im Supplymode ist:
        } else {
            //schreibe alle Strukturen die keine volle Energie haben in die Variable "targets"
            //"FIND_STRUCTURES" ist eine "Liste" in der ALLE Strukturen des Raumes enthalten sind
            var targets = creep.room.find(FIND_STRUCTURES, {
                /*  filter über "FIND_STRUCTURES" in dem du jedes Element der Liste in der Variablen
                *   "structure" speicherst, danach überprüfst ob der StrukturTyp des Elementes
                *   STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_TOWER oder STRUCTURE_CONTAINER
                *   entspricht und ob dieses Element keine volle Energie hat.
                *   ist das der fall füge dieses Element in eine neue Liste hinzu, und schreibe diese neue
                *   Liste in die Variable "targets".
                */
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER || 
                        structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                }
            });
            //Wenn das Creep Energy hat und es Ziele mit nicht voller Energie gibt:
            if(creep.carry.energy > 0 && targets.length > 0){
                //Versuche dem ersten Element in der Targets-"Liste"(Liste heißt eigentlich Array) energie zu transferieren
                //Wenn das nicht geht, fahre in richtung des Zieles
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff00ff'}});
                }
            //Falls das Creep keine Energie mehr hat, oder es keine Ziele mehr mit nicht voller Energie gibt:
            }else{
                //Setzte in der Memory des Creeps die Variable SupplyMode auf "false", 
                // wodurch das Creep wieder den oberen Teil des Codes ausführt.
                creep.memory.supplyMode = false;
            }
        }
    }
};

module.exports = roleHarvester;