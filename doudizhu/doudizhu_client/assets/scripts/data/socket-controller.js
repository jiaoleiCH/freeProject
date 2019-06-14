import defines from "./../defines";
const SocketController = function () {
    let that = {};
    let _socket = null;
    that.init = function () {
        _socket = io(defines.serverUrl);
    };

    that.login = function (uniqueId, nickName, avatarUrl, cb) {
        _socket.emit('login',{
            uniqueId : uniqueId,
            nickName : nickName,
            avatarUrl :avatarUrl,
            
        });
    }

    return that;
};

export default SocketController;