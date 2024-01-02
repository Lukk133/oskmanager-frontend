<template>
    <div class="d-flex align-center bg-background rounded-lg">
        <v-sheet class="pa-2 ma-2 bg-background">
            <SelectInput @update:model-value="" :title="'Etap jazd'" />
        </v-sheet>
    </div>
    <div class="d-flex">
        <v-sheet class="pa-2 ma-2 d-flex bg-solitude ml-3">
            <FilterButton v-for="(filter, index) in timeFilters" :key="filter.label" :label="filter.label"
                :value="filter.value" :buttonClass="filter.class" :class="{ 'selected-row': index === selectedRowIndex }"
                @updateFilter="handleUpdateFilter" />

        </v-sheet>
        <v-sheet class="pa-2 ma-2 d-flex bg-solitude ml-3">
            <FilterButton v-for="filter in dateFilters" :key="filter.label" :label="filter.label" :value="filter.value"
                :buttonClass="filter.class" @updateFilter="handleUpdateFilter" />
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
                    value: "ASC",
                    class: "left-button"
                },
                {
                    label: "Najstarsze",
                    value: "DESC",
                    class: "right-button"
                },
            ]
        },
    },
    data() {
        return {
            selectedFilter: null,
            selectedRowIndex: null,
        };
    },
    methods: {
        handleUpdateFilter(value) {
            this.selectedFilter = value
            this.$emit("updateFilter", value)
            this.$store.commit("setRidesParams", value)
            console.log('hlao');
            console.log(value);
            //this.$store.commit("")
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
