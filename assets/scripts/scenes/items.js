// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
    
        
     },

          
     
    onCollisionEnter(other, self) {
 
         console.log(other.node.name);

        // Lấy vị trí hiện tại của other
        let otherPosition = other.node.position;
        otherPosition = new cc.v2(otherPosition.x , otherPosition.y + 60) ; 

        const selfPosition = self.node.position;
        



        // Tính khoảng cách giữa other và self
        const distance = otherPosition.sub(selfPosition).mag();

        // Tính thời gian dựa trên khoảng cách và vận tốc 
        const speed = 400; // Vận tốc
        const duration = distance / speed;

        const moveAction = cc.sequence(cc.moveTo(duration, otherPosition), 
        cc.callFunc(() => {
           self.node.destroy(); // Trả đối tượng đạn về node pool sau khi hoàn thành hành động
        })
        );

        // Áp dụng action di chuyển cho other
        self.node.runAction(moveAction);
        
    },

    start () {

    },

    // update (dt) {},
});
