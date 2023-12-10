<template>
    <v-sheet width="0" height="750" class="bg-solitude main-content">
        <div v-if="selectedDates.length > 0 && instructorsIds.length > 0">
            <table class="text-center">
                <thead>
                    <tr>
                        <td v-for="(selectedDate, index) in selectedDates" :key="index"
                            :colspan="(instructorsIds.length + (index == 0 ? 1 : 0))">
                            <div class="calendar-day-name">
                                {{ getDayNameInPolish(selectedDate) }}
                            </div>
                            <div class="calendar-date-name">
                                {{ `${selectedDate.getDate()}.${selectedDate.getMonth() + 1}` }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td v-for="(date, index) in instructorInDates" :key="index" class="instructor-cell">
                            <InstructorItem :instructor="date.instructor" />
                        </td>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(timeSlot, index ) in timeOptions" :key="index">
                        <td class="time-slot-cell">
                            {{ timeSlot }}
                        </td>

                        <td v-for="(instructorDate, index) in instructorInDates" :key="index" class="relative-cell">
                            <SingleInfoRide v-if="getRide(instructorDate.date, instructorDate.instructor, timeSlot)"
                                :ride="getRide(instructorDate.date, instructorDate.instructor, timeSlot)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-sheet>
</template>
<script>
import SingleInfoRide from "../rides/SingleInfo.vue"
import InstructorItem from "../ui/instructor/InstructorItem.vue"
export default {
    components: {
        SingleInfoRide,
        InstructorItem,
    },
    data() {
        return {
            startHour: 8,
            endTime: 20,
            interval: 30,
        }
    },
    computed: {
        timeOptions() {
            return this.getTimeOptions(this.startHour, 0)
        },
        rides() {
            return this.$store.getters.getRides
        },
        selectedDates() {
            return this.$store.getters.getSelectedDates.sort(
                (a, b) => a - b
            )
        },
        instructorsIds() {
            return this.$store.getters.getInstructorsIds
        },
        instructors() {
            return this.$store.getters.getInstructors;
        },
        selectedInstructors() {
            const idToNameMap = new Map(this.instructors.map(instructor => [instructor.id, instructor]));

            return this.instructorsIds.map(id => idToNameMap.get(id) || 'Unknown');
        },
        instructorInDates() {
            const instructorInDates = [];
            for (var i = 0; i < this.selectedDates.length; i++) {
                for (var j = 0; j < this.selectedInstructors.length; j++) {
                    instructorInDates.push({ date: this.selectedDates[i], instructor: this.selectedInstructors[j] })
                }
            }
            return instructorInDates;
        }
    },
    methods: {
        getRide(date, instructor, timeSlot) {
            const [hours, minutes] = timeSlot.split(':').map(Number);
            const rideDate = this.$moment(date).tz('Europe/Warsaw').hours(hours).minutes(minutes);

            return this.rides.find((ride) => {
                // if (!Array.isArray(ride.startDate)) return false;
                // const [year, month, day, hour, minutes] = 
                // const rideStartDate = this.$moment.tz([year, month - 1, day, hour, minutes, 0], 'Europe/Warsaw');
                return ride.startDate.isSame(rideDate, 'minute') &&
                    ride.instructor.id === instructor.id;
            });

        },
        getDayNameInPolish(date) {
            return date.toLocaleDateString('pl-PL', { weekday: 'long' });
        },
        getTimeOptions(startHour, startMinute) {
            const times = []
            let currentDate = new Date();
            currentDate.setHours(startHour, startMinute, 0, 0); // Set start time

            while (currentDate.getHours() < this.endTime) {
                const formattedTime = currentDate.toLocaleTimeString('pl-PL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                times.push(formattedTime);

                currentDate.setMinutes(currentDate.getMinutes() + this.interval);
                currentDate.setSeconds(0)
            }
            return times;
        },
    }
}
</script>
<style scoped>
.main-content::-webkit-scrollbar-track {
    background-color: #F5F7FA;
}

.main-content::-webkit-scrollbar-thumb {
    background-color: #BEBDBD;
    border-radius: 10px;
}

.main-content::-webkit-scrollbar-thumb:hover {
    background-color: #BEBDBD;
}

.main-content::-webkit-scrollbar {
    width: 6px;
    height: 8px;
}

.relative-cell {
    position: relative;
}

.time-slot-cell {
    height: 45px;
}

.instructor-cell {
    width: 200px;
    min-width: 200px;
}

.main-content {
    flex-grow: 1;
    overflow-x: auto;
    white-space: nowrap;

}

.calendar-day-name {
    color: var(--Style, #9B9B9B);
    text-align: center;
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.calendar-date-name {
    color: var(--Style, #9B9B9B);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}

table {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    border-spacing: 0;
}

table tr td:first-child,
table tr th:first-child {
    border-left: 0;
}

td {
    /* border-width: 0.5px; */
    border: 0.5px solid rgba(155, 155, 155, 0.3);
}
</style>