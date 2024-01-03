<template>
    <div class="mt-n3 rides-list" style="max-width: 57%"><!--Dodać że route params id do jazd-->
        <DataTable :headers="headers">
            <template #body>
                <ctr v-for="(ride, index) in rides" :key="ride.id" class="text-left c-pointer"
                    :class="{ 'selected-row': index === selectedRowIndex }" @click="setSelectedRide(ride, index)">
                    <!---->
                    <ctd>{{ formatDate(ride.startDate, ride.endDate) }} </ctd>
                    <ctd>Lokalizacja domyślna</ctd>
                    <ctd>
                        <StudentItem :student="ride.course.student" />
                    </ctd>
                    <ctd>{{ ride.car.brand.name }} {{ ride.car.model.name }} {{ ride.car.registration }}</ctd>
                </ctr>
            </template>
        </DataTable>
    </div>
</template>

<script>
import DeleteConfimrationDialog from '../../../ui/dialogs/DeleteConfimrationDialog.vue';
import DataTable from './Table.vue';
import StudentItem from '../../../ui/student/StudentItem.vue';

export default {
    components: {
        DeleteConfimrationDialog,
        DataTable,
        StudentItem,
    },
    data() {
        return {
            selectedRowIndex: null,
        };
    },
    computed: {
        rides() {
            return this.$store.getters.getRides;
        },
        ridesPagination() {
            return this.$store.getters.getRidesPagination;
        },
    },
    methods: {
        goTo(id) {
            this.$router.push({ name: 'CarsShow', params: { id: id } });
        },
        setSelectedRide(ride, index) {
            this.$store.commit('setRide', ride);
            this.selectedRowIndex = index;
            console.log(this.$store.getters.getRide);
        },
        formatDate(startDateString, endDateString) {
            const startDate = new Date(startDateString);
            const endDate = new Date(endDateString);

            const startDay = ('0' + startDate.getDate()).slice(-2);
            const startMonth = ('0' + (startDate.getMonth() + 1)).slice(-2);
            const startYear = startDate.getFullYear().toString().slice(-2);
            const startHours = ('0' + startDate.getHours()).slice(-2);
            const startMinutes = ('0' + startDate.getMinutes()).slice(-2);

            const endHours = ('0' + endDate.getHours()).slice(-2);
            const endMinutes = ('0' + endDate.getMinutes()).slice(-2);

            const formattedHours = `<span class="highlighted-hours">${startHours}:${startMinutes}-${endHours}:${endMinutes}</span>`;

            return `${startDay}.${startMonth}.${startYear} ${formattedHours}`.replace(/<\/?span[^>]*>/g, '');
        },
        async selectTopRow() {
            this.$nextTick(() => {
                if (this.rides.length > 0) {
                    this.$store.commit('setRide', this.rides[0]);
                    console.log(this.rides[0]);
                    this.selectedRowIndex = 0;
                }
            });
        },
    },
    watch: {
        rides: 'selectTopRow',
    },
    mounted() {
        this.$store.dispatch('listRides');
    },
};
</script>

<style scoped>
.selected-row {
    background-color: #e8ecf4;
}

.rides-list {
    flex: 1;
    margin-right: 16px;
}

.highlighted-hours {
    font-weight: bold;
}
</style>
