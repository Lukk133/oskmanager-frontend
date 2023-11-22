<template>
    <v-app>
        <div class="mx-auto">
            <v-btn>
                PRZYCISK
            </v-btn>
            <InfoSnackbar />
            <ValidationSnackbar />
            <router-view></router-view>
        </div>
    </v-app>
</template>
<script>
import ValidationSnackbar from "../components/ui/snackbars/ValidationSnackbar.vue"
import InfoSnackbar from "../components/ui/snackbars/InfoSnackbar.vue"

export default {
    components: {
        ValidationSnackbar,
        InfoSnackbar,
    },
}
</script>
