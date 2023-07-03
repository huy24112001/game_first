cc.Class({
    extends: cc.Component,

    properties: {
        backgroundNode1: cc.Node,
        backgroundNode2: cc.Node,
        speed: 50, // Tốc độ di chuyển của background,

        player: {
            default: null,
            type : cc.Node
        },

        mainAudio : {
        default : null,
        type : cc.AudioClip
        },
        
        lever: 1,
    },

    onLoad() { 
        this.schedule(this.moveBackground, 0);


        
    },

    moveBackground(dt) {
        var distance = this.speed * dt;

        // Di chuyển cả hai background
        this.backgroundNode1.y -= distance;
        this.backgroundNode2.y -= distance;

        // Kiểm tra nếu backgroundNode1 đạt đến cuối màn hình
        if (this.backgroundNode1.y <= -this.backgroundNode1.height) {
            this.backgroundNode1.y = this.backgroundNode2.y + this.backgroundNode2.height;
        }

        // Kiểm tra nếu backgroundNode2 đạt đến cuối màn hình
        if (this.backgroundNode2.y <= -this.backgroundNode2.height) {
            this.backgroundNode2.y = this.backgroundNode1.y + this.backgroundNode1.height;
        }
    },

    start() {

        // Lấy ra kích thước thiết bị hiện tại
        var screenSize = cc.winSize;

        // Lấy ra kích thước background
        var backgroundSize = this.backgroundNode1.getContentSize();

        // Tính toán giá trị lặp
        var repeatX = Math.ceil(screenSize.width / backgroundSize.width);
        var repeatY = Math.ceil(screenSize.height / backgroundSize.height);

        // Thiết lập giá trị scale cho background
        this.backgroundNode1.setScale(repeatX, repeatY);
        this.backgroundNode2.setScale(repeatX, repeatY);

        // Khởi động vị trí ban đầu của cả hai background
        this.backgroundNode1.setPosition(cc.v2(0, 0));
        this.backgroundNode2.setPosition(cc.v2(0, this.backgroundNode1.height));
        cc.audioEngine.playEffect(this.mainAudio, true);

    },
});
