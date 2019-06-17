import global from "./../global";
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        //初始化socket
        global.socket.init();
    },

    buttonClickEvent (event , customData) {
        console.log('buttonClick Event ==> ' ,customData);
        switch (customData) {
            case 'login':
                global.socket.login(
                    global.utilsData.playerData.uniqueId,
                    global.utilsData.playerData.nickName,
                    global.utilsData.playerData.avatarUrl,function (err,data) {
                        if(err){
                            console.log("login err ==> " ,err);
                        }else {
                            console.log("login data ==> " ,JSON.stringify(data));
                            global.utilsData.playerData.loginSuccess(data);
                            cc.director.loadScene('')
                        }
                    }
                )
                break;
        
            default:
                break;
        }
    }


    // update (dt) {},
});
