<template>
    <v-sheet class="bg-white">
        <v-sheet class="bg-white mx-auto">
            <div class="d-flex justify-space-evenly align-center mt-2">
                <v-sheet class="month-name-label" width="150">

                    {{ monthName }}
                    {{ date.year }}
                </v-sheet>
                <v-sheet class="d-flex">
                    <div class="c-pointer mx-1" @click="changeMonth(-1)">
                        <Arrow :direction="'left'" />
                    </div>
                    <div class="c-pointer mx-1" @click="changeMonth(1)">
                        <Arrow :direction="'right'" />
                    </div>
                </v-sheet>
            </div>
            <div class="mx-auto ma-4">
                <table class="calendar mx-auto text-center">
                    <thead class="header ">
                        <tr>
                            <th v-for="(header, index) in    headers   " :key="index">
                                <v-sheet width="25" height="25" :class="[isDisabled(index) ? 'disabled header' : 'header']">
                                    {{ header }}
                                </v-sheet>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="body text-center">
                        <tr v-for="(   week, index   ) in    days   " :key="index">
                            <td v-for="(   day, dayIndex   ) in    week   " :key="dayIndex">
                                <v-sheet v-if="day && isDisabled(dayIndex)" :width="cellWidth" :height="cellWidth"
                                    class=" c-pointer disabled cell clickable rounded-circle d-flex justify-center align-center">
                                    {{ day?.dayNumber }}
                                </v-sheet>
                                <v-sheet v-else-if="day" @click="select(day.dayNumber)" :width="cellWidth"
                                    :height="cellWidth"
                                    :class="[' c-pointer cell', isSelected(day?.dayNumber) ? 'bg-atomic text-white' : ' text-atomic', 'clickable rounded-circle d-flex justify-center align-center']">
                                    {{ day?.dayNumber }}
                                </v-sheet>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-sheet>
    </v-sheet>
</template>
<script>
import Arrow from '../ui/navigation/Arrow.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {
        Arrow
    },
    data() {
        return {
            headers: ["PN", "WT", "ŚR", "CZ", "PT", "SO", "N"],
            days: [],
            width: 394,
            cellWidth: 42,
        }
    },
    computed: {
        date: {
            get() {
                return this.$store.getters.getDate
            }, set(val) {
                this.$store.commit("setDate", val)
            }

        },
        ...mapGetters(['getInstructorsIds', 'getSelectedDates']),
        monthName() {
            const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            return monthNames[this.date.month - 1];
        },
        selectedDates() {
            return this.getSelectedDates;
        }
    },
    methods: {
        ...mapMutations(['addSelectedDate', 'setSelectedDates']),
        isDisabled(dayIndex) {
            return dayIndex > 4
        },
        changed() {
            this.$emit("changed")
        },
        select(dayNumber) {
            const selectedDate = new Date(this.date.year, this.date.month - 1, dayNumber);
            const index = this.selectedDates.findIndex(d => d.getTime() === selectedDate.getTime());

            if (index === -1) {
                if (this.selectedDates.length === 5) {
                    console.log("too much");
                } else {
                    this.addSelectedDate(selectedDate);
                    this.changed()
                }
            } else {
                this.selectedDates.splice(index, 1);
                this.changed()
            }
        },
        hide() {
            this.$emit("hide")
        },
        isSelected(dayNumber) {
            const checkDate = new Date(this.date.year, this.date.month - 1, dayNumber);
            return this.selectedDates.some(d => d.getTime() === checkDate.getTime());
        },
        changeMonth(value) {
            this.date.month += value
            if (this.date.month > 12) {
                this.date.month = 1
                this.date.year += 1
            }
            if (this.date.month < 1) {
                this.date.month = 12
                this.date.year -= 1
            }
            this.getDaysOfMonth()
            this.selectedDates = []
        },
        getDaysOfMonth() {
            var year = this.date.year;
            var month = this.date.month;
            const firstDayOfMonth = new Date(year, month - 1, 1);

            const firstDayOfWeek = firstDayOfMonth.getDay();

            const lastDayOfMonth = new Date(year, month, 0);

            const lastDay = lastDayOfMonth.getDate();

            const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

            const totalDays = daysFromPrevMonth + lastDay;

            const totalWeeks = Math.ceil(totalDays / 7);

            const daysArray = [];
            let dayNumber = 1;
            for (let week = 0; week < totalWeeks; week++) {
                daysArray[week] = [];
                for (let day = 0; day < 7; day++) {
                    if ((week === 0 && day < daysFromPrevMonth) || dayNumber > lastDay) {
                        daysArray[week][day] = null;
                    } else {
                        daysArray[week][day] = { dayNumber: dayNumber, index: (week * 7 + day) };
                        dayNumber++;
                    }
                }
            }

            this.days = daysArray;
        },
        initDate() {
            var date = new Date()
            this.date = {
                year: date.getFullYear(),
                month: date.getMonth() + 1
            }
        },
        initSelectedDates() {
            this.selectedDates = []
        }
    },
    created() {
        this.initDate()
        this.initSelectedDates()
        this.getDaysOfMonth()
    }
}
</script>
<style scoped>
.month-name-label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
}

.header {
    color: var(--a, #41494E);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.disabled {
    opacity: 0.3;
}

.cell {
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>