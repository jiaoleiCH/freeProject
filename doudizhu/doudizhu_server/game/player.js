const Player = function (socket , data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;
    let _callBackIndex = data.callBackIndex;
    _socket.emit('notify',{msg : 'login', callBackIndex : _callBackIndex, data : "welcome"});
    return that;
};

let _playerList = [];

exports.createPlayer = function (socket, data) {
    let player = Player(socket,data);
    _playerList.push(player);
}