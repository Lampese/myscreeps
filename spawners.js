function room1(spawn,normal,attck,son){
    let ticker=parseInt(Math.random()*2000);
    if(son<4)spawn.spawnCreep([CARRY,MOVE,MOVE,WORK],`creep_son_${ticker}`);
    else if(normal<6&&son>=3)spawn.spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE,WORK],`creep_normal_${ticker}`);
}
function room2(spawn,worker,son){
    let ticker=parseInt(Math.random()*2000);
    if(son<4)spawn.spawnCreep([CARRY,MOVE,MOVE,WORK],`creep_r2son_${ticker}`);
    if(worker<6&&son>=3)spawn.spawnCreep([CARRY,MOVE,MOVE,WORK,WORK,MOVE],`creep_room2worker_${ticker}`);
}
exports.room1=room1;
exports.room2=room2;