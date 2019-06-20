
import global from './../global';
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {
        
    },

    clickBtnEvent (event, custom) {
        console.log("custom data => " ,custom);
        switch (custom) {
            case "0-0":
                
                break;
            case "close":
                this.node.active = false;
                break;
            case "create":
                global.socket.createRoom('create_room',function (err, data) {
                    if(err){
                        console.log("createRoom err => " ,err);
                    }else{
                        console.log("createRoom data =>",data);
                        global.socket.joinRoom(data.data.roomId, function (err, res) {
                            if(err){
                                console.log("err = ",err);
                            }else {
                                cc.director.loadScene("gameScene");        
                            }
                        })
                    }
                })
                
            default:
                break;
        }
    }


    // update (dt) {},
});
