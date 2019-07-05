// import defines from "./../defines";
import EventListener from './../uillity/event-listener';
const SocketController = function () {
    let that = {};
    let _socket = null;
    let _callBackMap = {};
    let _callBackIndex = 1;
    let _event = EventListener({});
    that.init = function () {
        _socket = io(defines.serverUrl);
        _socket.on('notify', function (data) {
            console.log("notify ==> " ,JSON.stringify(data));
            console.log('callBackMap ==> ' ,_callBackMap);
            let msg = data.msg;
            _event.fire(msg,data.data);
            let callBackIndex = data.callBackIndex;
            let cb = _callBackMap[callBackIndex];
            if(data.data.err){
                cb ? cb(data.data.err) : null;
            }else {
                cb ? cb(null,data.data) : null;
            }
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

    that.createRoom = function (data,cb) {
        console.log('client createRoom data ==> ' ,data);
        request('create_room',data,cb);
    };

    that.joinRoom = function (roomId,cb) {
        console.log('client joinRoom data ==> ' ,roomId);
        request('join_room', {roomId:roomId},cb);
    };

    that.notifyGameSceneLoadEnd = function () {
        notify('gameSceneLoadEnd' , {})
    };

    that.onSycnData = function (method) {
        _event.on('syncData',method);
    }

    

    return that;
};

export default SocketController;