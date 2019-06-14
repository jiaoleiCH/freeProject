const socket = require('socket.io');
const sqlDB = require('./utillity/db');
const config = require('./config.json');
const app = socket('4000');
sqlDB.connect(config.mysqlConfig);
sqlDB.insertPlayerInfo({
    unique_id : '10000',
    uid : '120000',
    nick_name : '小红',
    avatar_url : 'sina.com',
    house_card_count : 5
})
app.on("connection" , function (socket) {
    console.log("a user connected"); 
    socket.emit("welcome", "hello world");
    socket.on('login' , function (res) {
        console.log('server Login ==> ' , JSON.stringify(res));
        sqlDB.checkPlayer(res.uniqueId,function (err,data){
            if (err) {
                console.log('checkPlayer err ==> ' ,err);
            }else {
                if(data.length === 0){
                    //不存在此玩家
                    console.log("不存在这个玩家");
                    sqlDB.insertPlayerInfo({
                        unique_id : res.uniqueId,
                        uid : res.uid,
                        nick_name : res.nickName,
                        avatar_url : res.avatarUrl,
                        house_card_count : 5
                    });
                }else {
                    //存在此玩家

                }
            }
        });
    })
});

console.log("listen on 4000");