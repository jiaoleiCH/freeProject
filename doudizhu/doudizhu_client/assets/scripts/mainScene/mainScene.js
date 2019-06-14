import global from "./../global";
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad () {
        this.initServer();
    },

    initServer () {
        global.socket.init();
        console.log( "  连接服务器 ");
    },

    btnClickEvent (event, customData) {
        console.log("custom Data = ", customData);
        switch (customData) {
            case 'wxLogin':
                global.socket.login(
                    global.utilsData.playerData.uniqueId,
                    global.utilsData.playerData.nickName,
                    global.utilsData.playerData.avatarUrl,function (err,data) {
                        if(err){
                            console.log("login err ==> " ,err);
                        }else {
                            console.log("login data ==> " ,JSON.stringify(data));
                        }
                    }
                )
                break;
        
            default:
                break;
        }
    }

    

    
});
