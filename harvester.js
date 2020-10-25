function wcnormal(creep,need,vars,to){
    var hit=creep.withdraw(need,RESOURCE_ENERGY);
    var urpt=to;
    //creep.room.controller
    var fft=creep.store.getFreeCapacity();
    if(fft==vars&&hit==ERR_NOT_IN_RANGE)creep.moveTo(need);
    else if(creep.transfer(urpt,RESOURCE_ENERGY)!=ERR_NOT_IN_RANGE&&fft!=vars){}
    else if(creep.transfer(urpt,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&fft==0)creep.moveTo(urpt);
    else if(hit==ERR_NOT_IN_RANGE)creep.moveTo(need);
}
function normal(creep,need,vars,to){
    var hit=creep.harvest(need);
    var urpt=to;
    //creep.room.controller
    var fft=creep.store.getFreeCapacity();
    if(fft==vars&&hit==ERR_NOT_IN_RANGE)creep.moveTo(need);
    else if(creep.transfer(urpt,RESOURCE_ENERGY)!=ERR_NOT_IN_RANGE&&fft!=vars){}
    else if(creep.transfer(urpt,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&fft==0)creep.moveTo(urpt);
    else if(hit==ERR_NOT_IN_RANGE)creep.moveTo(need);
}
function son_harvest(creep,need,rpt){
    if(rpt=="null")creep.moveTo(25,25);
    else{
        var gft=creep.store.getFreeCapacity();
        if(gft>0&&creep.harvest(need)==ERR_NOT_IN_RANGE)creep.moveTo(need);
        else if(creep.transfer(rpt,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&gft==0)creep.moveTo(rpt);
    }
}
function carry(creep,need,rpt){
    var gft=creep.store.getFreeCapacity();
    if(gft>0&&creep.withdraw(need,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)creep.moveTo(need);
    else if(creep.transfer(rpt,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE&&gft==0)creep.moveTo(rpt);
}
exports.normal=normal;
exports.son_harvest=son_harvest;
exports.carry=carry;
exports.wcarry=wcnormal;