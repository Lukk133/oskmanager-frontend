<template>
    <div>
        <Header />
        <div class="ml-10 mt-10">
            <Main v-if="isActual(null)" />
            <Documents v-if="isActual('documents')" />
            <Rides v-if="isActual('rides')" />
        </div>
    </div>
</template>
<script>
import Header from '../../components/instructor/show/Header.vue'
import Main from '../../components/instructor/show/Main.vue'
import Documents from '../../components/instructor/show/Documents.vue'
import Rides from '../../components/instructor/show/rides/Main.vue'
export default {
    components: {
        Header,
        Main,
        Documents,
        Rides
    },
    computed: {
        instructor() {
            return this.$store.getters.getInstructor
        }
    },
    methods: {
        isActual(name) {
            return this.$route.query.tab == name
        },
        getInstructor() {
            const id = this.$route.params.id
            this.$store.dispatch("getInstructor", id)
        }
    },
    mounted() {
        this.getInstructor()
    }
}

</script>