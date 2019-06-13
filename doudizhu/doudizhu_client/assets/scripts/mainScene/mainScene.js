
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad () {
        let socket = io('http://localhost:4000');
        console.log( "  连接服务器 ");
    },

    

    
});
