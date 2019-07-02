const gameController = require('./game-controller');
const defines = require('./../defines');
const Player = function (socket , data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;
    // let _callBackIndex = data.callBackIndex;

    let _room = undefined;
    let _seatIndex = 0;

    const notify = function (msg, index, data) {
        _socket.emit('notify',{msg : msg, callBackIndex : index, data : data});    
    };

    _socket.on('disconnect', function () {
        console.log('玩家掉线');
        if(_room){

        }
    })

    notify('login',data.callBackIndex, {
        uid : _uid,
        nickName : _nickName,
        avatarUrl : _avatarUrl,
        houseCardCount : _houseCardCount
    });
    
    _socket.on('notify', function (res) {
        let msg = res.msg;
        let callBackIndex = res.callBackIndex;
        let data = res.data;
        console.log("data=",data);
        switch (msg) {
            case 'create_room':
                console.log("创建房间");
                gameController.createRoom(data, function (err,res) {
                    if(err){
                        console.log('sever creatRoom err = ',err);
                    }else {
                        notify('create_room',callBackIndex,{roomId : res});
                    }
                })
                // notify(msg,callBackIndex,'create room success');
                break;
            case 'join_room':
                gameController.joinRoom(data.roomId,that,function (err,res) {
                    let roomInfo = {};
                    console.log('join room data ' , res);
                    if(err){
                        console.log('sever joinRoom err==> ' ,err);
                    }else{
                        roomInfo = res.data;
                        _room = res.room;
                    }
                    console.log('roomInfo => ' ,roomInfo);
                    notify('join_room',callBackIndex,{err : err , data : roomInfo});
                })
                break;
            default:
                break;
        }
    });

    that.sendSyncData = function (data, callBackIndex) {
        console.log('data = ', JSON.stringify(data));
        notify('syncData',callBackIndex,data);
    };

    const setDefineProperty = function (property, type, value) {
        switch (type) {
            case defines.get:
                Object.defineProperty(that, property, {
                    get : function () {
                        return value;
                    }
                })
                break;
            case defines.set:
                Object.defineProperty(that, property, {
                    set : function (val) {
                        value = val;
                    }
                })
                break;
            case defines.both:
                Object.defineProperty(that, property, {
                    get : function () {
                        return value;
                    },
                    set : function (val) {
                        value = val;
                    }
                });
                break;
            default:
                break;
        }
    };

    setDefineProperty('seatIndex',defines.both, _seatIndex);
    setDefineProperty('nickName',defines.get, _nickName);
    setDefineProperty('avatarUrl',defines.get, _avatarUrl);
    setDefineProperty('uid',defines.get, _uid);
    
    return that;
};

let _playerList = [];

exports.createPlayer = function (socket, data) {
    let player = Player(socket,data);
    _playerList.push(player);
}