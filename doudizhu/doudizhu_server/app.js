const socket = require('socket.io');
const sqlDB = require('./utillity/db');
const config = require('./config.json');
const app = socket('4000');
const playerController = require('./game/player');
const room = require('./game/room');
sqlDB.connect(config.mysqlConfig);

app.on("connection" , function (socket) {
    console.log("a user connected"); 
    socket.emit("welcome", "hello world");
    socket.on('notify',function (res) {
        let msg = res.msg;
        let callBackIndex = res.callBackIndex;
        let notifyData = res.data;
        switch (msg) {
            case 'login':
                console.log('server Login ==> ' , JSON.stringify(notifyData));
                sqlDB.checkPlayer(notifyData.uniqueId,function (err,data){
                    if (err) {
                        console.log('checkPlayer err ==> ' ,err);
                    }else {
                        if(data.length === 0){
                            //不存在此玩家
                            console.log("不存在这个玩家");
                            let uid = '1';
                            for (let i = 0; i < 7; i++) {
                                uid += Math.floor(Math.random() * 10);
                            }
                            console.log('uid == > ',uid,notifyData);
                            sqlDB.insertPlayerInfo({
                                unique_id : notifyData.uniqueId,
                                uid : uid,
                                nick_name : notifyData.nickName,
                                avatar_url : notifyData.avatarUrl,
                                house_card_count : 5
                            });
                            playerController.createPlayer(socket,{
                                uid : uid,
                                nickName : notifyData.nickName,
                                avatarUrl : notifyData.avatarUrl,
                                houseCardCount : 5,
                                callBackIndex : callBackIndex
                            });
                        }else {
                            //存在此玩家(更新玩家数据)
                            sqlDB.updatePlayerInfo('unique_id',notifyData.uniqueId,{
                                nick_name : notifyData.nickName,
                                avatar_url : notifyData.avatarUrl
                            });
                            playerController.createPlayer(socket,{
                                uid : data[0].uid,
                                nickName : notifyData.nickName,
                                avatarUrl : notifyData.avatarUrl,
                                houseCardCount : data[0].house_card_count,
                                callBackIndex : callBackIndex
                            });
                        }
                    }
                });
                break;
        
            default:
                break;
        }
    });
    socket.on('login' , function (res) {
        
    })
});

console.log("listen on 4000");