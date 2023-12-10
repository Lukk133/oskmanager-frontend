<template>
    <v-sheet v-if="ride" width="160" :height="height" class="bg-background text-left rounded-xl single-ride c-pointer"
        @click="setRide(ride)">
        <icon :icon="isCorrect(ride) ? 'correct' : 'incorrect'" style="position: absolute; right:14px;" />
        <div class="ride-date my-1">
            {{ `${dates.start}-${dates.end}` }}
        </div>
        <div class="ride-address my-1">
            {{ ride.startPlace?.address }}
        </div>
        <StudentItem class="my-1" :student="ride.course.student" :width="30" :height="30" />
        <InstructorItem class="my-1" :instructor="ride.instructor" :width="30" :height="30" />
        <CarItem class="my-1" :car="ride.car" :width="30" :height="30" />
    </v-sheet>
</template>
<script>
import StudentItem from '../ui/student/StudentItem.vue';
import InstructorItem from '../ui/instructor/InstructorItem.vue';
import CarItem from '../ui/car/CarItem.vue';
export default {
    components: {
        StudentItem,
        InstructorItem,
        CarItem
    },
    props: {
        ride: {
            type: Object,
            required: true
        }
    },
    computed: {
        height() {
            const startDate = this.ride.startDate;
            const endDate = this.ride.endDate;


            const differenceInSlots = (endDate - startDate) / (1000 * 60 * 30);
            return differenceInSlots * 43
        },
        dates() {
            if (this.ride) {
                const startDate = this.getDate(this.ride.startDate);
                const endDate = this.getDate(this.ride.endDate);

                return {
                    start: `${startDate}`,
                    end: `${endDate}`
                }
            }
            return null
        }
    },
    methods: {
        setRide(ride) {
            this.$store.commit('setRide', ride)
        },
        getDate(date) {
            return date.format('HH:mm');
        },
        isCorrect(ride) {
            return !ride.cancelled
        },
        zeroFormat(value) {
            if (value >= 10) {
                return value
            }
            return `0${value}`
        }
    }
}
</script>
<style scoped>
.single-ride {
    z-index: 90;
    position: absolute;
    margin-left: 21px;
    margin-top: -20px;
    border: 0.5px solid var(--a, #41494E);

    padding: 7.779px 12.612px 13.733px 11.781px;
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-wrap: wrap;

    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

::-webkit-scrollbar {
    display: none;
}

.ride-date {
    font-size: 12px;
    font-weight: 500;
}
</style>