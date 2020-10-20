var harvester=require('harvester');
var Builder=require('builder');
var spawner=require('spawners');
var attckeer=require("attcker");
var roomset=require("roomset");
var gui=require("Visualizer");
require("moveit");
module.exports.loop=function(){
    gui.Visualizer.visuals();
    //-g vars
    var attckum="E8S32",clamum="E5S37";
    //Room1 vars
    var r1creep=Game.spawns["Lampese"].room.find(FIND_HOSTILE_CREEPS);
    const r1exts=Game.spawns["Lampese"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_EXTENSION}});
    const r1usc=Game.spawns["Lampese"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_LINK}});
    var r1thetower=[];
    Memory.r1tower.forEach(val=>{
        r1thetower.push(Game.getObjectById(val));
    });
    var normal=0,son=0,lson=0,yjer=0,attacker=0;
    var r1rpt=roomset.find_ext(r1exts,r1usc,r1thetower,Game.spawns["Lampese"]);
    var r1need=Game.getObjectById(Memory.r1need);
    for(let i in r1creep)
        for(let j in r1thetower)
            r1thetower[j].attack(r1creep[i]);
    //Room2 vars
    var r2creep=Game.spawns["Lampese_1"].room.find(FIND_HOSTILE_CREEPS);
    const r2exts=Game.spawns["Lampese_1"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_EXTENSION}});
    const r2usc=Game.spawns["Lampese_1"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_LINK}});
    var r2thetower=Game.spawns["Lampese_1"].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_TOWER}});
    var r2rpt=roomset.find_ext(r2exts,r2usc,r2thetower,Game.spawns["Lampese_1"]);
    var r2hneed=Game.getObjectById(Memory.r2hneed),r2sonneed=Game.getObjectById(Memory.r2sonneed);
    var r2worker=0,r2son=0;
    for(let i in r2creep)
        for(let j in r2thetower)
            r2thetower[j].attack(r2creep[i]);
    //Creeps
    for(var name in Game.creeps){
        var creep=Game.creeps[name],rts=creep.name.split("_");
        if(rts[1]=="normal"){
            ++normal;
            harvester.normal(creep,r1need,100);
            //Builder.run(creep,r1need);
        }
        else if(rts[1]=="son"){
            harvester.son_harvest(creep,r1need,r1rpt);
            ++son;
        }
        else if(rts[1]=="lson"){
            ++lson;
            harvester.son_harvest(creep,r1need,r1rpt);
        }
        else if(rts[1]=="clam"){
            if(creep.room.name!=clamum)creep.moveTo(new RoomPosition(25,20,clamum));
            else if(creep.claimController(creep.room.controller)==ERR_NOT_IN_RANGE)creep.moveTo(creep.room.controller);
        }
        else if(rts[1]=="r2normal"){
            ++r2worker;
            harvester.normal(creep,r2hneed,50);
        }
        else if(rts[1]=="r2son"){
            ++r2son;
            harvester.son_harvest(creep,r2sonneed,r2rpt);
            //Builder.run(creep,r2sonneed,50);
        }
        else if(rts[1]=="yjer"){
            ++yjer;
            //harvester.normal(creep,r2hneed,100);
            Builder.run(creep,r2sonneed,100);
        }
    }
    //Spawns
    spawner.room1(Game.spawns["Lampese"],normal,son,lson,yjer,attacker);
    spawner.room2(Game.spawns["Lampese_1"],r2worker,r2son);
}