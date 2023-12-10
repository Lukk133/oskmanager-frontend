

<template>
    <v-sheet class="bg-solitude ">
        <ModuleTitle :icon="'calendar.svg'" :title="'KALENDARZ'" :label="labeledSelectedDates">
            <template #button>
                <RedirectButton v-if="!canCreate" :label="'Nowa jazda'" @click="isCreating = !isCreating" />
                <CreateDialog v-else @close="closeDialog" @changed="listRides" />
            </template>
        </ModuleTitle>
    </v-sheet>
</template>
<script>
import RedirectButton from '../ui/buttons/RedirectButton.vue';
import ModuleTitle from '../ui/titles/ModuleTitle.vue';
import CreateDialog from '../rides/CreateDialog/CreateDialog.vue';
export default {
    components: {
        ModuleTitle,
        RedirectButton,
        CreateDialog,
    },
    data() {
        return {
            isCreating: false,
        }
    },
    computed: {
        canCreate() {
            return this.isCreating || this.ride.id;
        },
        ride() {
            return this.$store.getters.getRide
        },
        selectedDates() {
            return this.$store.getters.getSelectedDates
        },
        labeledSelectedDates() {
            if (!this.selectedDates || this.selectedDates.length === 0) {
                return '';
            }

            const sortedDates = [...this.selectedDates].sort((a, b) => new Date(a) - new Date(b));

            let labeledDates = [];
            let currentRangeStart = sortedDates[0];
            let currentRangeEnd = sortedDates[0];
            const formatDateDay = (date) => {
                const day = date.getDate();
                return day < 10 ? `0${day}` : `${day}`;
            };

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = formatDateDay(date);
                return `${day}.${month < 10 ? `0${month}` : month}.${year}`;
            };

            const isSameMonth = (start, end) => {
                const startDate = new Date(start);
                const endDate = new Date(end);
                return startDate.getMonth() === endDate.getMonth() &&
                    startDate.getFullYear() === endDate.getFullYear();
            };

            for (let i = 1; i < sortedDates.length; i++) {
                const currentDate = sortedDates[i];
                const nextDay = new Date(currentRangeEnd);
                nextDay.setDate(nextDay.getDate() + 1);

                if (new Date(currentDate).toDateString() === nextDay.toDateString()) {
                    currentRangeEnd = currentDate;
                } else {
                    if (currentRangeStart === currentRangeEnd) {
                        labeledDates.push(formatDate(currentRangeStart));
                    } else if (isSameMonth(currentRangeStart, currentRangeEnd)) {
                        labeledDates.push(`${formatDateDay(currentRangeStart)} - ${formatDate(currentRangeEnd)}`);
                    } else {
                        labeledDates.push(`${formatDate(currentRangeStart)} - ${formatDate(currentRangeEnd)}`);
                    }
                    currentRangeStart = currentDate;
                    currentRangeEnd = currentDate;
                }
            }

            // Handle the final range
            if (currentRangeStart === currentRangeEnd) {
                labeledDates.push(formatDate(currentRangeStart));
            } else if (isSameMonth(currentRangeStart, currentRangeEnd)) {
                labeledDates.push(`${formatDateDay(currentRangeStart)} - ${formatDate(currentRangeEnd)}`);
            } else {
                labeledDates.push(`${formatDate(currentRangeStart)} - ${formatDate(currentRangeEnd)}`);
            }

            return labeledDates.join(', ');
        }
    },
    methods: {
        initRide() {
            this.$store.commit('initRide')
        },
        closeDialog() {
            this.isCreating = false;
            this.initRide()
        },
        listRides() {
            this.$store.dispatch("listRides")
        }
    },
    mounted() {
        // this.initRide()
    }

}
</script>
<style>
.subnavigation-label {
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
</style>