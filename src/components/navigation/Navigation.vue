<template>
    <v-navigation-drawer>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item v-for="( module, index ) in modules " :key="index" :prepend-icon="module.icon"
                :title="module.title" @click="goTo(module.name)"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    computed: {
        modules() {
            return this.$store.getters.getModules;
        }
    },
    methods: {
        goTo(name) {
            const requireSchoolId = this.checkIfRequireSchoolId(name)
            const schoolId = localStorage.getItem("schoolId")
            if (requireSchoolId && schoolId) {

                this.$router.push({ name: name, params: { schoolId: schoolId } })
            } else if (!requireSchoolId) {
                this.$router.push({ name: name })
            }
        },
        checkIfRequireSchoolId(name) {
            const routes = this.$router.options.routes;

            const route = routes.find(r => r.name === name);

            if (route.path.includes(':schoolId')) {
                return true
            } else {
                return false
            }

        }
    }
}
</script>