<template>
    <div class="d-flex align-center bg-background rounded-lg">
        <v-sheet class="pa-2 ma-2 bg-background">
            <SelectInput @update:model-value="" :title="'Etap jazd'" />
        </v-sheet>
    </div>
    <div class="d-flex">
        <v-sheet class="pa-2 ma-2 d-flex bg-solitude ml-3">
            <FilterButton v-for="(filter, index) in timeFilters" :key="filter.label" :label="filter.label"
                :modelValue="ridesParams.dateRange" :value="filter.value" :buttonClass="filter.class"
                :class="{ 'selected-row': index === selectedRowIndex }" @updateFilter="handleTimeFilter" />

        </v-sheet>
        <v-sheet class="pa-2 ma-2 d-flex bg-solitude ml-3">
            <FilterButton v-for="filter in dateFilters" :key="filter.label" :label="filter.label" :value="filter.value"
                :buttonClass="filter.class" :modelValue="ridesParams.sortByDate" @updateFilter="handleDateFilter" />
        </v-sheet>
    </div>
</template>

<script>
import SelectInput from "../../../ui/inputs/SelectInput.vue";
import FilterButton from "../../../instructor/show/rides/FilterButton.vue";

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
        ridesParams() {
            return this.$store.getters.getRidesParams;
        },
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
                    class: "newest-button"
                },
                {
                    label: "Najstarsze",
                    value: "desc",
                    class: "oldest-button"
                },
            ]
        },
    },
    data() {
        return {
            selectedRowIndex: null,
        };
    },
    methods: {
        listRides() {
            this.$store.dispatch("listRides")
        },
        handleTimeFilter(value) {
            if (this.ridesParams.dateRange === value) {
                this.ridesParams.dateRange = null
            } else { this.ridesParams.dateRange = value }
            console.log(this.$store.getters.getRidesParams);
            this.listRides()
        },
        handleDateFilter(value) {
            if (this.ridesParams.sortByDate === value) {
                this.ridesParams.sortByDate = null
            } else { this.ridesParams.sortByDate = value }
            console.log(this.$store.getters.getRidesParams);
            this.listRides()
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

.newest-button {
    border-radius: 20px 0 0 20px;
    width: 110px;
}

.right-button {
    border-radius: 0 20px 20px 0;
}

.oldest-button {
    border-radius: 0 20px 20px 0;
    width: 108px;
}
</style>
