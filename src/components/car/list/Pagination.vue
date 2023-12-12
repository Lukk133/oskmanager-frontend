<template>
    <Pagination v-model:pagination="carsPagination" v-model:totalElements="carsTotalElements"
        v-model:totalPages="carsTotalPages" :perPageOptions="perPageOptions" />
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
        carsPagination() {
            return this.$store.getters.getCarsPagination;
        },
        carsTotalElements() {
            return this.$store.getters.getCarsTotalElements;
        },
        carsTotalPages() {
            return this.$store.getters.getCarsTotalPages;
        },
    },
    watch: {
        carsPagination: {
            deep: true,
            handler() {
                this.$emit('list');
            }
        }
    },

}
</script>