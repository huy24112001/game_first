 // Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: {
            default : null,
            type : cc.Prefab
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

        const enemyPool = new cc.NodePool();
        this.node.getComponent('Lever1').setEnemyPool(enemyPool);
        // Tạo một số lượng đối tượng kẻ địch ban đầu trong node pool
        const enemyCount = 10;
           for (let i = 0; i < enemyCount; i++) {
                const enemyInstance = cc.instantiate(this.enemyPrefab); // Tạo một instance của prefab enemy
                this.enemyPool.put(enemyInstance); // Đưa đối tượng kẻ địch vào node pool
           }

        
   
     },

    setEnemyPool(enemyPool) {
        this.enemyPool = enemyPool;
    },

    start () {

        var canvasNode = cc.find("Canvas");
        const currentPosition = this.node.position;
        for(let i = 1 ; i <= 39 ;i++){

            let enemy = null ;
           
            if (this.enemyPool.size() > 0) {
                enemy = this.enemyPool.get(); // Lấy đối tượng kẻ thù từ node pool nếu có sẵn
            } else {
                enemy = cc.instantiate(this.enemyPrefab); // Tạo mới đối tượng kẻ thù nếu node pool rỗng
            }


            // Lấy thành phần animation clip trên prefab enemy
            const animation = enemy.getComponent(cc.Animation);
            var index = 0,x = currentPosition.x, y = currentPosition.y,rot = 0, angle = 0 ;
            

            if(i == 1){
                index = 9;
            }
            else if(i < 10) {

                index = 4;
                

                if(i>=6){
                    x  = x + 215 - 20*i;
                    rot = 45;
                    y = y + 215 - i*20;
                }
                else{
                    x  = x - 135 + 20*i;
                    rot = -45;
                    y = y + 135 - i*20 ;
                }

             
            }
            else if(i < 16){
                index = 5;

                if(i>=13){
                     x  = x + 355 - 20*i;
                 
                    y = y + 300 - i*20;
                }
                else{
                    x  = x - 295 + 20*i;
                    y = y + 240 - i*20;
                }
            }
            else if( i < 24){
                index = 2;
                
               
                if(i>=20){
                     angle = 2.55 + i/9;
                    x = x + 200 * Math.cos(angle) + 7 ;
                    rot = rot + 90 - i/2 ; 
                    y = y + 160 + 200 * Math.sin(angle);
                   
                }
                else {
                    angle = 2.55 + i/9;
                    x = x + 200 * Math.cos(angle) - 7 ;
                    rot = rot - 90 + i/2 ; 
                    y = y + 160 + 200 * Math.sin(angle);
                }
            }
            else if(i < 32 ){
                 index = 6;
                 if(i >= 28){
                     angle = 2.55 + i/9 - 8/9;
                    x = x + 200 * Math.cos(angle) + 10 ;
                    rot = rot + 90 - i/2 + 4 ; 
                    y = y + 137 + 200 * Math.sin(angle);
                 }
                 else {
                     angle = 2.55 + i/9- 8/9;
                    x = x + 200 * Math.cos(angle) - 10 ;
                    rot = rot - 90 + i/2 - 4 ; 
                    y = y + 137 + 200 * Math.sin(angle);
                 }
            }
            else if( i< 40){
                index = 3;
                if(i >= 36){
                    angle = 2.55 + i/9 - 16/9;
                   x = x + 200 * Math.cos(angle) + 13 ;
                   rot = rot + 90 - i/2 + 8 ; 
                   y = y + 114 + 200 * Math.sin(angle);
                }
                else {
                    angle = 2.55 + i/9 - 16/9;
                   x = x + 200 * Math.cos(angle) - 13 ;
                   rot = rot - 90 + i/2 - 8 ; 
                   y = y + 114 + 200 * Math.sin(angle);
                }
            }

            // Lấy một Animation clip theo index từ danh sách enemyAnimationClip
            
            const AnimationClip = enemy.getComponent("Enemy").enemyAnimationClip[index];

            //  console.log(enemy.getComponent("Enemy").enemyAnimationClip[0])

            // Thiết lập  Clip cho Animation Clip  trên prefab enemy
    
            animation.addClip(AnimationClip, AnimationClip.name);
            animation.play(AnimationClip.name);
           
            // animation.speed = 0.08;

            enemy.setPosition(x,y+200);
            
            if( i<10 && i>1 )
                enemy.angle += rot;
            else 
                enemy.angle -= rot;
            // Thêm prefab enemy vào scene
            canvasNode.addChild(enemy);
    }
    },

    // update (dt) {},
});
