function attcker_go(creep,where){
     if(creep.room.name!=where){creep.moveTo(new RoomPosition(25,20,where));
     else{
        const target=creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(creep.rangedAttack(target)==ERR_NOT_IN_RANGE&&target)creep.moveTo(target,{reusePath:0});
     }
}
exports.Go=attcker_go;
