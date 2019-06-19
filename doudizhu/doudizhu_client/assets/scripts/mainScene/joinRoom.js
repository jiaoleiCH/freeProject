

cc.Class({
    extends: cc.Component,

    properties: {
        numberBtnNode : cc.Node,
        numberLabelNode : cc.Node,
    },


    onLoad () {
        this.initData();
        this.initClickEvent();
    },
    
    initData () {
        this._numberLabArr = [];
        this._numberLabNodeArr = this.numberLabelNode.getChildren();
    },

    initClickEvent () {
        let numberBtnArr = this.numberBtnNode.getChildren();
        for (let i = 0; i < numberBtnArr.length; i++) {
            let numberBtn = numberBtnArr[i];
            numberBtn.on("click", (event) => {
                this.numberBtnEvent(event, i);
            })
        }
    },

    numberBtnEvent (event, index) {
        if(index == 'close'){
            this.node.active = false;
            this._numberLabArr = [];
        }else if(index == 10){  //后退
            this._numberLabArr.length > 0 ? this._numberLabArr.pop() : null;
        }else if(index == 11){ //清除
            this._numberLabArr = [];
        }else {
            if(this._numberLabArr.length < 6){
                this._numberLabArr.push(index);
            }
        }
        // console.log("join numberBtn ==> " ,this._numberLabArr);
        this.updateNumberLabel();
    },

    updateNumberLabel () {
        for (let i = 0; i < this._numberLabNodeArr.length; i++) {
            this._numberLabNodeArr[i].getComponent(cc.Label).string = this._numberLabArr[i] === undefined ? '' : this._numberLabArr[i];
        }
    },

    // update (dt) {
        
    // },


});
