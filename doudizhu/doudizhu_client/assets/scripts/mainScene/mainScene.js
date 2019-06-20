import global from "./../global";
cc.Class({
    extends: cc.Component,

    properties: {
        tipsNode : cc.Node,
        headImage : cc.Sprite,
        nickNameLabel : cc.Label,
        uidLabel : cc.Label,
        houseCardLabel : cc.Label,

        //prefbs
        joinRoomPrefas : cc.Prefab,
        createRoomPrefas : cc.Prefab,
    },

    onLoad () {
        this.initData();
        this.initServer();
        this.initPlayerData();
    },

    initData () {
        this._prefabsArr = [];
    },

    initServer () {
        
        console.log( "  连接服务器 ");
    },

    initPlayerData () {
        this.nickNameLabel.string = global.utilsData.playerData.nickName;
        this.uidLabel.string = 'ID:' + global.utilsData.playerData.uid;
        this.houseCardLabel.string = global.utilsData.playerData.houseCardCount;
        cc.loader.load(global.utilsData.playerData.avatarUrl, (err, texture) => {
            // Use texture to create sprite frame
            if(!err){
                this.headImage.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
    },

    btnClickEvent (event, customData) {
        console.log("custom Data = ", customData);
        switch (customData) {
            case 'wxLogin':
                
                break;
            case 'back':
                break;
            case 'set':
                break;
            case 'fight':
                break;
            case 'wanfa':
                break;
            case 'addCard':
                break;
            case 'createRoom':
                this.createNodeByPrefab(customData,this.createRoomPrefas);
                break;
            case 'joinRoom':
                this.createNodeByPrefab(customData,this.joinRoomPrefas);
                break;
            default:
                break;
        }
    },

    createNodeByPrefab (customData,prefbs) {
        if(!this._prefabsArr[customData]){
            this._prefabsArr[customData] = cc.instantiate(prefbs);
            this.node.addChild(this._prefabsArr[customData]);
        }
        this._prefabsArr[customData].active = true;
    },

    update (dt) {
        this.tipsNode.x <= -700 ? this.tipsNode.x = 700 : null;
        this.tipsNode.x -= 1;
    }

    

    
});
