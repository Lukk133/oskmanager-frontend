<template>
    <v-container>
        <v-row>
            <v-col>
                <Header />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <Filter @filterCars="listCars" />
            </v-col>
        </v-row>
        <List @list="listCars" />
        <v-row class="mt-16">
            <v-col>
                <Pagination @list="listCars" />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Filter from '../../components/car/list/Filter.vue';
import List from '../../components/car/list/List.vue';
import Header from '../../components/car/list/Header.vue';
import Pagination from '../../components/car/list/Pagination.vue';

export default {
    components: {
        Filter,
        List,
        Pagination,
        Header
    },
    methods: {
        listCars() {
            this.$store.dispatch("listCars")
                .then(() => {
                    this.updateUrl()
                });
        },
        updateUrl() {
            const pagination = this.$store.getters.getCarsPagination;
            this.$router.push({
                path: this.$route.path,
                query: {
                    page: pagination.page.toString(),
                    size: pagination.size.toString()
                }
            });
        }, setPaginationFromUrl() {
            const queryParams = this.$route.query;
            let pagination = this.$store.getters.getCarsPagination;

            if (queryParams.page) {
                pagination.page = parseInt(queryParams.page);
            }
            if (queryParams.size) {
                pagination.size = parseInt(queryParams.size);
            }

            this.$store.commit("setCarsPagination", pagination);
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId;
            var carsParams = this.$store.getters.getCarsParams;
            carsParams.schoolId = schoolId;
            this.$store.commit("setCarsParams", carsParams);
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
        this.listCars();
    }
}
</script>
