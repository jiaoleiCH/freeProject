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

    that.loginSuccess = function (res) {
        console.log("loginSuccess data ==> " , res);
        that.uid = res.data.uid;
        that.nickName = res.data.nickName;
        that.avatarUrl = res.data.avatarUrl;
        that.houseCardCount = res.data.houseCardCount;
    };

    that.joinRoomSuccess = function (config, data) {
        console.log('room config = ',JSON.stringify(config));
        console.log('data = ', JSON.stringify(data));
        console.log('config ' ,config.turn_count);
        // that.roomID = data.data.roomID;

        // let turnCountConfig

    }

    return that;
}


export default PlayerData;