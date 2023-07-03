// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        explosionAnimationClip :  [cc.AnimationClip],
        explosionPrefab : cc.Prefab,
        enemyHitCount: 0, // Biến đếm số lần va chạm
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

    
        this.explosionPool = new cc.NodePool(); // Tạo một node pool cho đối tượng đạn
        const Count = 10;
        for (let i = 0; i < Count; i++) {
            const explosion = cc.instantiate(this.explosionPrefab);
            this.explosionPool.put(explosion); // Đưa đối tượng đạn vào node pool
        }
     
     },

     
    onCollisionEnter(other, self) {
        const canvasNode = cc.find("Canvas");

      if(other.node.name === 'enemy') {
        let explosion = null;
   
        if (this.explosionPool.size() > 0) {
            explosion = this.explosionPool.get(); // Lấy đối tượng explosion từ node pool nếu có sẵn
        } else {
            explosion = cc.instantiate(this.explosionPrefab); // Tạo mới đối tượng explosion nếu node pool rỗng
        }
       
        const animation = explosion.getComponent(cc.Animation);

        const clip = self.getComponent("Bullet3").explosionAnimationClip[0];

        animation.addClip(clip, clip.name);
        animation.play(clip.name);

        explosion.setPosition(this.node.position.x  ,this.node.position.y + this.node.height/2);

        canvasNode.addChild(explosion);
        
        this.schedule(()=> {
            this.explosionPool.put(explosion);
            // const playerNode = cc.find("Canvas/player");
            // const bulletPool = playerNode.getComponent('Player').bulletPool;
            // console.log(bulletPool.size());
            // bulletPool.put(self.node);
            self.node.destroy();
        }, 0.005); // Trả đối tượng đạn về node pool sau khi hoàn thành hành động
    }
   
    },

    start () {

    },

    // update (dt) {},
});
