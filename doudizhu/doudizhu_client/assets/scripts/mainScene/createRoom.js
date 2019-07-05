
import global from './../global';
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.initData();
    },

    initData() {
        this._turnCount = 'turn_count_1';
        this._specialRule = 'special_rule_1';
    },

    clickBtnEvent(event, custom) {
        console.log("custom data => ", custom);
        switch (custom) {
            case "0-0":

                break;
            case "close":
                this.node.active = false;
                break;
            case "create":
                global.socket.createRoom({
                    turnCount: this._turnCount,
                    specialRule: this._specialRule
                }, function (err, data) {
                    if (err) {
                        console.log("createRoom err => ", err);
                    } else {
                        console.log("createRoom data =>", data);
                        global.socket.joinRoom(data.roomId, function (err, resp) {
                            console.log('resp = ' + JSON.stringify(resp));
                            console.log('resources = ' + JSON.stringify(global.utilsData.resourcesManager.resources));
                            global.utilsData.playerData.joinRoomSuccess(global.utilsData.resourcesManager.resources[defines.gameConfig.createRoomConfig],resp)
                            if (err) {
                                console.log("err = ", err);
                            } else {
                                cc.director.loadScene("gameScene");
                            }
                        })
                    }
                })

            default:
                break;
        }

        if (custom.indexOf('turn_count') === 0) {
            this._turnCount = custom;
        }
        if (custom.indexOf('special_rule') === 0) {
            this._specialRule = custom;
        }
    }


    // update (dt) {},
});
