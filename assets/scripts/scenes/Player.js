cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        moveSpeed: 1000, // Tốc độ di chuyển của khẩu súng
        shootCooldown: 0.1, // Thời gian cooldown giữa các lần bắn
        bulletAudio: {
            default: null,
            type: cc.AudioClip
        },
       
    },

    setBulletPool(bulletPool) {
      
        this.bulletPool = bulletPool;
    },

    onLoad() {

      
        this.isShooting = false;
        this.canShoot = true;
        this.registerMouseEvents();

        const bulletPool = new cc.NodePool(); // Tạo một node pool cho đối tượng đạn
        this.node.getComponent('Player').setBulletPool(bulletPool);
        this.createBulletPool(); // Gọi hàm tạo node pool
      
    },
   


    start(){
     
    },

    createBulletPool() {
        // Tạo một số lượng đối tượng đạn ban đầu trong node pool
        const bulletCount = 10;
        for (let i = 0; i < bulletCount; i++) {
            const bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet); // Đưa đối tượng đạn vào node pool
        }
    },

    onCollisionEnter(other, self) {
 
        console.log("va cham");
        if (self.node.name === 'Player') {
            console.log("va cham");
       
    }
    },

    registerMouseEvents() {
        var canvasNode = cc.find("Canvas");

        // Đăng ký sự kiện khi bắt đầu kích đúp chuột
        canvasNode.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);

        // Đăng ký sự kiện khi bắt đầu nhả kích đúp chuột
        canvasNode.on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);

        // Đăng ký sự kiện khi di chuyển chuột
        canvasNode.on(cc.Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
    },

    onMouseDown(event) {
        this.isShooting = true;
        this.schedule(this.shoot, this.shootCooldown);
    },

    onMouseUp(event) {
        this.isShooting = false; // Đánh dấu là người dùng đã nhả chuột
        this.unschedule(this.shoot);
    },

    shoot() {
        if (!this.canShoot) {
            return;
        }

        const currentPosition = this.node.position;

        for (let i = 0; i < 4; i++) {
            let bullet = null;

            if (this.bulletPool.size() > 0) {
                bullet = this.bulletPool.get(); // Lấy đối tượng đạn từ node pool nếu có sẵn
            } else {
                bullet = cc.instantiate(this.bulletPrefab); // Tạo mới đối tượng đạn nếu node pool rỗng
            }

            if (i < 2)
                var newPosition = cc.v2(currentPosition.x - 15 + i * 5, currentPosition.y + 75);
            else if (i == 2)
                var newPosition = cc.v2(currentPosition.x - 40 + i * 25, currentPosition.y + 75);
            else if (i == 3)
                var newPosition = cc.v2(currentPosition.x - 40 + (i - 1) * 25 + 5, currentPosition.y + 75);

            // Thiết lập vị trí của đạn là vị trí của khẩu súng
            bullet.setPosition(newPosition);

            // Thêm đạn vào scene
            this.node.parent.addChild(bullet);
            var id = cc.audioEngine.playEffect(this.bulletAudio, false);
            cc.audioEngine.setVolume(id, 0.1);

            // Lấy kích thước màn hình
            const screenSize = cc.winSize;

            // Tính toán thời gian di chuyển của đạn để đạt tới đỉnh màn hình
            const duration = screenSize.height / this.moveSpeed;

            // Tạo action di chuyển cho đạn
            const moveAction = cc.sequence(
                cc.moveBy(duration, cc.v2(0, screenSize.height)),
                cc.callFunc(() => {
                    this.bulletPool.put(bullet); // Trả đối tượng đạn về node pool sau khi hoàn thành hành động
                })
            );

            // Áp dụng action di chuyển cho đạn
            bullet.runAction(moveAction);



   
        }
    },

 

    onMouseMove(event) {
        // Lấy vị trí chuột trong không gian world
        const mousePos = event.getLocation();

        // Chuyển đổi vị trí chuột thành vị trí trong không gian local của khẩu súng
        const localPos = this.node.parent.convertToNodeSpaceAR(mousePos);

        // Di chuyển khẩu súng tới vị trí chuột
        this.node.position = localPos;
    },
});
