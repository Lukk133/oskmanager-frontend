<template>
    <Pagination v-model:pagination="studentsPagination" v-model:totalElements="studentsTotalElements"
        v-model:totalPages="studentsTotalPages" :perPageOptions="perPageOptions" />
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
        studentsPagination() {
            return this.$store.getters.getStudentsPagination;
        },
        studentsTotalElements() {
            return this.$store.getters.getStudentsTotalElements;
        },
        studentsTotalPages() {
            return this.$store.getters.getStudentsTotalPages;
        },
    },
    watch: {
        studentsPagination: {
            deep: true,
            handler() {
                this.$emit('list');
            }
        }
    },

}
</script>