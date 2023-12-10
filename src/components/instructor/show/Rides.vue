<template>
    <div>
        {{ rides }}
    </div>
</template>
<script>
export default {
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
            this.ridesParams.schoolId = this.$route.params.schoolId
            this.ridesParams.instructorId = this.instructor.id
        },
    },
    mounted() {
        this.initRides()
        this.listRides()
    }
}
</script>