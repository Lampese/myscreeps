function clean_cor(){for(var name in Game.constructionSites)Game.constructionSites[name].remove();}
function find_ext(roomname){
    const arr=Game.spawns[roomname].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_EXTENSION}});
    for(let name in arr)
        if(arr[name].store.getFreeCapacity("energy")!=0)
            return arr[name];
    const usc=Game.spawns[roomname].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_LINK}});
    for(let name in usc)
        if(usc[name].store.getFreeCapacity("energy")!=0)
            return usc[name];
    const thetower=Game.spawns[roomname].room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_TOWER}});
    for(let name in thetower)
        if(thetower[name].store.getFreeCapacity("energy")!=0)
            return thetower[name];
    return "null";
}
exports.find_ext=find_ext;
exports.clean_cor=clean_cor;