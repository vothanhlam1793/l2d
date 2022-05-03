var wsin;
var url_control = "ws://ws.uudamstudio.com:1880/control";
function connect() {
    wsin = new WebSocket(url_control);
    wsin.onopen = function() {
        console.log("Open Websocket")
        wsin.send(JSON.stringify({
            type: "REQUEST",
            // device: payload.name,
            status: "STATUS"
        }));
    };

    wsin.onmessage = function(e) {
        var d = {};
        try {
            d = JSON.parse(e.data);
        } catch (e){

        }
        appControl.$store.dispatch("update", d.data);
    };

    wsin.onclose = function(e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    };

    wsin.onerror = function(err) {
        console.log(err);
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        wsin.close();
    };
    return wsin;
}
connect();


Vue.component("device", {
    props: ['name'],
    template: `
        <div>
            <div v-if="status == 'ON'" @click="control('OFF')">
                <img style="width: 50px" src="/js/control/green.png">
            </div>
            <div v-if="status == 'OFF'" @click="control('ON')">
                <img style="width: 50px" src="/js/control/red.png">
            </div>
        </div>
    `,
    computed: {
        status(){
            return this.$store.state.devices[this.$props.name];
        }
    },
    methods: {
        control(status){
            this.$store.dispatch('control', {
                name: this.$props.name,
                status: status
            });
        }
    },
    created(){

    }
});

const store = new Vuex.Store({
    state: {
        devices: {
            POWER1: "OFF",
            POWER2: "OFF", 
            POWER3: "OFF",
            POWER4: "OFF"
        }
    },
    mutations: {
        update(state, payload){
            state.devices[Object.entries(payload)[0][0]] = Object.entries(payload)[0][1];
        }
    },
    actions: {
        control(context, payload){
            wsin.send(JSON.stringify({
                type: "REQUEST",
                device: payload.name,
                status: payload.status
            }));
        },
        update(context, payload){
            context.commit("update", payload);
        }
    }
});
  
var appControl = new Vue({
    el: "#appControl",
    store,
    data: {
        pwd: "",
        auth: localStorage.getItem("authControl"),
        inpPwd: "",
        counter: 0,
        notify: ""
    },
    methods: {
        btnCheck(){
            if(this.pwd == this.inpPwd){
                // Auth
                this.auth = true;
                localStorage.setItem("authControl", true)
            } else {
                if(this.counter > 5){
                    this.notify = "A-hihi - bạn nhập sai nhiều lần rồi!. Có gì hãy liên hệ Lâm - 0932032732 nhé!.";
                    this.counter = 0;
                } else {
                    this.notify = "Bạn nhập sai pass rồi! - lần " + (this.counter ++) + ". Bạn nhập sai 5 lần sẽ có thông tin người viết code nhé!. :D";
                }
            }
        },
        onopen: function(){
            // Goi de lay du lieu
            console.log("READY SOCKET - GET LINK")
            this.socket.send(JSON.stringify({
                type: "request"
            }))
        },
        onmessage: function(event){
            var data;
            var that = this;
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                data = event.data;
            }
            // console.log(data);
            if(data.data){
                data.data.forEach(function(item){
                    if(item.title == "PWD"){
                        that.pwd = item.content;
                        that.socket.close();
                    }
                })
            }
        }
    },
    created(){
        this.socket = new WebSocket("wss://camerangochoang.com:1880/getData");
        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
    }
})