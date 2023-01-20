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
function Arm(dis, arm1, arm2, upAngle, downAngle){
    this.dis = dis;
    this.a1 = arm1;
    this.a2 = arm2;
    this.upAngle = upAngle;
    this.downAngle = downAngle;
    this.OFFSET = arm1 + arm2;
    this.A1 = [this.OFFSET, 0];
    this.A2 = [this.A1[0] + this.dis, 0];
    this.oX = 0;
    this.oY = 0;
}

Arm.prototype.getAngle = function(vpA){
    var pA = [vpA[0] + this.oX, vpA[1] + this.oY];
    // console.log(A);
    var d1 = tinh_do_dai_doan_thang(this.A1, pA);
    var d2 = tinh_do_dai_doan_thang(this.A2, pA);
    var alpha_1 = goc_tam_giac(this.a2, this.a1, d1);
    var alpha_2 = goc_tam_giac(d2, this.dis, d1);
    var alpha_3 = goc_tam_giac(d1, this.dis, d2);
    var alpha_4 = goc_tam_giac(this.a2, this.a1, d2);
    var alpha_5 = goc_tam_giac(this.a1, this.a2, d1);
    var alpha_6 = goc_tam_giac(this.a1, this.a2, d2);
    var left = alpha_1 + alpha_2;
    var right = 180 - (alpha_3 + alpha_4)
    // console.log(vpA, left, right);
    return {
        right: left,
        left: right,
        // alpha_5,
        // alpha_6,
        // alpha_7: 180 - (alpha_2 + alpha_3)
    }
}

Arm.prototype.setOffsetPage = function(x, y){
    this.oX = x;
    this.oY = y;
};