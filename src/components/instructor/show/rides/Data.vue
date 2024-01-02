<template>
    <div class="d-flex rounded-lg flex-column frame">
        <!--margines tło, margines miedzy data i list-->
        <div class="mb-6">
            {{ formatDateDay(ride.startDate) }}
        </div>
        <div class="subtitle">
            Kursant
        </div>
        <div class="mb-2">
            <StudentItem :student="ride.course.student" />
        </div>
        <div class="subtitle">
            Samochód
        </div>
        <div class="mb-2">
            {{ ride?.car?.brand?.name }}, {{ ride?.car?.model?.name }} {{ ride?.car?.registration }}
        </div>
        <div class="subtitle">
            Godziny Jazd
        </div>
        <div class="mb-2">
            {{ formatDateHours(ride.startDate, ride.endDate) }}
        </div>
        <div class="subtitle">
            Lokalizacja domyślna
        </div>
        <div class="cancel-ride bg-solitude rounded-lg">
            <div class="cancel-ride-title mr-4"></div>
            <div class="pr-4" style="color: red">Odwołaj jazdę</div>

            <DeleteConfimrationDialog :label="`tą jazdę`" @destroy="destroy(ride.id)" />
        </div>
    </div>
</template>

<script>
import DeleteConfimrationDialog from '../../../ui/dialogs/DeleteConfimrationDialog.vue';
import AvatarInput from '../../../ui/inputs/AvatarInput.vue';
import StudentItem from '../../../ui/student/StudentItem.vue';


export default {
    components: {
        DeleteConfimrationDialog,
        AvatarInput,
        StudentItem
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
.frame {
    background-color: #FFF;
    font-family: rubik;
    width: 597px;
    height: 350px;
    top: 445px;
    left: 1239px;
    border-radius: 12px;
    padding: 20px;
    position: fixed;
}

.subtitle {
    font-weight: 400;
    color: #707070;
    font-size: 12px;
}

.cancel-ride {
    width: 311px;
    height: 60px;
    display: flex;
    align-items: center;
    /* Align text vertically in the middle */
}

.cancel-ride-title {
    width: 50px;
    height: 12px;
    margin-right: 50px;
    /* Adjust the right margin to move the text more to the right */
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.59px;
}
</style>
