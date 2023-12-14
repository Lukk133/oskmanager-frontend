<template>
    <div>
        <TextInput v-model="carParams.brand" @update:model-value="filter" :label="'Wyszukiwarka tekstowa'"
            :placeholder="'Szukaj'" />
    </div>
</template>
<script>
import TextInput from "../../ui/inputs/TextInput.vue"
export default {
    components: {
        TextInput
    },
    computed: {
        carParams() {
            return this.$store.getters.getCarsParams;
        }
    },
    methods: {
        filter() {
            this.$emit("filterCars")
        }
    }
}
</script>