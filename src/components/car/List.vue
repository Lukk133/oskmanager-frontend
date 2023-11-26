<template>
    <div class="mt-4">
        <v-table fixed-header>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header" class="text-center">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="car in cars" :key="car.id">
                    <td>{{ car.id }}</td>
                    <td>{{ car.brand?.name }}</td>
                    <td>{{ car.model?.name }}</td>
                    <td>{{ car.category?.name }}</td>
                    <td>{{ $moment(car.createdAt).format("DD.MM.Y") }}</td>
                    <td>
                        <div>
                            <DeleteConfimrationDialog :label="`Samochód : ${car.brand?.name} ${car.model?.name}`"
                                @destroy="destroy(car.id)" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
import DeleteConfimrationDialog from '../ui/dialogs/DeleteConfimrationDialog.vue';

export default {
    components: {
        DeleteConfimrationDialog
    },
    data() {
        return {
            headers: ["Lp", "Marka", "Model", "Kategoria", "Data dodania", "Akcje"]
        }
    },
    computed: {
        cars() {
            return this.$store.getters.getCars;
        }
    },
    methods: {
        async destroy(id) {
            await this.$store.dispatch("deleteCar", id);
            this.$emit("list");
        }
    },
}
</script>
