<template>
    <div>
        <Create @created="listInstructors" />
        <Filter @filter="listInstructors" />
        <List @list="listInstructors" />
    </div>
</template>

<script>
import Filter from '../../components/instructor/Filter.vue';
import List from '../../components/instructor/List.vue';
import Create from '../../components/instructor/Create.vue';

export default {
    components: {
        Filter,
        List,
        Create
    },
    methods: {
        listInstructors() {
            this.$store.dispatch("listInstructors");
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId;
            var instructorsParams = this.$store.getters.getInstructorsParams;
            instructorsParams.schoolId = schoolId;
            this.$store.commit("setInstructorsParams", instructorsParams);
        }
    },
    mounted() {
        this.setSchoolId();
        this.listInstructors();
    }
}
</script>
