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
import Header from '../../components/student/show/Header.vue'
import Main from '../../components/student/show/Main.vue'
import Documents from '../../components/student/show/Documents.vue'
import Rides from '../../components/student/show/rides/Main.vue'
export default {
    components: {
        Header,
        Main,
        Documents,
        Rides
    },
    computed: {
        student() {
            return this.$store.getters.getStudent
        }
    },
    methods: {
        isActual(name) {
            return this.$route.query.tab == name
        },
        getStudent() {
            const id = this.$route.params.id
            this.$store.dispatch("getStudent", id)
        }
    },
    mounted() {
        this.getStudent()
    }
}

</script>