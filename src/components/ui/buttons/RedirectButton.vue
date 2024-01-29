<template>
    <v-sheet class="c-pointer bg-arsenic rounded-lg px-4 d-flex justify-space-evenly align-center" width="166" height="41"
        @click="goTo(redirectRoute)">
        <div class="mr-3 mt-1">
            <img :src="'/icons/plus.svg'" alt="">
        </div>
        <div class="redirect-btn-label">
            {{ label }}
        </div>
    </v-sheet>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        redirectRoute: {
            type: String,
            required: false
        }
    },
    methods: {
        goTo(route) {
            if (route) {

                this.$router.push({ name: route })
            }
        }
    }
}
</script>
<style scoped>
.redirect-btn-label {


    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>