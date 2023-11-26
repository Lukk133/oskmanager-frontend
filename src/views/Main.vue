<template>
    <v-app>
        <div class="mx-auto">
            <Navigation />
            <InfoSnackbar />
            <ValidationSnackbar />
            <router-view></router-view>
        </div>
    </v-app>
</template>
<script>
import ValidationSnackbar from "../components/ui/snackbars/ValidationSnackbar.vue"
import InfoSnackbar from "../components/ui/snackbars/InfoSnackbar.vue"
import Navigation from "../components/navigation/Navigation.vue"

export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters.getIsAuthenticated
        }
    },
    components: {
        ValidationSnackbar,
        InfoSnackbar,
        Navigation
    },
    mounted() {
        const token = localStorage.getItem('access_token');
        if (token) {
            this.$store.commit('setIsAuthenticated', true);
            this.$store.dispatch("getActualUser")
        }
    }
}
</script>
