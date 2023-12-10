<template>
    <div class="mt-4">
        <v-table fixed-header>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in students" :key="student.id">
                    <td>{{ index + 1 }}.</td>
                    <td>{{ `${student.name} ${student.lastName}` }}</td>
                    <td>{{ $moment(student.createdAt).format('DD-MM-Y') }}</td>
                    <td>
                        <div>
                            <DeleteConfimrationDialog :label="`Szkołę : ${student.name}`" @destroy="destroy(student.id)" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
<script>
import DeleteConfimrationDialog from '../../ui/dialogs/DeleteConfimrationDialog.vue';
export default {
    components: {
        DeleteConfimrationDialog
    },
    data() {
        return {
            headers: ["Lp", "Imię i nazwisko", "Data dodania", "Akcje"]
        }
    },
    computed: {
        students() {
            return this.$store.getters.getStudents;
        }
    },
    methods: {
        async destroy(id) {
            await this.$store.dispatch("deleteStudent", id)
            this.$emit("list")
        }
    },
}
</script>