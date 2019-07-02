const roomConfig = require('./../create_room_config.json');
console.log('房间配置=>' , roomConfig);
const Seat = function () {
    let that = {};
    //初始化玩家座位号
    that.getIndex = function (playerList) {
        let index = 0;
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            if (player.seatIndex === index) {
                index++;
            }else{
                return index;
            }
        }
        return index;
    };

    return that;
}
const Room = function (roomId,data) {
    let that = {};
    let _roomId = roomId;
    let _playerList = [];
    let _seatController = Seat();
    
    console.log("creatRomm ",roomId," Room data=>" , data);
    let _turnCount = roomConfig.turn_count[data.turnCount].turn_count;
    let _needHouseCardCount = roomConfig.turn_count[data.turnCount].need_house_card_count;
    let _normalBomb = roomConfig.special_rule[data.specialRule].normal_bomb;
    let _kingBomb = roomConfig.special_rule[data.specialRule].king_bomb;
    let _roomManager = undefined;

    that.joinPlayer = function (player, cb) {
        data.roomId = _roomId;
        cb ? cb(null,{data : data, room : that}) : null;
        if(_playerList.length === 0){
            _roomManager = player;
        }
        _playerList.push(player);
        let index = _seatController.getIndex(_playerList);
        player.seatIndex = index;
    };

    that.playerGameSceneLoadEnd = function (player,callBackIndex) {
        let playerData = [];
        for (let i =0; i < _playerList.length; i++) {
            playerData.push({
                nickName : _playerList[i].nickName,
                seatIndex: _playerList[i].seatIndex,
                avatarUrl : _playerList[i].avatarUrl
            })
        }

        player.sendSyncData({
            seatIndex : player.seatIndex,
            playerData : playerData
        },callBackIndex)
    };

    that.playerOffLine = function (player) {
        for (let i = 0; i < _playerList.length; i++) {
            if (_playerList[i].uid === player.uid) {
                _playerList.splice(i,1);
            }
        }
    };

    Object.defineProperty(that, 'roomId', {
        get : function () {
            return roomId;
        }
    });

    Object.defineProperty(that, 'players', {
        get : function () {
            return _playerList;
        }
    })


    return that;
}

module.exports = Room;