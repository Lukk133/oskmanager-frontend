<template>
    <div>
        <TextInput v-model="instructorsParams.name" @update:model-value="filter" :label="'Wyszukiwarka tekstowa'"
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
        instructorsParams() {
            return this.$store.getters.getInstructorsParams;
        }
    },
    methods: {
        filter() {
            this.$emit("filter");
        }
    }
}
</script>
