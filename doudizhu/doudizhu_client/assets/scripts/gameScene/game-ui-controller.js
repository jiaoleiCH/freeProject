
import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        roomIdLabel : cc.Label,
        turnCountLabel : cc.Label,
        needCardCountLabel : cc.Label,
        normalBombRateLabel : cc.Label,
        kingBombRateLabel : cc.Label
    },


    onLoad () {
        this.setGameRuleConfig();
    },

    setGameRuleConfig () {
        this.roomIdLabel.string = "房间ID:" + global.utilsData.playerData.roomID;
        this.turnCountLabel.string = "局数:" + global.utilsData.playerData.totalTurnCount;
        this.needCardCountLabel.string = "消耗房卡:" + global.utilsData.playerData.needHouseCardCount;
        this.normalBombRateLabel.string = "炸弹倍数:" + global.utilsData.playerData.normalBombRate;
        this.kingBombRateLabel.string = "王炸倍数:" + global.utilsData.playerData.kingBombRate;
    }

    // update (dt) {},
});
