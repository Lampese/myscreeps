var harvester=require('harvester');
var Builder=require('builder');
var ak=require('spawners');
function clean_cor(){
    for(var name in Game.constructionSites)Game.constructionSites[name].remove();
}
function find_ext(roomname){
    const arr=Game.spawns[roomname].room.find(FIND_MY_STRUCTURES,{
        filter:{structureType:STRUCTURE_EXTENSION}
    });
    for(let name in arr)
        if(arr[name].store.getFreeCapacity("energy")!=0)
            return arr[name];
    const usc=Game.spawns[roomname].room.find(FIND_MY_STRUCTURES,{
        filter:{structureType:STRUCTURE_LINK}
    });
    for(let name in usc)
        if(usc[name].store.getFreeCapacity("energy")!=0)
            return usc[name];
    const thetower=Game.spawns[roomname].room.find(FIND_MY_STRUCTURES,{
            filter:{structureType:STRUCTURE_TOWER}
    });
    for(let name in thetower)
        if(thetower[name].store.getFreeCapacity("energy")!=0)
            return thetower[name];
    return "null";
}
module.exports.loop=function(){
    var r1rpt=find_ext("BuShe LLC");
    var r2rpt=find_ext("Spawn1");
    var need=Game.getObjectById(Game.spawns["BuShe LLC"].memory.r1need);
    var room2need=Game.getObjectById(Memory.r2need);
    var normal=0,attck=0,son=0,zbc=0,r2worker=0,r2son=0;
    const urbbr=Game.spawns["BuShe LLC"].room.find(FIND_HOSTILE_CREEPS);
    const curbbr=Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS);
    var towers=[];
    Memory.r1towers.forEach(val=>{
        towers.push(Game.getObjectById(val));
    });
    const ctowers=[];
    Memory.r2towers.forEach(val=>{
        ctowers.push(Game.getObjectById(val));
    });
    for(let aa in urbbr)
        for(let i=0;i<3;i++)
            towers[i].attack(urbbr[aa]);
    for(let aa in curbbr)
        for(let i=0;i<2;i++)
            ctowers[i].attack(curbbr[aa]);
    for(var name in Game.creeps){
        var creep=Game.creeps[name];
        var rts=creep.name.split("_");
        if(rts[1]=="normal"){
            normal++;
            harvester.normal(creep,need);
            //Builder.run(creep,need);
            //debug_harvest(creep);
        }
        else if(rts[1]=="son"){
            harvester.son_harvest(creep,need,r1rpt);
            son++;
        }
        else if(rts[1]=="room2worker"){
            r2worker++;
            harvester.normal(creep,room2need);
            //roleBuilder.run(creep,room2need);
        }
        else if(rts[1]=="r2son"){
            r2son++;
            harvester.son_harvest(creep,room2need,r2rpt);
        }
    }
    ak.room1(Game.spawns["BuShe LLC"],normal,attck,son,zbc);
    ak.room2(Game.spawns["Spawn1"],r2worker,r2son);
}