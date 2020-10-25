function room1(spawn,work,carry,wcarry){
    let ticker=parseInt(Math.random()*2000);
    if(work<1)spawn.spawnCreep([CARRY,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],`creep_work_${ticker}`);
    else if(carry<3)spawn.spawnCreep([CARRY,MOVE],`creep_carry_${ticker}`);
    else if(wcarry<1)spawn.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE],`creep_wcarry_${ticker}`);
    //else if(attacker<1&&(lson+son)>=2)spawn.spawnCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE],`creep_attack_${ticker}`);
}
function room2(spawn,normal,son,lson){
    let ticker=parseInt(Math.random()*2000);
    if(son<1)spawn.spawnCreep([CARRY,MOVE,WORK,MOVE],`creep_r2son_${ticker}`);
    else if(lson<1&&son>=1)spawn.spawnCreep([CARRY,MOVE,WORK,MOVE,MOVE,WORK,MOVE,WORK],`creep_r2lson_${ticker}`);
    else if(normal<4&&(lson+son)>=2)spawn.spawnCreep([CARRY,MOVE,WORK,MOVE,MOVE,WORK,MOVE,WORK],`creep_r2normal_${ticker}`);
}
exports.room1=room1;
exports.room2=room2;