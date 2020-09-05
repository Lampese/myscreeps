var roleBuilder={
    run:function(creep,need){
        var fft=creep.store.getFreeCapacity();
        var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
        if(fft==50&&creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need);
        else if(creep.build(targets[0],RESOURCE_ENERGY)!=ERR_NOT_IN_RANGE&&fft!=50){}
        else if(creep.build(targets[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&fft==0)creep.moveTo(targets[0]);
        else if(creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need);
    }
};
module.exports=roleBuilder;