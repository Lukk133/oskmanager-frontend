<template>
    <div class="d-flex flex-column">
        <RidesFilter />
        <div class="d-flex">
            <RidesList />
            <RidesData />
        </div>
    </div>
</template>
<script>
import RidesFilter from './Filter.vue';
import RidesList from './List.vue';
import RidesData from './Data.vue';
export default {
    components: {
        RidesFilter,
        RidesList,
        RidesData
    },
    computed: {
        instructor() {
            return this.$store.getters.getInstructor
        },
        rides() {
            return this.$store.getters.getRides
        },
        ridesParams() {
            return this.$store.getters.getRidesParams
        }
    },
    methods: {
        listRides() {
            this.$store.dispatch("listRides")
        },
        initRides() {
            this.$store.commit("initRidesParams")
            const id = this.$route.params.id
            this.ridesParams.instructorId = this.instructor.id
            this.listRides()
        },
    },
    mounted() {
        this.initRides()
    }
}
</script>
