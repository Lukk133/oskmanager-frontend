<template>
    <v-navigation-drawer v-if="modules?.length > 0" color="background" permanent floating style="z-index:200" app>
        <v-list density="compact" nav class="mt-16">
            <v-list-item v-for="( moduleElement, index ) in modules " :key="index" :title="moduleElement.title"
                @click="goTo(moduleElement.name)">

                <template v-slot:prepend>
                    <span v-if="moduleElement?.icon">
                        <img :src="getIconSrc(moduleElement)" class="mx-2">
                    </span>
                </template></v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>
<script>
export default {
    computed: {
        modules() {
            return this.$store.getters.getModules;
        },
    },
    methods: {
        getIconSrc(module) {
            if (module.icon && module.name) {
                let premessage = module.name === this.$route.name ? 'active-' : ''
                return `/icons/${premessage}${module.icon}`
            }
            return ""
        },
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