const Room = require('./room');
let roomList = [];
exports.createRoom = function (data,cb) {
    console.log('game-controller createRoom data => ' ,data);
    let roomId = '';
    for (let i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10);
    }
    console.log("roomId => " ,roomId);

    let room = Room(roomId,data);
    roomList.push(room);
    cb ? cb(null,roomId) : null;
};

exports.joinRoom = function (roomId, player, cb) {
    console.log("roomList " ,roomList);
    for (let i = 0; i < roomList.length; i++) {
        let room = roomList[i];
        console.log("roomId = ", roomId, "  roomListId " ,room.roomId);
        if(roomId === room.roomId){
            if(room.players.length >= 3){
                cb ? cb('此房间满员') : null;
            }else{
                room.joinPlayer(player,cb);
            }
            return;
        }
    }

    cb ? cb('没有此房间') : null;
}