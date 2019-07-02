import global from './../global'

cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    onLoad () {
        global.socket.notifyGameSceneLoadEnd();
        global.socket.onSycnData((data) => {
            console.log("同步数据 ==> " ,data);
            let seatIndex = data.seatIndex;
        })
    },


    // update (dt) {},
});
