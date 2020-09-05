function Rmove(creep,target){
    creep.moveTo(target);
}
function normal(creep,need){
    var hit=creep.harvest(need);
    var urpt=creep.room.controller;
    var fft=creep.store.getFreeCapacity();
    if(fft==50&&hit==ERR_NOT_IN_RANGE)Rmove(creep,need);
    else if(creep.transfer(urpt,RESOURCE_ENERGY)!=ERR_NOT_IN_RANGE&&fft!=50){}
    else if(creep.transfer(urpt,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&fft==0)Rmove(creep,urpt);
    else if(hit==ERR_NOT_IN_RANGE)Rmove(creep,need);
}
function son_harvest(creep,need,rpt){
    if(rpt=="null")creep.moveTo(7,10);
    else{
        var gft=creep.store.getFreeCapacity();
        if(gft>0&&creep.harvest(need)==ERR_NOT_IN_RANGE)Rmove(creep,need);
        else if(creep.transfer(rpt,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&gft==0)Rmove(creep,rpt);
    }
}
exports.normal=normal;
exports.son_harvest=son_harvest;
/*var roleHarvester={ else if(creep.harvest(need)==ERR_NOT_IN_RANGE)Rmove(creep,need);
    run:function(creep){
        creep.say(creep.store.getUsedCapacity());
        if(creep.store.getFreeCapacity()==50){
            var sources=creep.room.find(FIND_SOURCES),need;
            need=sources[1].pos.x==41?sources[0]:sources[1];
            if(creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need);
        }
        else if(creep.transfer(creep.room.controller,RESOURCE_ENERGY)!=ERR_NOT_IN_RANGE&&creep.store.getFreeCapacity()!=50){
        }
        else if(creep.transfer(creep.room.controller,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&creep.store.getFreeCapacity()==0)creep.moveTo(creep.room.controller);
        else{
            var sources=creep.room.find(FIND_SOURCES),need;
            need=sources[1].pos.x==41?sources[0]:sources[1];
            if(creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need);
        }
    }
};
module.exports=roleHarvester;*/