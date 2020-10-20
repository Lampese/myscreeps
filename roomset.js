function clean_cor(){for(var name in Game.constructionSites)Game.constructionSites[name].remove();}
function find_ext(exts,usc,thetower,spawn){
    for(let name in exts)
        if(exts[name].store.getFreeCapacity("energy")!=0)
            return exts[name];
    for(let name in usc)
        if(usc[name].store.getFreeCapacity("energy")!=0)
            return usc[name];
    for(let name in thetower)
        if(thetower[name].store.getFreeCapacity("energy")!=0)
            return thetower[name];
    if(spawn.store.getFreeCapacity(RESOURCE_ENERGY)!=0)
        return spawn;
    return "null";
}
exports.find_ext=find_ext;
exports.clean_cor=clean_cor;