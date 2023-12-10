<template>
    <v-sheet class="bg-color rounded-e-xl" width="400">
        <div class="px-8 py-2">
            <MonthCalendar @changed="listRides" />
            <InstructorsList @changed="listRides" class="ml-4" />
        </div>
    </v-sheet>
</template>
<script>
import MonthCalendar from '../../components/calendar/MonthCalendar.vue';
import InstructorsList from './InstructorsList.vue';
export default {
    components: {
        MonthCalendar,
        InstructorsList
    },
    computed: {
        ridesParams() {
            return this.$store.getters.getRidesParams
        }
    },
    methods: {
        addDaysToDate(date, daysToAdd) {
            const result = new Date(date);
            result.setDate(result.getDate() + daysToAdd);
            return result;
        },
        listRides() {
            const dates = this.$store.getters.getSelectedDates
            const instructorsIds = this.$store.getters.getInstructorsIds
            this.ridesParams.dates = [...dates].map(dateStr => {
                const date = new Date(dateStr);
                const newDate = this.addDaysToDate(date, 1);
                return newDate.toISOString().split('T')[0];
            });
            this.ridesParams.instructorsIds = instructorsIds
            this.$store.dispatch("listRides")
        },
        initRides() {
            this.$store.commit("setRidesPagination")
            this.$store.commit("setRidesParams")
            this.ridesParams.schoolId = this.$route.params.schoolId
            this.listRides()
        }
    },
    mounted() {
        this.initRides()
    }
}
</script>