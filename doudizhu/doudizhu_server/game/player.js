const gameController = require('./game-controller');
const Player = function (socket , data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;
    // let _callBackIndex = data.callBackIndex;
    const notify = function (msg, index, data) {
        _socket.emit('notify',{msg : msg, callBackIndex : index, data : data});    
    };

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
                    
                    if(err){
                        console.log('sever joinRoom err==> ' ,err);
                    }else{
                        notify('join_room',callBackIndex,{err : err , roomId : res});
                    }
                })
                break;
            default:
                break;
        }
    })
    
    return that;
};

let _playerList = [];

exports.createPlayer = function (socket, data) {
    let player = Player(socket,data);
    _playerList.push(player);
}