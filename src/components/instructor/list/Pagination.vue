<template>
    <Pagination v-model:pagination="instructorsPagination" v-model:totalElements="instructorsTotalElements"
        v-model:totalPages="instructorsTotalPages" :perPageOptions="perPageOptions" />
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
        instructorsPagination() {
            return this.$store.getters.getInstructorsPagination;
        },
        instructorsTotalElements() {
            return this.$store.getters.getInstructorsTotalElements;
        },
        instructorsTotalPages() {
            return this.$store.getters.getInstructorsTotalPages;
        },
    },
    watch: {
        instructorsPagination: {
            deep: true,
            handler() {
                this.$emit('list');
            }
        }
    },

}
</script>