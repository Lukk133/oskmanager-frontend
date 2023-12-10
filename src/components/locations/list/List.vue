<template>
    <div class="mt-4">
        <Filter @filter="listLocations" />
        <DataTable :headers="headers" :items="locations">
            <template #body>
                <ctr v-for="(location, index) in locations" :key="location.id">
                    <ctd>{{ `${index + 1 + locationsPagination.size * (locationsPagination.page - 1)} .` }}</ctd>
                    <ctd>{{ location.address }}</ctd>
                    <ctd>{{ location.city.name }}</ctd>
                    <ctd>
                        <div>
                            <DeleteConfimrationDialog :label="`Lokalizacja : ${location.address}`"
                                @destroy="destroy(location.id)" />
                        </div>
                    </ctd>
                </ctr>
            </template>
        </DataTable>
        <Pagination @list="listLocations" />
    </div>
</template>

<script>
import DeleteConfimrationDialog from '../../ui/dialogs/DeleteConfimrationDialog.vue';
import DataTable from '../../ui/table/DataTable.vue';
import Filter from './Filter.vue';
import Pagination from "./Pagination.vue"
export default {
    components: {
        DeleteConfimrationDialog,
        DataTable,
        Filter,
        Pagination
    },
    data() {
        return {
            headers: ["", "Adres", "Miasto", "Akcje"]
        }
    },
    computed: {
        locations() {
            return this.$store.getters.getLocations;
        },
        locationsPagination() {
            return this.$store.getters.getLocationsPagination
        }
    },
    methods: {
        async destroy(id) {
            await this.$store.dispatch("deleteLocation", id);
            this.listLocations();
        },
        updateUrl() {
            const pagination = this.$store.getters.getLocationsPagination;
            this.$router.push({
                path: this.$route.path,
                query: {
                    page: pagination.page.toString(),
                    size: pagination.size.toString()
                }
            });
        },
        setPaginationFromUrl() {
            const queryParams = this.$route.query;
            let pagination = this.$store.getters.getLocationsPagination;

            if (queryParams.page) {
                pagination.page = parseInt(queryParams.page);
            }
            if (queryParams.size) {
                pagination.size = parseInt(queryParams.size);
            }

            this.$store.commit("setLocationsPagination", pagination);
        },
        listLocations() {
            this.$store.dispatch("listLocations")
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
        this.listLocations();
    }
}
</script>
