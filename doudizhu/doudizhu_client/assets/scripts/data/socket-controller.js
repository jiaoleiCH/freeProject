import defines from "./../defines";
const SocketController = function () {
    let that = {};
    let _socket = null;
    let _callBackMap = {};
    let _callBackIndex = 1;
    that.init = function () {
        _socket = io(defines.serverUrl);
        _socket.on('notify', function (data) {
            console.log("notify ==> " ,JSON.stringify(data));
            let callBackIndex = data.callBackIndex;
            let cb = _callBackMap[callBackIndex];
            cb ? cb(null,data) : null;
        })
    };

    const notify = function (msg,data) {
        _socket.emit('notify',{msg : msg, callBackIndex : _callBackIndex, data : data});
        _callBackIndex ++;
    };

    const request = function (msg, data, cb) {
        _callBackMap[_callBackIndex] = cb;
        notify(msg,data);
    }

    that.login = function (uniqueId, nickName, avatarUrl, cb) {
        request('login',{
            uniqueId : uniqueId,
            nickName : nickName,
            avatarUrl :avatarUrl,
        },cb);
    };

    

    return that;
};

export default SocketController;