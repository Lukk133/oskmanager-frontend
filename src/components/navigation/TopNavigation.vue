<template>
    <v-app-bar color="background" elevation="0" style="z-index:1000">
        <template v-slot:append>
            <UserAvatar v-if="isAuthenticated" />
        </template>
    </v-app-bar>
</template>
<script>
import UserAvatar from './UserAvatar.vue';
export default {
    components: {
        UserAvatar
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.getIsAuthenticated
        }
    }
}

</script>