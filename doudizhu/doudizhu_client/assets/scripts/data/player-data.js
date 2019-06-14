let PlayerData = function () {
    let that = {};
    that.uid = null;
    that.uniqueId = '10000';
    that.nickName = '小明' + Math.floor(Math.random() * 10);
    that.avatarUrl = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4250665045,4285934970&fm=26&gp=0.jpg';
    that.houseCardCount = 5;
    for (let i = 0; i < 7; i++) {
        that.uniqueId += Math.floor(Math.random() * 10);
    }

    that.wxLoginSuccess = function (data) {
        that.uniqueId = data.uniqueId;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
    };

    that.loginSuccess = function (data) {
        console.log("loginSuccess data ==> " , data);
    }

    return that;
}


export default PlayerData;