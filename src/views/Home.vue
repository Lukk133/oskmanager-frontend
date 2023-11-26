<template>
    <div>

        HOMEEEEEEEEE
        {{ actualUser }}
        <v-btn @click="logout">Logout</v-btn>
    </div>
</template>
<script>
export default {
    computed: {
        actualUser() {
            return this.$store.getters.getActualUser
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
        }
    }
}
</script>