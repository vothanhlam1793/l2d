Vue.component("wheel", {
    props: ['index'],
    data: function(){
        return {

        }
    },
    computed: {
        button(){
            return this.$store.state.btns[this.$props.index];
        },
    },
    methods: {
        
    },
    template: `
        <div class="wheel">
            <img :src="'/L2D/Material PNG/Wheel/' + index + '.png'">
        </div>
    `
})