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
                <tr v-for="instructor in instructors" :key="instructor.id">
                    <td>{{ instructor.id }}</td>
                    <td>{{ `${instructor.name} ${instructor.lastName}` }}</td>
                    <td>{{ $moment(instructor.createdAt).format("DD-MM-Y") }}</td>
                    <td>{{ instructor.courseType?.name }}</td>
                    <td>
                        <div>
                            <DeleteConfimrationDialog :label="`Instruktora : ${instructor.name}`"
                                @destroy="destroy(instructor.id)" />
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
            headers: ["Lp", "Imię i nazwisko", "Data dodania", "Kurs", "Akcje"]
        }
    },
    computed: {
        instructors() {
            return this.$store.getters.getInstructors;
        }
    },
    methods: {
        async destroy(id) {
            await this.$store.dispatch("deleteInstructor", id);
            this.$emit("list");
        }
    },
}
</script>
