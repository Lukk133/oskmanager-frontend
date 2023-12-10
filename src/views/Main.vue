<template>
    <v-app>
        <div class="d-flex flex-row">
            <SideNavigation />
            <div class="d-flex flex-column flex-grow-1">
                <TopNavigation />
                <InfoSnackbar />
                <ValidationSnackbar />
                <v-main class="fill-height">
                    <v-sheet min-height="80vh" class="bg-solitude rounded-xl ma-6 pa-6">
                        <router-view></router-view>
                    </v-sheet>
                </v-main>
            </div>
        </div>
    </v-app>
</template>
  
<script>
import ValidationSnackbar from "../components/ui/snackbars/ValidationSnackbar.vue"
import InfoSnackbar from "../components/ui/snackbars/InfoSnackbar.vue"
import SideNavigation from "../components/navigation/SideNavigation.vue"
import TopNavigation from "../components/navigation/TopNavigation.vue"
import ModuleTitle from "../components/ui/titles/ModuleTitle.vue"

export default {
    components: {
        ValidationSnackbar,
        InfoSnackbar,
        SideNavigation,
        TopNavigation, ModuleTitle
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.getIsAuthenticated
        },
        modules() {
            return this.$store.getters.getModules
        },
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
<style>
@import "../styles/main.css";
@import "../styles/fonts.css";
</style>