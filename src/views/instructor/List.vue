<template>
    <v-container>
        <v-row>
            <v-col>
                <Header />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <Filter @filter="listInstructors" />
            </v-col>
        </v-row>
        <List @list="listInstructors" />
        <v-row class="mt-16">
            <v-col>
                <Pagination @list="listInstructors" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Filter from '../../components/instructor/list/Filter.vue';
import List from '../../components/instructor/list/List.vue';
import Header from '../../components/instructor/list/Header.vue';
import Pagination from '../../components/instructor/list/Pagination.vue';

export default {
    components: {
        Filter,
        List,
        Pagination,
        Header
    },
    methods: {
        listInstructors() {
            this.$store.dispatch("listInstructors")
                .then(() => {
                    this.updateUrl()
                });
        },
        updateUrl() {
            const pagination = this.$store.getters.getInstructorsPagination;
            this.$router.push({
                path: this.$route.path,
                query: {
                    page: pagination.page.toString(),
                    size: pagination.size.toString()
                }
            });
        }, setPaginationFromUrl() {
            const queryParams = this.$route.query;
            let pagination = this.$store.getters.getInstructorsPagination;

            if (queryParams.page) {
                pagination.page = parseInt(queryParams.page);
            }
            if (queryParams.size) {
                pagination.size = parseInt(queryParams.size);
            }

            this.$store.commit("setInstructorsPagination", pagination);
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId;
            var instructorsParams = this.$store.getters.getInstructorsParams;
            console.log(instructorsParams);
            instructorsParams.schoolId = schoolId;
            this.$store.commit("setInstructorsParams", instructorsParams);
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
        this.setSchoolId();
        this.listInstructors();
    }
}
</script>
