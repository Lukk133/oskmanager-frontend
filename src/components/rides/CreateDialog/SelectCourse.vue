<template>
    <SelectSearchInput v-model:searchValue="coursesParams.studentFullName" @update:searchValue="listCourses"
        :editable="editable" v-model:selectedItem="ride.course" :items="courses" :icon="'loop'" ref="input">
        <template #selected>
            <div v-if="ride.course">
                <StudentItem :student="ride.course?.student"
                    :additionalInfo="`${ride.course.totalRideHours}/${ride.course.courseType.estimatedTime}`" />
            </div>
        </template>
        <template #list>
            <v-sheet class="bg-solitude c-pointer" v-for="course in courses" :key="course.id"
                v-if="courses.length > 0 && !ride.course" @click="select(course)">
                <StudentItem :student="course?.student" class="my-2"
                    :additionalInfo="`${course.totalRideHours}/${course.courseType.estimatedTime}`" />
            </v-sheet>
            <v-sheet v-else-if="courses.length === 0 && !ride.course">
                Nie znaleziono
            </v-sheet>
        </template>
    </SelectSearchInput>
</template>
<script>
import SelectSearchInput from '../../ui/inputs/SelectSearchInput.vue'

import StudentItem from '../../ui/student/StudentItem.vue'
export default {
    props: {
        editable: {
            type: Boolean,
            default: true
        }
    },
    components: {
        StudentItem,
        SelectSearchInput
    },
    computed: {
        ride() {
            return this.$store.getters.getRide
        },
        courses() {
            return this.$store.getters.getCourses
        },
        coursesParams() {
            return this.$store.getters.getCoursesParams
        },
        coursesPagination() {
            return this.$store.getters.getCoursesPagination
        },
    },
    methods: {
        select(course) {
            if (this.editable) {
                this.$refs.input.select(course)
            }
        },
        listCourses() {
            if (this.editable) {

                this.$store.dispatch("listCourses")
            }
        },
        initCourses() {
            this.$store.commit("initCoursesParams")
            const schoolId = this.$route.params.schoolId
            this.coursesParams.schoolId = schoolId
            this.$store.commit("initCoursesPagination")
            this.coursesPagination.size = 3;

            this.listCourses()
        }
    },
    mounted() {
        this.initCourses()
    }
}
</script>