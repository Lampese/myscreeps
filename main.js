var harvester=require('harvester');
var Builder=require('builder');
var spawner=require('spawners');
var attckeer=require("attcker");
var roomset=require("roomset");
module.exports.loop=function(){
    var r1ext=[],r2ext=[];
    Memory.r1exts.forEach(val=>{r1ext.push(Game.getObjectById(val));});
    Memory.r2exts.forEach(val=>{r2ext.push(Game.getObjectById(val));});
    var r1rpt=roomset.find_ext("BuShe LLC",r1ext),r2rpt=roomset.find_ext("Spawn1",r2ext),need=Game.getObjectById(Game.spawns["BuShe LLC"].memory.r1need),room2need=Game.getObjectById(Memory.r2need);
    var normal=0,attck=0,son=0,r2worker=0,r2son=0,towers=[],ctowers=[],attckum="W8N4";
    const urbbr=Game.spawns["BuShe LLC"].room.find(FIND_HOSTILE_CREEPS);
    const curbbr=Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS);
    Memory.r1towers.forEach(val=>{towers.push(Game.getObjectById(val));});
    Memory.r2towers.forEach(val=>{ctowers.push(Game.getObjectById(val));});
    for(let r in urbbr)for(let i=0;i<3;i++)towers[i].attack(urbbr[r]);
    for(let r in curbbr)for(let i=0;i<3;i++)ctowers[i].attack(curbbr[r]);
    for(var name in Game.creeps){
        var creep=Game.creeps[name],rts=creep.name.split("_");
        if(rts[1]=="normal"){
            ++normal;
            harvester.normal(creep,need);
            //Builder.run(creep,need);
        }
        else if(rts[1]=="son"){
            harvester.son_harvest(creep,need,r1rpt);
            ++son;
        }
        else if(rts[1]=="room2worker"){
            ++r2worker;
            harvester.normal(creep,room2need);
            //Builder.run(creep,room2need);
        }
        else if(rts[1]=="r2son"){
            ++r2son;
            harvester.son_harvest(creep,room2need,r2rpt);
        }
        else if(rts[1]=="attck"){
            attck++;
            attckeer.Go(creep,attckum);
        }
    }
    spawner.room1(Game.spawns["BuShe LLC"],normal,attck,son);
    spawner.room2(Game.spawns["Spawn1"],r2worker,r2son);
}
//Game.spawns["BuShe LLC"].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],`creep_attck_test1`);