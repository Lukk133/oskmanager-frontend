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
import Header from '../../components/car/show/Header.vue'
import Main from '../../components/car/show/Main.vue'
//import Documents from '../../components/car/Show/Documents.vue'
export default {
    components: {
        Header,
        Main,
        //     Documents,
    },
    computed: {
        car() {
            return this.$store.getters.getCar
        }
    },
    methods: {
        isActual(name) {
            return this.$route.query.tab == name
        },
        getCar() {
            const id = this.$route.params.id
            this.$store.dispatch("getCar", id)
        }
    },
    mounted() {
        this.getCar()
    }
}

</script>