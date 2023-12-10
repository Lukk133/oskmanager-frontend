<template>
    <Pagination v-model:pagination="locationsPagination" v-model:totalElements="locationsTotalElements"
        v-model:totalPages="locationsTotalPages" :perPageOptions="perPageOptions" />
</template>

<script>
import Pagination from "../../ui/pagination/Pagination.vue"

export default {
    components: {
        Pagination
    },
    data() {
        return {
            perPageOptions: [5, 10, 20]
        }
    },
    computed: {
        locationsPagination() {
            return this.$store.getters.getLocationsPagination;
        },
        locationsTotalElements() {
            return this.$store.getters.getLocationsTotalElements;
        },
        locationsTotalPages() {
            return this.$store.getters.getLocationsTotalPages;
        },
    },
    watch: {
        locationsPagination: {
            deep: true,
            handler() {
                this.$emit('list');
            }
        }
    },
}
</script>
