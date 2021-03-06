import global from "./../global";
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        // global.nodeCache.Preload((err) => {
        //     console.log("preload prefab err => " ,err);
        // })
        //初始化socket

        let gameConfig = defines.gameConfig;
        let resList = [];
        for (let i in gameConfig) {
            resList.push(gameConfig[i]);
        }
        global.utilsData.resourcesManager.loadList(resList, () => {
            console.log('resources = ' + JSON.stringify(global.utilsData.resourcesManager.resources));
            global.socket.init();
        })
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
                            cc.director.loadScene('mainScene');
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
