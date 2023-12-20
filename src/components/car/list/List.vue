<template>
    <div class="mt-4">
        <DataTable :headers="headers">
            <template #body>
                <ctr v-for="(car, index) in cars" :key="car.id" class="text-left">
                    <!---->
                    <ctd>{{ `${index + 1 + carsPagination.size * (carsPagination.page - 1)} .` }}</ctd>
                    <ctd class="d-flex align-center c-pointer" @click="goTo(car.id)">
                        <ctd>{{ car.brand?.name }}</ctd>
                    </ctd>
                    <ctd>{{ car.model?.name }}</ctd>
                    <ctd>{{ car.category?.name }}</ctd>
                    <ctd>{{ $moment(car.createdAt).format("DD.MM.Y") }}</ctd>
                    <ctd>
                        <div>
                            <DeleteConfimrationDialog :label="`Samochód : ${car.brand?.name} ${car.model?.name}`"
                                @destroy="destroy(car.id)" />
                        </div>
                    </ctd>
                </ctr>
            </template>
        </DataTable>
    </div>
</template>

<script>
import DeleteConfimrationDialog from '../../ui/dialogs/DeleteConfimrationDialog.vue';
import DataTable from '../../ui/table/DataTable.vue';


export default {
    components: {
        DeleteConfimrationDialog,
        DataTable
    },
    data() {
        return {
            headers: ["Lp", "Marka", "Model", "Kategoria", "Data dodania", "Akcje"]
        }
    },
    computed: {
        cars() {
            return this.$store.getters.getCars;
        },
        carsPagination() {
            return this.$store.getters.getCarsPagination
        }
    },
    methods: {
        goTo(id) {
            this.$router.push({ name: "CarShow", params: { id: id } })
        },
        async destroy(id) {
            await this.$store.dispatch("deleteCar", id);
            this.$emit("list");
        }
    },
}
</script>
