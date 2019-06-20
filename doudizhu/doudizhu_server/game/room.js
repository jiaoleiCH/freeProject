
const Room = function (roomId,data) {
    let that = {};
    that.roomId = roomId;
    
    let roomList = [];
    console.log("creatRomm ",roomId," Room data=>" , data);

    that.joinPlayer = function (player, cb) {
        roomList.push(player);
        cb ? cb(null,{data : data, room : that}) : null;
    }

    Object.defineProperty(that, 'roomId', {
        get : function () {
            return roomId;
        }
    })


    return that;
}

module.exports = Room;