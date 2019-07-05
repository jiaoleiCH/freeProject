import global from './../global';

cc.Class({
    extends: cc.Component,

    properties: {
        numberBtnNode : cc.Node,
        numberLabelNode : cc.Node,
        tipNode : cc.Node,
    },


    onLoad () {
        this.initData();
        this.initClickEvent();
    },
    
    initData () {
        this._numberLabArr = [];
        this._roomIdStr = '';
        this._numberLabNodeArr = this.numberLabelNode.getChildren();
    },

    initClickEvent () {
        let numberBtnArr = this.numberBtnNode.getChildren();
        for (let i = 0; i < numberBtnArr.length; i++) {
            let numberBtn = numberBtnArr[i];
            numberBtn.on("click", (event) => {
                this.numberBtnEvent(event, i);
            })
        }
    },

    numberBtnEvent (event, index) {
        if(index == 'close'){
            this.node.active = false;
            this._numberLabArr = [];
            this.updateNumberLabel();
        }else if(index == 10){  //后退
            this._numberLabArr.length > 0 ? this._numberLabArr.pop() : null;
            this.updateNumberLabel();
        }else if(index == 11){ //清除
            this._numberLabArr = [];
            this.updateNumberLabel();
        }else {
            if(this._numberLabArr.length < 6){
                this._numberLabArr.push(index);
                this._roomIdStr += index;
                this.updateNumberLabel();
            }
            if(this._numberLabArr.length == 6){
                global.socket.joinRoom(this._roomIdStr, (err, resp) => {
                    console.log('resp = ' + JSON.stringify(resp));
                    console.log('resources = ' + JSON.stringify(global.utilsData.resourcesManager.resources));
                    
                    if (err) {
                        console.log("err = ", err);
                        this.tipNode.getComponent(cc.Label).string = err;
                        this.tipNode.opacity = 255;
                        this.tipNode.runAction(cc.fadeOut(2));
                        this._numberLabArr = [];
                        this._roomIdStr = '';
                        this.updateNumberLabel();
                    } else {
                        global.utilsData.playerData.joinRoomSuccess(global.utilsData.resourcesManager.resources[defines.gameConfig.createRoomConfig],resp);
                        cc.director.loadScene('gameScene'); 
                    }
                })
            }

        }
        // console.log("join numberBtn ==> " ,this._numberLabArr);
        // this.updateNumberLabel();
    },

    updateNumberLabel () {
        for (let i = 0; i < this._numberLabNodeArr.length; i++) {
            this._numberLabNodeArr[i].getComponent(cc.Label).string = this._numberLabArr[i] ? this._numberLabArr[i] : '';
        }
    },

    // update (dt) {
        
    // },


});
