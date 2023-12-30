<template>
    <!--<DatePicker />-->
    <v-container class="mt-n5">
        <v-row class="mt-n9 bg-grey">
            <v-col cols="4">
                <div class="d-flex align-center">
                    <v-sheet class="pa-2 ma-2">
                        <SelectInput @update:model-value="listCars" :title="'Etap jazd'" />
                    </v-sheet>
                    <v-sheet class="pa-2 ma-2">
                        <SelectInput :width="width" @update:model-value="listCars" placeholder="od"
                            :title="'Termin rozpoczęcia jazd'" />
                    </v-sheet>
                    <v-sheet class="pa-2 mt-10 d-flex">
                        <SelectInput :width="width" @update:model-value="listCars" placeholder="do" />
                    </v-sheet>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-n7">
            <v-col cols="4">
                <v-sheet class="pa-2 ma-2 d-flex">
                    <button class="filter-button left-button">Dzień</button>
                    <button class=" filter-button week-button">Tydzień</button>
                    <button class=" filter-button month-button mr-4">Miesiąc</button>
                    <button class="filter-button new-button">Najnowsze</button>
                    <button class=" filter-button old-button">Najstarsze</button>
                </v-sheet>
            </v-col>
            <v-col cols="4">

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SelectInput from "../../../ui/inputs/SelectInput.vue";
import DatePicker from "../../../ui/pickers/DatePicker.vue";
import SaveButton from "../../../ui/buttons/SaveButton.vue";

export default {
    components: {
        SelectInput,
        SaveButton
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
    },
    methods: {
        save() {
            this.$emit("save");
        },
    },
}; 
</script>
<style>
.subnavigation-label {
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.v-text-field {
    margin: 0;
    padding: 0;
}

.filter-button {
    color: #E8ECF4;
    width: 77px;
    height: 35px;
    padding: 9px, 20px, 9px, 20px;
    gap: 10px;
    background-color: #9B9B9B;
}

.left-button {
    border-radius: 20px 0 0 20px;
}

.month-button {
    border-radius: 0 20px 20px 0;
    width: 90px;
}

.week-button {
    border-radius: 0px;
    width: 90px;
}

.new-button {
    border-radius: 20px 0 0 20px;
    width: 110px;
}

.old-button {
    border-radius: 0 20px 20px 0;
    width: 108px;
}
</style>



