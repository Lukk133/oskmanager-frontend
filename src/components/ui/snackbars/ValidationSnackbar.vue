<template>
    <div class="text-center" v-if="isAuthenticated && actualUser.id && error && error.length > 0">
        <v-snackbar v-model="showError" timeout="3000" color="error" location="top">
            {{ error }}
        </v-snackbar>
    </div>
</template>
<script>
export default {
    computed: {
        showError: {
            get() {
                return this.$store.getters.getShowError;
            },
            set(val) {
                this.$store.commit("setShowError", val)
            }
        },
        error() {
            return this.$store.getters.getError;
        },
        isAuthenticated() {
            return this.$store.getters.getIsAuthenticated
        },
        actualUser() {
            return this.$store.getters.getActualUser
        }
    },
    methods: {
        open(error) {
            this.showError = true;
            this.error = error;
        }
    }
}
</script>