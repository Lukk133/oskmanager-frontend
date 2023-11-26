<template>
    <div>
        <v-text-field v-model="studentsParams.name" @update:model-value="filter" clearable label="Imię ">
        </v-text-field>
    </div>
</template>
<script>
export default {
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