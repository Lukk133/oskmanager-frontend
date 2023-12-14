<template>
    <div>
        <TextInput v-model="studentsParams.name" @update:model-value="filter" :label="'Wyszukiwarka tekstowa'"
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
        studentsParams() {
            return this.$store.getters.getStudentsParams
        }
    },
    methods: {
        filter() {
            this.$emit("filter")
        }
    }
}
</script>