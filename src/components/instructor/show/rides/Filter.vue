<template>
    <div class="d-flex align-center bg-background rounded-lg">
        <v-sheet class="pa-2 ma-2 bg-background">
            <SelectInput @update:model-value="" :title="'Etap jazd'" />
        </v-sheet>
    </div>
    <div class="d-flex">
        <v-sheet class="pa-2 ma-2 d-flex bg-solitude ml-3">
            <FilterButton v-for="(filter, index) in timeFilters" :key="filter.label" :label="filter.label"
                :modelValue="selectedTimeFilter" :value="filter.value" :buttonClass="filter.class"
                :class="{ 'selected-row': index === selectedRowIndex }" @updateFilter="handleTimeFilter" />

        </v-sheet>
        <v-sheet class="pa-2 ma-2 d-flex bg-solitude ml-3">
            <FilterButton v-for="filter in dateFilters" :key="filter.label" :label="filter.label" :value="filter.value"
                :buttonClass="filter.class" :modelValue="selectedDateFilter" @updateFilter="handleDateFilter" />
        </v-sheet>
    </div>
</template>

<script>
import SelectInput from "../../../ui/inputs/SelectInput.vue";
import FilterButton from "./FilterButton.vue";

export default {
    components: {
        SelectInput,
        FilterButton
    },
    props: {
        width: {
            type: Number,
            default: 111
        },
    },
    computed: {
        instructor() {
            return this.$store.getters.getInstructor;
        },
        timeFilters() {
            return [
                {
                    label: "Dzień",
                    value: "DAY",
                    class: "left-button"
                },
                {
                    label: "Tydzień",
                    value: "WEEK"
                },
                {
                    label: "Miesiąc",
                    value: "MONTH",
                    class: "right-button"
                },
            ]
        },
        dateFilters() {
            return [
                {
                    label: "Najnowsze",
                    value: "asc",
                    class: "left-button"
                },
                {
                    label: "Najstarsze",
                    value: "desc",
                    class: "right-button"
                },
            ]
        },
    },
    data() {
        return {
            selectedTimeFilter: null,
            selectedDateFilter: null,
            selectedRowIndex: null,
        };
    },
    methods: {
        listRides() {
            this.$store.dispatch("listRides")
        },
        handleTimeFilter(value) {
            this.selectedTimeFilter = value
            this.$emit("updateFilter", value)
            this.$store.commit("setRidesParams", { dateRange: value })
            this.listRides
        },
        handleDateFilter(value) {
            this.selectedDateFilter = value
            this.$emit("updateFilter", value)
            this.$store.commit("setRidesParams", { sortByDate: value })
            console.log(this.$store.getters.getRidesParams);
            this.listRides
        },

        save() {
            this.$emit("save");
        },
    },
}; 
</script>
<style>
.selected-row {
    background-color: #e8ecf4;
}

.left-button {
    border-radius: 20px 0 0 20px;
}

.right-button {
    border-radius: 0 20px 20px 0;
}
</style>
