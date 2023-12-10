<template>
    <div>
        <v-text-field v-model="schoolsParams.name" @update:model-value="filter" clearable label="Nazwa szkoły">
        </v-text-field>
    </div>
</template>
<script>
export default {
    computed: {
        schoolsParams() {
            return this.$store.getters.getSchoolsParams
        }
    },
    methods: {
        filter() {
            this.$emit("filter")
        }
    }
}
</script>