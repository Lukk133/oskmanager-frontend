<template>
    <v-container class="koks bg-grey" style="max-width: 28%">
        <v-row class="mt-n6">
            <v-col>
                {{ formatDateDay(ride.startDate) }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                {{ ride.instructor.name }}, {{ ride.instructor.lastName }}
            </v-col>
        </v-row>
        <v-row class="mt-n3">
            <v-col>
                {{ ride?.car?.brand?.name }}, {{ ride?.car?.model?.name }} {{ ride?.car?.registration }}
            </v-col>
        </v-row>
        <v-row class="mt-n3">
            <v-col>
                {{ formatDateHours(ride.startDate, ride.endDate) }}
            </v-col>
        </v-row>
        <v-row class="mt-n3">
            <v-col>
                Lokalizacja domyślna
            </v-col>
        </v-row>
        <v-row class="mt-n3">
            <v-col>
                Odwołaj jazdę
                <DeleteConfimrationDialog :label="`tą jazdę`" @destroy="destroy(ride.id)" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DeleteConfimrationDialog from '../../../ui/dialogs/DeleteConfimrationDialog.vue';
import AvatarInput from '../../../ui/inputs/AvatarInput.vue';


export default {
    components: {
        DeleteConfimrationDialog,
        AvatarInput,
    },
    computed: {
        ride() {
            return this.$store.getters.getRide;
        },
        ridesPagination() {
            return this.$store.getters.getRidesPagination
        }
    },
    methods: {
        delete() {
            console.log("HALO");
            this.$store.commit("destroyRide")
        },
        async destroy(id) {
            console.log("DESTROY");
            console.log(id);
            await this.$store.dispatch("destroyRide", id);
            this.$emit("list");
        },
        formatDateDay(startDateString) {
            const startDate = new Date(startDateString);

            const startDay = ('0' + startDate.getDate()).slice(-2);
            const startMonth = ('0' + (startDate.getMonth() + 1)).slice(-2);
            const startYear = startDate.getFullYear().toString().slice(-2);

            return `${startDay}.${startMonth}.${startYear}`;
        },
        formatDateHours(startDateString, endDateString) {
            const startDate = new Date(startDateString);
            const endDate = new Date(endDateString);
            const startHours = ('0' + startDate.getHours()).slice(-2);
            const startMinutes = ('0' + startDate.getMinutes()).slice(-2);

            const endHours = ('0' + endDate.getHours()).slice(-2);
            const endMinutes = ('0' + endDate.getMinutes()).slice(-2);

            return `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
        },
    },
    mounted() {
        this.$store.dispatch("listRides")
    }
}
</script>
<style>
.koks {
    position: fixed;
    right: 100px;
}
</style>
