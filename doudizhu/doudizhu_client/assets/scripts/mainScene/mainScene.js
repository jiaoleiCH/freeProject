import global from "./../global";
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad () {
        this.initServer();
    },

    initServer () {
        
        console.log( "  连接服务器 ");
    },

    btnClickEvent (event, customData) {
        console.log("custom Data = ", customData);
        switch (customData) {
            case 'wxLogin':
                
                break;
        
            default:
                break;
        }
    }

    

    
});
