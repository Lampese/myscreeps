var harvester=require('harvester');
var Builder=require('builder');
var spawner=require('spawners');
var attckeer=require("attcker");
var roomset=require("roomset");
var gui=require("Visualizer");
require("move");
module.exports.loop=function(){
    gui.Visualizer.visuals();
    //-g vars
    //E1S32 E4S29 E5S32
    var attckum="E8S32",clamum="E5S37";
    //Room1 vars
    var r1creep=Game.spawns["Lampese"].room.find(FIND_HOSTILE_CREEPS);
    const r1exts=Game.spawns["Lampese"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_EXTENSION}});
    var r1con=Game.spawns["Lampese"].room.find(FIND_STRUCTURES,{
        filter:(i)=>i.structureType==STRUCTURE_CONTAINER&&i.hits<i.hitsMax
    });
    var r1cons=Game.spawns["Lampese"].room.find(FIND_STRUCTURES,{
        filter:(i)=>i.structureType==STRUCTURE_CONTAINER
    });
    var r1walls=Game.spawns["Lampese"].room.find(FIND_STRUCTURES,{
        filter:(i)=>i.structureType==STRUCTURE_WALL&&i.hits<50000
    });
    const r1usc=Game.spawns["Lampese"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_LINK}});
    var needcon=r1con;
    var r1thetower=[];
    Memory.r1tower.forEach(val=>{
        r1thetower.push(Game.getObjectById(val));
    });
    var work=0,carryer=0,wcarry=0;
    var r1rpt=roomset.find_ext(r1exts,r1usc,r1thetower,Game.spawns["Lampese"]);
    var r1need=Game.getObjectById(Memory.r1need);
    for(let i in r1creep)
        for(let j in r1thetower)
            r1thetower[j].attack(r1creep[i]);
    for(let i in needcon)
        for(let j in r1thetower)
            r1thetower[j].repair(r1con[i]);
    for(let i in r1walls)
        for(let j in r1thetower)
            r1thetower[j].repair(r1walls[i]);
    //Creeps
    for(var name in Game.creeps){
        var creep=Game.creeps[name],rts=creep.name.split("_");
        if(rts[1]=="work"){
            ++work;
            harvester.normal(creep,r1need,50,r1cons[0]);
            //Builder.run(creep,r1need,100);
        }
        else if(rts[1]=="carry"){
            ++carryer;
            harvester.carry(creep,r1cons[0],r1rpt);
        }
        else if(rts[1]=="wcarry"){
            ++wcarry;
            harvester.wcarry(creep,r1cons[0],100,creep.room.controller);
            //harvester.wcarry(creep,r1cons[0],100,Game.getObjectById(Memory.r1te));
            //Builder.w(creep,r1cons[0],100);
        }
        else if(rts[1]=="clam"){
            if(creep.room.name!=clamum)creep.moveTo(new RoomPosition(25,20,clamum));
            else if(creep.claimController(creep.room.controller)==ERR_NOT_IN_RANGE)creep.moveTo(creep.room.controller);
        }
    }
    //Spawns
    spawner.room1(Game.spawns["Lampese"],work,carryer,wcarry);
}