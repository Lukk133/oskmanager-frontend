<template>
    <Filter />
    <Messages />
</template>
<script>
import Filter from './Filter.vue'
import Messages from './Messages.vue'
export default {
    components: {
        Filter,
        Messages
    },
    computed: {
        car() {
            return this.$store.getters.getCar
        },
        infos() {
            return [
                {
                    icon: "user.svg",
                    label: `${this.car.brand ? this.car.brand.name : ''} ${this.car.model ? this.car.model.name : ''}`
                },
                {
                    icon: "car.svg",
                    label: `${this.car.brand ? this.car.brand.name : ''}`
                },
                {
                    icon: "message.svg",
                    label: `${this.car?.color}`
                },
                {
                    icon: "category.svg",
                    label: `${this.car?.registration}`
                },
            ]
        }
    },
    data() {
        return {
        }
    },
    methods: {
        getSrc(src) {
            if (!src) {
                return null;
            }
            return `${axios.defaults.baseURL}files?path=${src}`
        },
    }
}
</script>
<style scoped>
.info-label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}
</style>