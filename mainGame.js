var ctx = myCanvas.getContext("2d");

var FPS = 40;

var Player1Img = new Character("./image/user1/", "r");

var Player2Img = new Character("./image/user2/", "l");

var bubbleImg = new Image();
bubbleImg.src = "./image/waterballoon.png";

var FlowImg = new Image();
FlowImg.src = "./image/flow.png";

var BlockImg = new Image();
BlockImg.src = "./image/block.png"

var ItemImg = new Image();
ItemImg.src = "./image/item0.png"

var Item1Img = new Image();
Item1Img.src = "./image/item1.png"



// Block 행렬 변수
var blockColumn = 7;
var blockRow = 9;

var bubblePressed = false;
var bubblePressed2 = false;

var itemMax = 5;
var flowMax = 3;

var map = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0]
]

var blocks = [];
for (var c = 0; c < blockColumn; c++) {
    blocks[c] = [];
    for (var r = 0; r < blockRow; r++) {
        blocks[c][r] = { x: 0, y: 0, status: 0 };
        if (map[c][r] == 1) {
            blocks[c][r].status = 1;
        }
    }
}

function Character(path, direct) {
    this.img = new Image();
    this.path = path;
    this.direct = direct;
    this.img.src = this.path + this.direct + '.png';
}
Character.prototype.next = function () {
    this.index++;
    this.index %= this.len;
    this.img.src = this.path + this.direct + '.png';
}
Character.prototype.leftImg = function () {
    this.direct = 'l';
    this.img.src = this.path + this.direct + '.png';
}
Character.prototype.rightImg = function () {
    this.direct = 'r';
    this.img.src = this.path + this.direct + '.png';
}
Character.prototype.upImg = function () {
    this.direct = 'u';
    this.img.src = this.path + this.direct + '.png';
}
Character.prototype.downImg = function () {
    this.direct = 'd';
    this.img.src = this.path + this.direct + '.png';
}

function drawBlocks() {

    for (var c = 0; c < blockColumn; c++) {
        for (var r = 0; r < blockRow; r++) {
            var blockX = r * BlockImg.width;
            var blockY = c * BlockImg.height;
            blocks[c][r].x = blockX;
            blocks[c][r].y = blockY;
            if (map[c][r] == 1) {
                ctx.drawImage(BlockImg, blockX, blockY);
            }
        }
    }
}


// item 생성에 필요한 random()
function random(min, max) {
    var rnd = Math.floor(Math.random() * (max - min) + min);
    return rnd;
}

// 아이템 이차원 배열
var items = [];
var items1 = [];
for (var c = 0; c < blockColumn; c++) {
    items[c] = [];
    items1[c] = [];
    for (var r = 0; r < blockRow; r++) {
        items[c][r] = { x: r * 100, y: c * 100, status: 0 };
        items1[c][r] = { x: r * 100, y: c * 100, status: 0 };

    }
}

// 아이템 5개 만들어야
for (var i = 0; i < itemMax; i++) {
    var x = random(1, 8);
    var y = random(1, 6);
    items[y][x].status = 1;

}
// 아이템 중복 출력 방지
if (items[y][x].status != 1) {

    for (var i = 0; i < flowMax; i++) {
        var y1 = random(1, 8);
        var x1 = random(1, 6);
        items1[y1][x1].status = 1;
    }
}

// 아이템 배열에 아이템 그리기
function drawItems() {
    for (var c = 0; c < blockColumn; c++) {
        for (var r = 0; r < blockRow; r++) {
            if (items[c][r].status == 1) {
                ctx.drawImage(ItemImg, items[c][r].x, items[c][r].y);
            }
            if (items1[c][r].status == 1) {
                ctx.drawImage(Item1Img, items1[c][r].x, items1[c][r].y);
            }
        }
    }
}

function die(p) {
    var p;

    // 플레이어1 버블에 닿은 경우
    for (var i = 1; i <= player1.flowCount; i++) {
        for (var j = 0; j < player1.bubbles.length; j++) {
            if ((player1.bubbles[j].bombTime < 0 && player1.bubbles[j].flowTime)) {

                // 가로-세로
                if ((p.playerY == player1.bubbles[j].bubbleY) && ((player1.bubbles[j].bubbleX - i * 100) <= p.playerX) && (p.playerX <= (player1.bubbles[j].bubbleX + i * 100))) {
                    p.live = false;
                } else if ((p.playerX == player1.bubbles[j].bubbleX) && ((player1.bubbles[j].bubbleY - i * 100) <= p.playerY) && (p.playerY <= (player1.bubbles[j].bubbleY + i * 100))) {
                    p.live = false;

                }
            }
        }
    }
    // 플레이어2 버블에 닿은 경우
    for (var i = 1; i <= player2.flowCount; i++) {
        for (var j = 0; j < player2.bubbles.length; j++) {
            if (player2.bubbles[j].bombTime < 0 && player2.bubbles[j].flowTime > 0) {

                // 가로-세로
                if ((p.playerY == player2.bubbles[j].bubbleY) && ((player2.bubbles[j].bubbleX - i * 100) <= p.playerX) && (p.playerX <= (player2.bubbles[j].bubbleX + i * 100))) {
                    p.live = false;

                } else if ((p.playerX == player2.bubbles[j].bubbleX) && ((player2.bubbles[j].bubbleY - i * 100) <= p.playerY) && (p.playerY <= (player2.bubbles[j].bubbleY + i * 100))) {
                    p.live = false;
                }
            }
        }
    }

    if (p.live == false) {
        clearInterval(Frame);
        setTimeout(gameover, 1000);
    }

}

function gameover() {
    var playerNum;
    if (player1.live == false) {
        playerNum = 1;
    } else if (player2.live == false) {
        playerNum = 2;
    }
    alert("플레이어" + playerNum + " 님이 물풍선에 갇혀 게임 종료");
}


// Player 생성자
function Player(idx, x, y) {
    this.playerX = x * 100;
    this.playerY = y * 100;
    this.idx = idx;
    this.live = true;
    this.drawPlayer = function () {
        if (this.idx == 1) {
            ctx.drawImage(Player1Img.img, this.playerX, this.playerY);
        } else if (this.idx == 2) {
            ctx.drawImage(Player2Img.img, this.playerX, this.playerY);
        }
        // 추가) live == false 시, 이미지 변경
    }
    this.bubbles = [];
    this.bubbleCount = 1;
    this.flowCount = 1;

}

// 아이템 줍기
Player.prototype.takeItem = function () {
    for (var c = 0; c < blockColumn; c++) {
        for (var r = 0; r < blockRow; r++) {
            if (items[c][r].status == 1) {
                if (this.playerX == r * 100 && this.playerY == c * 100) {
                    items[c][r].status = 0;
                    this.bubbleCount++;
                }
            }
            if (items1[c][r].status == 1) {
                if (this.playerX == r * 100 && this.playerY == c * 100) {
                    items1[c][r].status = 0;
                    this.flowCount++;
                }
            }
        }
    }
}

var player1 = new Player(p1, 0, 0);
var player2 = new Player(p2, 8, 6);


// Bubble 생성자
function Bubble() {
    this.bombTime = 3;
    this.flowTime = 1.5;
    this.bubbleX = null;
    this.bubbleY = null;
}

Bubble.prototype.dropBubble = function (idx) {

    var p;
    if (idx == 1) {
        p = player1;
    } else if (idx == 2) {
        p = player2;
    }

    // bubble 좌표 설정
    if (this.bubbleX == null && this.bubbleY == null) {
        this.bubbleX = p.playerX;
        this.bubbleY = p.playerY;
    }

    // drawBubble();
    if (this.bombTime > 0) {
        this.bombTime = this.bombTime - 1 / FPS;
        ctx.drawImage(bubbleImg, this.bubbleX, this.bubbleY);
    } else {
        if (this.flowTime > 0) {

            // drawFlow();
            this.flowTime = this.flowTime - 1 / FPS;

            ctx.drawImage(FlowImg, this.bubbleX, this.bubbleY);

            for (var i = 1; i <= p.flowCount; i++) {
                ctx.drawImage(FlowImg, this.bubbleX - i * 100, this.bubbleY); //왼
                ctx.drawImage(FlowImg, this.bubbleX + i * 100, this.bubbleY); //오
                ctx.drawImage(FlowImg, this.bubbleX, this.bubbleY - i * 100); //상
                ctx.drawImage(FlowImg, this.bubbleX, this.bubbleY + i * 100); //하

            }

            // deleteBlock()
            for (var c = 0; c < blockColumn; c++) {
                for (var r = 0; r < blockRow; r++) {
                    var block = blocks[c][r];
                    if (map[c][r] == 1) {
                        for (var i = 1; i <= p.flowCount; i++) {
                            if ((block.x == (this.bubbleX - i * 100)) && (block.y == this.bubbleY)) {
                                map[c][r] = 0;
                            } else if ((block.x == (this.bubbleX + i * 100)) && (block.y == this.bubbleY)) {
                                map[c][r] = 0;

                            } else if ((block.x == this.bubbleX) && (block.y == (this.bubbleY - i * 100))) {
                                map[c][r] = 0;

                            } else if ((block.x == this.bubbleX) && (block.y == (this.bubbleY + i * 100))) {
                                map[c][r] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

}

// 키보드 이벤트
function MyKeyDownHandler(MyEvent) {

    function left(keyCode, p) {
        if (MyEvent.keyCode == keyCode && p.playerX > 0) {

            if (p == player1) {
                Player1Img.leftImg();
            } else if (p == player2) {
                Player2Img.leftImg();
            }

            // 블록, 버블 블로킹
            var bubbleCheck = false;
            for (var i = 0; i < player1.bubbles.length; i++) {
                if ((player1.bubbles[i].bubbleX == p.playerX - 100) && (player1.bubbles[i].bubbleY == p.playerY)) {
                    bubbleCheck = true;
                }
            }
            for (var i = 0; i < player2.bubbles.length; i++) {
                if ((player2.bubbles[i].bubbleX == p.playerX - 100) && (player2.bubbles[i].bubbleY == p.playerY)) {
                    bubbleCheck = true;
                }
            }
            if ((map[p.playerY / 100][p.playerX / 100 - 1] == 0) && (bubbleCheck == false)) {
                p.playerX = p.playerX - 100;
            }


        }
    }
    left(65, player1);
    left(37, player2);


    function right(keyCode, p) {
        if (MyEvent.keyCode == keyCode && p.playerX + Player1Img.img.width < myCanvas.width) {

            if (p == player1) {
                Player1Img.rightImg();
            } else if (p == player2) {
                Player2Img.rightImg();
            }

            var bubbleCheck = false;
            for (var i = 0; i < player1.bubbles.length; i++) {
                if ((player1.bubbles[i].bubbleX == p.playerX + 100) && (player1.bubbles[i].bubbleY == p.playerY)) {
                    bubbleCheck = true;
                }
            }
            for (var i = 0; i < player2.bubbles.length; i++) {
                if ((player2.bubbles[i].bubbleX == p.playerX + 100) && (player2.bubbles[i].bubbleY == p.playerY)) {
                    bubbleCheck = true;
                }
            }
            if ((map[p.playerY / 100][p.playerX / 100 + 1] == 0) && (bubbleCheck == false)) {
                p.playerX = p.playerX + 100;
            }
        }
    }
    right(68, player1);
    right(39, player2);



    function up(keyCode, p) {
        if (MyEvent.keyCode == keyCode && p.playerY > 0) {

            if (p == player1) {
                Player1Img.upImg();
            } else if (p == player2) {
                Player2Img.upImg();
            }

            var bubbleCheck = false;
            for (var i = 0; i < player1.bubbles.length; i++) {
                if ((player1.bubbles[i].bubbleY == p.playerY - 100) && (player1.bubbles[i].bubbleX == p.playerX)) {
                    bubbleCheck = true;
                }
            }
            for (var i = 0; i < player2.bubbles.length; i++) {
                if ((player2.bubbles[i].bubbleY == p.playerY - 100) && (player2.bubbles[i].bubbleX == p.playerX)) {
                    bubbleCheck = true;
                }
            }
            if ((map[p.playerY / 100 - 1][p.playerX / 100] == 0) && (bubbleCheck == false)) {
                p.playerY = p.playerY - 100;
            }
        }
    }
    up(87, player1);
    up(38, player2);


    function down(keyCode, p) {
        if (MyEvent.keyCode == keyCode && p.playerY + Player1Img.img.height < myCanvas.height) {

            if (p == player1) {
                Player1Img.downImg();
            } else if (p == player2) {
                Player2Img.downImg();
            }

            var bubbleCheck = false;
            for (var i = 0; i < player1.bubbles.length; i++) {
                if ((player1.bubbles[i].bubbleY == p.playerY + 100) && (player1.bubbles[i].bubbleX == p.playerX)) {
                    bubbleCheck = true;
                }
            }
            for (var i = 0; i < player2.bubbles.length; i++) {
                if ((player2.bubbles[i].bubbleY == p.playerY + 100) && (player2.bubbles[i].bubbleX == p.playerX)) {
                    bubbleCheck = true;
                }
            }
            if ((map[p.playerY / 100 + 1][p.playerX / 100] == 0) && (bubbleCheck == false)) {
                p.playerY = p.playerY + 100;
            }
        }
    }
    down(83, player1);
    down(40, player2);


    function bubbleKey(keyCode, p) {
       
        if (MyEvent.keyCode == keyCode) {
            if (p.bubbles.length < p.bubbleCount) {
                p.bubbles.push(new Bubble());
                if (p == player1) {
                    bubblePressed = true;
                }
                else if (p == player2) {
                    bubblePressed2 = true;
                }
            }
        }
    }
    bubbleKey(16, player1);
    bubbleKey(13, player2);


}
addEventListener("keydown", MyKeyDownHandler);


// Frame
function Frame() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    drawItems();
    drawBlocks();

    player1.drawPlayer();
    player2.drawPlayer();

    Player1Img.next();
    Player2Img.next()

    // bubbles[] 에는 살아있는 버블만 담겨짐
    if (player1.bubbles.length != 0) {
        var b01 = player1.bubbles[0];
        if (b01.bombTime <= 0 && b01.flowTime <= 0) {
            player1.bubbles.shift();
        }
        if (bubblePressed) {
            for (var i in player1.bubbles) {
                var b = player1.bubbles[i];
                b.dropBubble(1);
            }
        }
    }

    if (player2.bubbles.length != 0) {
        var b02 = player2.bubbles[0];
        if (b02.bombTime <= 0 && b02.flowTime <= 0) {
            player2.bubbles.shift();
        }
        if (bubblePressed2) {
            for (var i in player2.bubbles) {
                var b = player2.bubbles[i];
                b.dropBubble(2);
            }
        }
    }

    player1.takeItem();
    player2.takeItem();

    die(player1);
    die(player2);

}
setInterval(Frame, 1000 / FPS);