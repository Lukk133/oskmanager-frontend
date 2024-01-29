<template>
    <div class="d-flex flex-row align-center bg-background rounded-lg">
        <v-sheet class="pa-2 bg-background ma-2">
            <SelectInput @update:model-value="" title="Grupa odbiorców" />
        </v-sheet>
        <v-sheet class="pa-2 bg-background">
            <SelectInput @update:model-value="" title="Kategoria" />
        </v-sheet>
    </div>
</template>



<script>
import SelectInput from "../../components/ui/inputs/SelectInput.vue";
import SearchInput from "../../components/ui/inputs/SearchInput.vue";

export default {
    components: {
        SelectInput,
        SearchInput
    },
    computed: {
        ridesParams() {
            return this.$store.getters.getRidesParams;
        },
        instructor() {
            return this.$store.getters.getInstructor;
        },
    },
    methods: {
        listRides() {
            this.$store.dispatch("listRides")
        },
        save() {
            this.$emit("save");
        },
    },
}; 
</script>
<style></style>
