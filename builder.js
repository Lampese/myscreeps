function run(creep,need,vars){
    var fft=creep.store.getFreeCapacity();
    var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
    if(fft==vars&&creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need,{reusePath:0});
    else if(creep.build(targets[0],RESOURCE_ENERGY)!=ERR_NOT_IN_RANGE&&fft!=vars){}
    else if(creep.build(targets[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&fft==0)creep.moveTo(targets[0],{reusePath:0});
    else if(creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need,{reusePath:0});
}
exports.run=run;