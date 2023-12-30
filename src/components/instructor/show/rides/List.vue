<template>
    <div class="mt-4" style="max-width: 60%">
        <DataTable :headers="headers">
            <template #body>
                <ctr v-for="(ride, index) in rides" :key="ride.id" class="text-left c-pointer"
                    :class="{ 'selected-row': index === selectedRowIndex }" @click="setSelectedRide(ride, index)">
                    <!---->
                    <ctd>{{ formatDate(ride.startDate, ride.endDate) }} </ctd>
                    <ctd>Lokalizacja domyślna</ctd>
                    <AvatarInput />
                    <ctd>
                        {{ ride.instructor.name }}, {{ ride.instructor.lastName }} 3/30
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
import AvatarInput from '../../../ui/inputs/AvatarInput.vue';


export default {
    components: {
        DeleteConfimrationDialog,
        DataTable,
        AvatarInput
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
            return this.$store.getters.getRidesPagination
        }
    },
    methods: {
        goTo(id) {
            this.$router.push({ name: "CarsShow", params: { id: id } })
        },
        setSelectedRide(ride, index) {
            this.$store.commit("setRide", ride);
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

            return `${startDay}.${startMonth}.${startYear} ${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
        }
    },
    mounted() {
        this.$store.dispatch("listRides")
    }
}
</script>
<style scoped>
.selected-row {
    background-color: #E8ECF4;
    /*           "background": "#E8ECF4",
        "solitude": "#F5F7FA",
        "arsenic": "#41494E",
        "forsetGreen": "#2A9A2F",
        "atomic": "#3C4B52" */
}
</style>
