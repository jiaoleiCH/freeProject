let PlayerData = function () {
    let that = {};
    that.uid = '1';
    that.uniqueId = '100009337283';
    that.nickName = '小明' + Math.floor(Math.random() * 10);
    that.avatarUrl = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4250665045,4285934970&fm=26&gp=0.jpg';
    that.houseCardCount = 5;
    // for (let i = 0; i < 7; i++) {
    //     that.uniqueId += Math.floor(Math.random() * 10);
    // }

    that.wxLoginSuccess = function (data) {
        that.uniqueId = data.uniqueId;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
    };

    that.loginSuccess = function (data) {
        console.log("loginSuccess data ==> " , data);
        that.uid = data.uid;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
        that.houseCardCount = data.houseCardCount;
    };

    that.joinRoomSuccess = function (config, data) {
        console.log('room config = ',JSON.stringify(config));
        console.log('data = ', JSON.stringify(data));
        console.log('config ' ,config.json.turn_count); 
        let gameConfig = config.json;
        let roomConfig = data.data;
        that.roomID = roomConfig.roomId;
        console.log('gameConfig => ' ,gameConfig);
        console.log('roomConfig => ' ,roomConfig);

        let turnCountConfig = gameConfig.turn_count[roomConfig.turnCount];
        that.totalTurnCount = turnCountConfig.turn_count;
        that.needHouseCardCount = turnCountConfig.need_house_card_count;
        let specialRuleConfig = gameConfig.special_rule[roomConfig.specialRule];
        that.normalBombRate = specialRuleConfig.normal_bomb;
        that.kingBombRate = specialRuleConfig.king_bomb;

    }

    return that;
}


export default PlayerData;