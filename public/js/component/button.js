Vue.component("button-control", {
    props: ['index'],
    data: function(){
        return {
            type: "b",
            showr: "none",
            showb: "block"
        }
    },
    computed: {
        button(){
            return this.$store.state.btns[this.$props.index];
        },
    },
    methods: {
        btnState(state){
            switch(state){
                case "DOWN": {
                    this.showr = "block";
                    this.showb = "none";
                } break;
                case "UP": {
                    this.showr = "none";
                    this.showb = "block";
                } break;
            }
            this.controlRobot(state);
        },
        controlRobot(state){
            switch(state){
                case "DOWN": {
                    wsin.send(this.index);
                } break;
                case "UP": {
                    wsin.send(5);
                } break;
            }
        },
        getStyle(){
            var ret = "l2d_style";
            switch(this.$props.index){
                case "1": {
                    ret += " l2d_top l2d_left";
                } break;
                case "2": {
                    ret += " l2d_top l2d_middle";
                } break;
                case "3": {
                    ret += " l2d_top l2d_right";
                } break;
                case "4": {
                    ret += " l2d_left l2d_center"
                } break;
                case "5": {
                    ret += " l2d_middle l2d_center";
                } break;
                case "6": {
                    ret += " l2d_right l2d_center";
                } break;
                case "7": {
                    ret += " l2d_left l2d_bottom";
                } break;
                case "8": {
                    ret += " l2d_middle l2d_bottom";
                } break;
                case "9": {
                    ret += " l2d_bottom l2d_right";
                } break;
            }
            return ret;
        }
    },
    template: `
    <div
        class="control-button-index"
        @touchstart="btnState('DOWN')"
        @touchend="btnState('UP')"
    >

        <img :class="getStyle()" :style="'display: ' + showr" :src="'/L2D/Material PNG/Button/' + index + '-r.png'">            
        <img :class="getStyle()" :style="'display: ' + showb" :src="'/L2D/Material PNG/Button/' + index + '-b.png'">            
    </div>
    `
})