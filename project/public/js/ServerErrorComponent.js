
Vue.component('errors', {

    data() {
        return {
            text: '',

        };
    },

    methods: {
        setText(value) {
            this.text = value;
        }
    },

    template: `
        <div class="error-block" v-if="text">
                    <p class="error-msg">
                    <button class="close-btn-error" @click="setText('')">&times;</button>
                    {{text}}
                    </p>
                </div>`
});