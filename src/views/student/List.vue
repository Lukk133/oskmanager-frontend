<template>
    <div>

        <Create @created="listStudents" />
        <Filter @filter="listStudents" />
        <List @list="listStudents" />
    </div>
</template>
<script>
import Filter from '../../components/student/Filter.vue';
import List from '../../components/student/List.vue';
import Create from '../../components/student/Create.vue';
export default {
    components: {
        Filter,
        List,
        Create
    },
    methods: {
        listStudents() {
            this.$store.dispatch("listStudents")
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId;
            var studentsParams = this.$store.getters.getStudentsParams;
            studentsParams.schoolId = schoolId
            this.$store.commit("setStudentsParams", studentsParams)
        }
    },
    mounted() {
        this.setSchoolId()
        this.listStudents()
    }
}
</script> 