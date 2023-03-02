/*
            Thay doi cach tinh toan doi
            A = [x, y]
            => x = A[0]
            => y = A[1]
        */
        

            function tinh_do_dai_doan_thang(A, B){
                var dis = Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2));
                return dis;
            }
    
            // Tra ve goc A
            function goc_tam_giac(a, b, c){
                var rad = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2))/(c*b*2));
                return radian_to_degree(rad);
            }
    
            // Radian to Degree
            function radian_to_degree(rad){
                return rad*180/Math.PI;
            }
function Arm(s, a, b, upAngle, downAngle){
    this.S = [s, 0];
    this.a = a;
    this.b = b;
    this.upAngle = upAngle;
    this.downAngle = downAngle;
    this.oX = 0;
    this.oY = 0;
}

Arm.prototype.getAngle = function(vpA){
    // console.log(vpA);
    var pA = [210 - vpA[0], vpA[1]];
    var oXA = [pA[0], 0];
    var d2 = tinh_do_dai_doan_thang(oXA, pA);
    var d1 = tinh_do_dai_doan_thang(pA, this.S);
    var d3 = tinh_do_dai_doan_thang(this.S, oXA);
    var beta = goc_tam_giac(d1, this.b, this.a);
    var theta = goc_tam_giac(this.b, d1, this.a);
    var omega = radian_to_degree(Math.atan(d2/d3));
    var anpha = theta + omega;
    return {
        right: anpha,
        left: 180 - beta,
    }
}

Arm.prototype.setOffsetPage = function(x, y){
    this.oX = x;
    this.oY = y;
};