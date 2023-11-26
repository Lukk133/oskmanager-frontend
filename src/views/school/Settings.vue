<template>
    <div>
        <CreateCourseType @created="listCourseTypes" />
        <ListCourseType @list="listCourseTypes" />
    </div>
</template>
<script>
import ListCourseType from "../../components/courseType/List.vue"
import CreateCourseType from "../../components/courseType/Create.vue"
export default {
    components: {
        ListCourseType,
        CreateCourseType
    },
    methods: {
        listCourseTypes() {
            this.$store.dispatch("listCourseTypes")
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId
            var params = this.$store.getters.getCourseTypesParams
            params.schoolId = schoolId;
            this.$store.commit("setCourseTypesParams", params)
        }
    },
    mounted() {
        this.setSchoolId()
        this.listCourseTypes()
    }
}

</script>