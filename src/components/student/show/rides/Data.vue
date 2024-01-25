<template>
    <v-sheet class="d-flex rounded-lg flex-column frame bg-white pa-5" width="645" height="350">
        <div class="mb-6 title">
            {{ formatDateDay(ride.startDate) }}
        </div>
        <div class="subtitle">
            Instruktor
        </div>
        <StudentItem :student="ride.course.instructor" class="mb-2" />
        <div class="subtitle">
            Samochód
        </div>
        <CarItem :car="ride.car" class="mb-2" />
        <!--<div class="mb-2">
            {{ ride?.car?.brand?.name }}, {{ ride?.car?.model?.name }} {{ ride?.car?.registration }}
        </div>-->
        <div class="subtitle">
            Godziny Jazd
        </div>
        <div class="mb-2">
            {{ formatDateHours(ride.startDate, ride.endDate) }}
        </div>
        <div class="subtitle mb-2">
            Lokalizacja
        </div>
        <v-sheet class="cancel-ride bg-solitude rounded-lg center align-center d-flex" width="311" height="60"
            style="font-size: 15px;">
            <div></div>
            <v-icon class="icon ml-5 mr-3" size="small" color="red" icon="mdi-calendar" />
            <div class="pr-16" style="color: red">Odwołaj jazdę</div>
            <div class="arrow-container ml-13">
                <DeleteConfimrationDialog :label="`tą jazdę`" :icon="arrowIcon" @destroy="destroy(ride.id)" />
            </div>
        </v-sheet>
    </v-sheet>
</template>

<script>
import DeleteConfimrationDialog from '../../../instructor/show/rides/DeleteConfirmationDialog.vue';
import AvatarInput from '../../../ui/inputs/AvatarInput.vue';
import StudentItem from '../../../ui/student/StudentItem.vue';
import CarItem from '../../../ui/car/CarItem.vue';


export default {
    components: {
        DeleteConfimrationDialog,
        AvatarInput,
        StudentItem,
        CarItem
    },
    computed: {
        ride() {
            return this.$store.getters.getRide;
        },
        ridesPagination() {
            return this.$store.getters.getRidesPagination
        }
    },
    data() {
        return {
            arrowIcon: `
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M13 6.14286L1 6.14286M13 6.14286L7.85714 11.2857M13 6.14286L7.85714 1" stroke="#E94E31" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
        };
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
.frame {
    font-family: rubik;
}

.subtitle {
    font-weight: 400;
    color: #707070;
    font-size: 12px;
}

.title {
    font-weight: 700;
    font-family: Encode Sans Expanded;
    font-size: 20px;
}

.arrow-container {
    display: flex;
    align-items: center;
}

.arrow-container svg {
    transform: translateY(22%);
}
</style>
