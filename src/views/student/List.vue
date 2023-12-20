<template>
    <v-container>
        <v-row>
            <v-col>
                <Header />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <Filter @filter="listStudents" />
            </v-col>
        </v-row>
        <List @list="listStudents" />
        <v-row class="mt-16">
            <v-col>
                <Pagination @list="listStudents" />
            </v-col>
        </v-row>
    </v-container>
    <!-- <div>
        <Create @created="listStudents" />
    </div>-->
</template>
<script>
import Filter from '../../components/student/List/Filter.vue';
import List from '../../components/student/List/List.vue';
import Pagination from '../../components/student/List/Pagination.vue';
import Header from '../../components/student/List/Header.vue';
export default {
    components: {
        Filter,
        List,
        Header,
        Pagination
    },
    methods: {
        listStudents() {
            this.$store.dispatch("listStudents")
                .then(() => {
                    this.updateUrl()
                })
        },
        updateUrl() {
            const pagination = this.$store.getters.getStudentsPagination;
            this.$router.push({
                path: this.$route.path,
                query: {
                    page: pagination.page.toString(),
                    size: pagination.size.toString()
                }
            })
        },
        setPaginationFromUrl() {
            const queryParams = this.$route.query
            let pagination = this.$store.getters.getCarsPagination;

            if (queryParams.page) {
                pagination.page = parseInt(queryParams.page);
            }
            if (queryParams.size) {
                pagination.size = parseInt(queryParams.size);
            }
            this.$store.commit("setStudentsPagination", pagination);
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId;
            var studentsParams = this.$store.getters.getStudentsParams;
            studentsParams.schoolId = schoolId
            this.$store.commit("setStudentsParams", studentsParams)
        }
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                this.setPaginationFromUrl();
            }
        }
    },
    mounted() {
        this.setSchoolId()
        this.listStudents()
    }
}
</script> 