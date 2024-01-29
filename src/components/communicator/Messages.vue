<template>
    <div>
        <div class="mt-3 ml-2">
            <SearchInput :title="'Wyszukiwarka tekstowa'" :width="maxWidthSearchInput" />
        </div>

        <div class="ml-2 rides-list" style="max-width: 35%">
            <DataTable>
                <template #body>
                    <ctr v-for="(ride, index) in  rides " :key="ride.id" class="text-left c-pointer"
                        :class="{ 'selected-row': index === selectedRowIndex }" @click="setSelectedRide(ride, index)">
                        <!---->
                        <ctd>
                            <AvatarImg />
                        </ctd>
                        <ctd>
                            {{ formatDate(ride.startDate, ride.endDate) }}
                            <StudentItem :student="ride.course.student" :height="height" />
                        </ctd>
                    </ctr>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script>
import SearchInput from "../../components/ui/inputs/SearchInput.vue";
import DeleteConfimrationDialog from '../ui/dialogs/DeleteConfimrationDialog.vue';
import AvatarImg from '../ui/imgs/AvatarImg.vue';
import DataTable from '../instructor/show/rides/Table.vue';
import StudentItem from '../ui/student/StudentItem.vue';
import InstructorItem from '../ui/instructor/InstructorItem.vue';

export default {
    components: {
        SearchInput,
        DeleteConfimrationDialog,
        DataTable,
        StudentItem,
        InstructorItem,
        AvatarImg
    },
    data() {
        return {
            selectedRowIndex: null,
            maxWidthSearchInput: "35%",
        };
    },
    computed: {
        ridesParams() {
            return this.$store.getters.getRidesParams;
        },
        instructor() {
            return this.$store.getters.getInstructor;
        },
        rides() {
            return this.$store.getters.getRides;
        },
        ridesPagination() {
            return this.$store.getters.getRidesPagination;
        },
    },
    methods: {
        listRides() {
            this.$store.dispatch("listRides")
        },
        save() {
            this.$emit("save");
        },
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
            // const startHours = ('0' + startDate.getHours()).slice(-2);
            // const startMinutes = ('0' + startDate.getMinutes()).slice(-2);

            // const endHours = ('0' + endDate.getHours()).slice(-2);
            // const endMinutes = ('0' + endDate.getMinutes()).slice(-2);

            // const formattedHours = `<span class="highlighted-hours">${startHours}:${startMinutes}-${endHours}:${endMinutes}</span>`;

            return `${startDay}.${startMonth}.${startYear}`.replace(/<\/?span[^>]*>/g, '');
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
}
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
