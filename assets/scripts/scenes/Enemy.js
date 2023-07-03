// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // enemySpriteFrames: [cc.SpriteFrame],
        enemyAnimationClip : [cc.AnimationClip],
        explosionAnimationClip :  [cc.AnimationClip],
        explosionPrefab : cc.Prefab,
        enemyHitCount: 0, // Biến đếm số lần va chạm
        itemPrefab : cc.Prefab,
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
      
       
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDrawBoundingBox = true;
        // manager.enabledDebugDraw = true;
 
        this.itemPool = new cc.NodePool(); // Tạo một node pool cho đối tượng đạn
        const Count = 5;
        for (let i = 0; i < Count; i++) {
            const item = cc.instantiate(this.itemPrefab);
            this.itemPool.put(item); // Đưa đối tượng đạn vào node pool
        }

      
   
     
     },

     
     
    onCollisionEnter(other, self) {
 
     
    if (other.node.name === 'items') console.log('dep tri');
    else
        if (other.node.name === 'bullet3') {
            this.enemyHitCount++; 
    
            if (this.enemyHitCount >= 4) {

                // Xóa đối tượng enemy
                const lever1Node = cc.find("lever1");
                const enemyPool = lever1Node.getComponent('Lever1').enemyPool;
                enemyPool.put(self.node);
                // console.log(enemyPool.size());
                // self.node.destroy();
                this.enemyHitCount = 0 ;
             
                this.createItem();
                var canvasNode = cc.find("Canvas");
                let lv =  canvasNode.getComponent("MainScene").lever ;
              
                if(enemyPool.size() === 39 && lv === 1 ){
                    canvasNode.getComponent("MainScene").lever = 2;
                    const lever2Node = cc.find("lever2");
                    lever2Node.getComponent('Lever2').moveLever2();
                }
               

        }
    }
    },

 
    createItem() {

        const canvasNode = cc.find("Canvas");

        const random = Math.floor(Math.random() * 1000);
        
        if (random % 7 === 0 && random % 3 === 0) {

            let item = null;
            const itemPool = this.itemPool;
            if (itemPool.size() > 0) {  
                item = itemPool.get(); // Lấy đối tượng item từ node pool nếu có sẵn
            } else {
                item = cc.instantiate(this.itemPrefab); // Tạo mới đối tượng item nếu node pool rỗng
            }
    
           

            const rotateAction = cc.repeatForever(cc.rotateBy(1, 360));
            item.children[0].runAction(rotateAction);
            item.setPosition(this.node.position.x, this.node.position.y);

            canvasNode.addChild(item);
           
            const duration = (canvasNode.height - this.node.position.y) / 120;
            const moveAction = cc.sequence(
            cc.moveBy(duration, cc.v2(0, -(canvasNode.height - this.node.position.y))),
            cc.callFunc(() => {
                itemPool.put(item); // Trả đối tượng item về node pool sau khi hoàn thành hành động
            })
            );
           
            item.runAction(moveAction);
        }
    },
        
       
    
     
  

    start () {

    },

    // update (dt) {},
});
