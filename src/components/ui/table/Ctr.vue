<template>
    <div class="divRow" :style="borderBottomStyle">
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            borderWidth: 7
        }
    },
    computed: {
        borderBottomStyle() {
            return `border-bottom:${this.borderWidth}px solid ${this.$vuetify.theme.current.colors.solitude};border-top:${this.borderWidth}px solid ${this.$vuetify.theme.current.colors.solitude};`;
        }
    }

}
</script>