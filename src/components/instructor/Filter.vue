<template>
    <div>
        <v-text-field v-model="instructorsParams.name" @update:model-value="filter" clearable label="Imię ">
        </v-text-field>
    </div>
</template>

<script>
export default {
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
