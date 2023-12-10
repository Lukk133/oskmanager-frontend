<template>
    <div>
        <Header />
        <div class="courses-types" v-if="isActual('course-types')">
            <CreateCourseType @created="listCourseTypes" />
            <ListCourseType @list="listCourseTypes" />
        </div>
        <div class="locations" v-else-if="isActual('locations')">
            <LocationsList />
        </div>
    </div>
</template>
<script>
import Header from "../../components/school/settings/Header.vue"
import ListCourseType from "../../components/course-type/List.vue"
import CreateCourseType from "../../components/course-type/Create.vue"
import LocationsList from "../../components/locations/list/List.vue"
export default {
    components: {
        Header,
        ListCourseType,
        CreateCourseType,
        LocationsList,
    },
    methods: {
        isActual(name) {
            return this.$route.query.tab == name
        },
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