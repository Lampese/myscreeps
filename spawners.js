function room1(spawn,normal,son,lson,yjer,attacker,ap){
    let ticker=parseInt(Math.random()*2000);
    if(son<1)spawn.spawnCreep([CARRY,MOVE,MOVE,WORK],`creep_son_${ticker}`);
    else if(lson<1&&son>=1)spawn.spawnCreep([CARRY,MOVE,MOVE,WORK,MOVE,WORK,WORK,MOVE],`creep_lson_${ticker}`);
    else if(normal<3&&(lson+son)>=2)spawn.spawnCreep([CARRY,CARRY,MOVE,MOVE,WORK,MOVE,WORK,WORK,MOVE,WORK,MOVE,MOVE],`creep_normal_${ticker}`);
    else if(yjer<2&&(lson+son)>=2)spawn.spawnCreep([CARRY,CARRY,MOVE,MOVE,WORK,MOVE,WORK,WORK,MOVE,WORK,MOVE,MOVE],`creep_yjer_${ticker}`);
    //else if(attacker<1&&(lson+son)>=2)spawn.spawnCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE],`creep_attack_${ticker}`);
}
function room2(spawn,normal,son,ap){
    let ticker=parseInt(Math.random()*2000);
    if(son<2)spawn.spawnCreep([CARRY,MOVE,WORK,MOVE],`creep_r2son_${ticker}`);
    else if(normal<4)spawn.spawnCreep([CARRY,MOVE,WORK,MOVE,MOVE,WORK],`creep_r2normal_${ticker}`);
}
exports.room1=room1;
exports.room2=room2;