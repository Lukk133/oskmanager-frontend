<template>
    <div>
        <TextInput v-model="locationsParams.address" @update:model-value="filter" :label="'Wyszukiwarka tekstowa'"
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
        locationsParams() {
            return this.$store.getters.getLocationsParams;
        }
    },
    methods: {
        filter() {
            this.$emit("filter");
        },
        initParams() {
            this.$store.commit("initLocationsParams")
        }
    },
    mouted() {
        this.initParams()
    }
}
</script>
