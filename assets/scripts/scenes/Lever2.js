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
        count : 0
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
    
        
     },

    moveLever2(){
        const lever1Node = cc.find("lever1");
        const enemyPool = lever1Node.getComponent('Lever1').enemyPool;
        // const lv = cc.find("Canvas").getComponent("MainScene").lever;
        // console.log(cc.find("Canvas").getComponent("MainScene").lever);
        // if(lv ===  1)  cc.find("Canvas").getComponent("MainScene").lever = 2;
        const screenHeight = cc.winSize.height;
        this.isFunctionCalled = false ; 

        var canvasNode = cc.find("Canvas");
   
        for(let i = 1 ; i <= 10 ;i++){
            var index = i;
            for(let j = 1; j<= 5;j++ ){
            
                var y =  screenHeight/2  + 20*((i-1)*5 + j-1);
                 for(let k = 1 ;k <= 7;k++){
                
                    if (enemyPool.size() > 0) {
                        enemy = enemyPool.get(); // Lấy đối tượng kẻ thù từ node pool nếu có sẵn
                    } else {
                        enemy = cc.instantiate(this.enemyPrefab); // Tạo mới đối tượng kẻ thù nếu node pool rỗng
                    }
        
        
                    // Lấy thành phần animation clip trên prefab enemy
                    const animation = enemy.getComponent(cc.Animation);
                    var x =  (k-1)*20 - 65;
                    if( i === 10 ) {
                        enemy.setScale(0.25);
                        x = (k-1)*35 - 55;
                        if( k > 4 ){
                            y = screenHeight/2  + 20*((i-1)*5 + j-1) + 35;
                            x =  (k-2.5)*40 - 145;
                           
                        }
                    } 
                
              
        
                    // Lấy một Animation clip theo index từ danh sách enemyAnimationClip
                
                    const AnimationClip = enemy.getComponent("Enemy").enemyAnimationClip[index-1];
        
                 
        
                    // Thiết lập  Clip cho Animation Clip  trên prefab enemy
            
                    animation.addClip(AnimationClip, AnimationClip.name);
                    animation.play(AnimationClip.name);
                   
                    // animation.speed = 0.08;
        
                    enemy.setPosition(x,y);
                    enemy.angle =  0;
                    

                
               
                    // Thêm prefab enemy vào scene
                    canvasNode.addChild(enemy);

                    const speed = 23; // Vận tốc
                    const duration = (y+10) / speed;
            
                    const moveAction = cc.sequence(cc.moveTo(duration, cc.v2( x, -y - 10)), 
                    cc.callFunc(() => {

                           enemyPool.put(enemy) // Trả đối tượng enemy về node pool sau khi hoàn thành hành động
                        // / enemy.destroy();
                        // console.log(enemyPool.size())
                        
                         this.count ++ ;
                         console.log(this.count);
                        //  if(i === 10 && k >= 6)  {
                        //     console.log(enemyPool.size())
                           
                        // }
                        if(this.count >= 321) 
                            setTimeout(() => {
                                    cc.find("lever3").getComponent("Boss").moveLever3();
                            }, 2000);
                        
                    })
                    );
            
                    // Áp dụng action di chuyển cho other
                    enemy.runAction(moveAction);

                  


                }
                if(i === 10 ) break ;
            }

           
         
        }
          
      
    
    },

    start () {
     
    },

    // update (dt) {},
});
