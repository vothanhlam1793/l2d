var width = window.innerWidth;
      var height = window.innerHeight;
function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
}
function radians_to_degrees(radians){
    return radians*180/Math.PI;
}
function distance(p1, p2){
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function timboduongthang(p1, p2, A){
    return (p1.y - p2.y)*(A.x - p1.x) + (p2.x - p1.x)*(A.y - p1.y);
}

function hesogoc(p1, p2){
    var vectCP = {
        x: p1.x - p2.x,
        y: p1.y - p2.y
    }
    return vectCP.y / vectCP.x;
}

function giaiphuongtrinhbac2(a, b, c){
    var delta = Math.pow(b, 2) - 4*a*c;
    if(delta < 0){
        return {}
    } else if (delta == 0){
        return {
            x1: -b / (2*a),
            x2: -b / (2*a)
        }
    } else {
        return {
            x1: (-b - Math.sqrt(delta))/(2*a),
            x2: (-b + Math.sqrt(delta))/(2*a),
        }
    }
}

function timdiemgiao2duongtron(_p, _a, s1, s2){
    var s3 = distance(_p, _a);
    // console.log(s1, s2, s3);
    if(s3 <= s1 + s2){
        var A = _a.x - _p.x;
        var B = _a.x + _p.x;
        var C = _a.y - _p.y;
        var D = _a.y + _p.y;
        var E = Math.pow(s1, 2) - Math.pow(s2, 2);
        if(A != 0){
            var F = (-C/A);
            var G = (E + C*D + A*B)/(2*A);
            var H = 1 + Math.pow(F, 2);
            var I = 2*F*(G-_p.x) - 2*_p.y;
            var J = Math.pow(G - _p.x, 2) + Math.pow(_p.y, 2) - Math.pow(s1, 2);
            var y = giaiphuongtrinhbac2(H, I, J);
            // console.log(y);
            if(y.x1 != undefined){
                return [{
                    x: y.x1 * F + G,
                    y: y.x1
                }, {
                    x: y.x2 * F + G,
                    y: y.x2
                }];    
            } else {
                return [];
            }
        } else if (C != 0){
            var K = (E/C + D)/2;
            var L = Math.pow(_p.x, 2) + Math.pow((K - _p.y), 2) - Math.pow(s1, 2);
            var x = giaiphuongtrinhbac2(1, -2*_p.x, L);
            if(x.x1 != undefined){
                return [{
                    y: K,
                    x: x.x1
                }, {
                    y: K,
                    x: x.x2
                }]
            } else {
                return [];
            }
        } else {
            return [];
        }
    } else {
        return [];
    }
}
class TriangleArm {
    constructor(s1, s2, p1, type){
        this.s1 = s1;
        this.s2 = s2;
        this.p1 = p1;
        this.type = type;
    }
    getB(pA){
        if(distance(pA, this.p1) <= this.s1 + this.s2){
            var B = timdiemgiao2duongtron(this.p1, pA, this.s1, this.s2);
            // console.log(B);
            if(B.length > 0){
                var b1 = timboduongthang(pA, this.p1, B[0]) * timboduongthang(pA, this.p1, {x: 0, y: 0});
                if(this.type == "LEFT"){
                    if(b1 > 0){
                        var B = B[0]
                    } else {
                        var B = B[1]
                    }
                } else {
                    if(b1 < 0){
                        var B = B[0]
                    } else {
                        var B = B[1]
                    }
                }
                var b3 = timboduongthang({x: 0, y: 0}, this.p1, B) * timboduongthang({x: 0, y: 0}, this.p1, pA);
                if(b3 > 0){
                    return B;
                } else {
                    return undefined;
                }
            } else {
                console.log("Not merge")
                return undefined;
            }
        } else {
            return undefined;
        }
    }
}

function transfer(deg){
    var ret = 0;
    if(deg < 0){
        ret = deg + 180;
    } else {
        ret = deg;
    }

    // Sync
    return 180 - ret;
}


class DrawTable {
    constructor(){

    }
}

class DrawModel {
    constructor(){

    }
}

class DrawView {
    constructor(ctn){
        this.stage = new Konva.Stage({
            container: ctn,
            width: width,
            height: height,
        });
        this._init();
        this._arm();
        this._inter();
    }
    _init(){
        this.layer = new Konva.Layer({
            // x: 100, y: 100
        });
        this.stage.add(this.layer);
    };
    _arm(){
        this.armLeft = new TriangleArm(270, 290, {x: 410, y: 0}, "LEFT");
        this.armLeft.view = {};
        this.armLeft.view.p1 = new Konva.Circle({
            x: this.armLeft.p1.x,
            y: this.armLeft.p1.y,
            radius: 10,
            fill: "red",
            stroke: "black",
            strokeWidth: 2
        });
        this.layer.add(this.armLeft.view.p1);
        this.line = new Konva.Line({
            points: [this.armLeft.p1.x, this.armLeft.p1.y, 140, 23],
            stroke: 'yellow',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.line1 = new Konva.Line({
            points: [this.armLeft.p1.x, this.armLeft.p1.y, 140, 23],
            stroke: 'green',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.line2 = new Konva.Line({
            points: [this.armLeft.p1.x, this.armLeft.p1.y, 140, 23],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.armRight = new TriangleArm(270, 290, {x: 495, y: 0}, "RIGHT");
        this.armRight.view = {};
        this.armRight.view.p1 = new Konva.Circle({
            x: this.armRight.p1.x,
            y: this.armRight.p1.y,
            radius: 10,
            fill: "red",
            stroke: "black",
            strokeWidth: 2
        });
        this.layer.add(this.armRight.view.p1);
        this.line3 = new Konva.Line({
            points: [this.armRight.p1.x, this.armRight.p1.y, 140, 23],
            stroke: 'yellow',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.line4 = new Konva.Line({
            points: [this.armRight.p1.x, this.armRight.p1.y, 140, 23],
            stroke: 'green',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.line5 = new Konva.Line({
            points: [this.armRight.p1.x, this.armRight.p1.y, 140, 23],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.line6 = new Konva.Line({
            points: [],
            stroke: 'red',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });
        this.layer.add(this.line);
        this.layer.add(this.line1);
        this.layer.add(this.line2);
        this.layer.add(this.line3);
        this.layer.add(this.line4);
        this.layer.add(this.line5);
        this.layer.add(this.line6);
        this.deg1 = new Konva.Text({
            text: 0,
            x: this.armLeft.p1.x,
            y: this.armLeft.view.p1.height() + 10
        })
        this.deg2 = new Konva.Text({
            text: 0,
            x: this.armRight.p1.x,
            y: this.armRight.view.p1.height() + 10
        })
        this.layer.add(this.deg1);
        this.layer.add(this.deg2);
    }
    _inter(){
        var that = this;
        var stateMouse = 0;
        this.stage.on("mousedown", function(){
            stateMouse = 1;
        })
        this.stage.on("mousemove", function(){
            if(stateMouse == 1){
                var mousePos = that.stage.getPointerPosition();
                // console.log(mousePos);
            } else {
                var mousePos = that.stage.getPointerPosition();
                // console.log("NT", mousePos);
                // return;
            }
            var B = that.armLeft.getB(mousePos);
            var B1 = that.armRight.getB(mousePos);
            if((B!= undefined) && (B1 != undefined)){
                that.line.points([that.line.points()[0], that.line.points()[1], mousePos.x, mousePos.y]);
                that.line1.points([that.line.points()[0], that.line.points()[1], B.x, B.y]);
                that.line2.points([B.x, B.y, mousePos.x, mousePos.y]);
            
                that.line3.points([that.line3.points()[0], that.line3.points()[1], mousePos.x, mousePos.y]);
                that.line4.points([that.line3.points()[0], that.line3.points()[1], B1.x, B1.y]);
                that.line5.points([B1.x, B1.y, mousePos.x, mousePos.y]);

                that.line6.points(that.line6.points().concat([mousePos.x, mousePos.y]));
                that.deg1.text(transfer(Math.round(radians_to_degrees(Math.atan(hesogoc(that.armLeft.p1, B))))));
                that.deg2.text(transfer(Math.round(radians_to_degrees(Math.atan(hesogoc(B1, that.armRight.p1))))));    
            }
        })
        this.stage.on("mouseup", function(){
            stateMouse = 0;
        })

    }
}

class DrawController {
    constructor(model, view){
        this.model = model;
        this.view = view;
    }
}

var app = new DrawController(new DrawModel(), new DrawView('container'));