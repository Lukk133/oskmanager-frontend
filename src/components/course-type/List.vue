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
                <tr v-for="courseType in courseTypes" :key="courseType.id">
                    <td>{{ courseType.id }}</td>
                    <td>{{ courseType.name }}</td>
                    <td>{{ courseType.estimatedTime }}</td>
                    <td>{{ courseType.cost }}</td>
                    <td>{{ courseType.express ? "Ekspresowy" : "Normalny" }}</td>
                    <td>
                        <div>
                            <DeleteConfimrationDialog :label="`Kurs : ${courseType.name}`"
                                @destroy="destroy(courseType.id)" />
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
            headers: ["Id", "Nazwa", "Czas", "Koszt", "Tryb", "Akcje"]
        }
    },
    computed: {
        courseTypes() {
            return this.$store.getters.getCourseTypes;
        }
    },
    methods: {
        async destroy(id) {
            await this.$store.dispatch("deleteCourseType", id)
            this.$emit("list")
        },
    },
}
</script>