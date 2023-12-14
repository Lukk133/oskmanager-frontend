<template>
    <div class="mt-4">
        <DataTable :headers="headers">
            <template #body>
                <ctr v-for="(student, index) in students" :key="student.id">
                    <ctd>{{ `${index + 1 + studentsPagination.size * (studentsPagination.page - 1)} .` }}</ctd>
                    <ctd>{{ `${student.name} ${student.lastName}` }}</ctd>
                    <ctd>{{ $moment(student.createdAt).format('DD-MM-Y') }}</ctd>
                    <ctd>
                        <div>
                            <DeleteConfimrationDialog :label="`Szkołę : ${student.name}`" @destroy="destroy(student.id)" />
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
            headers: ["Lp", "Imię i nazwisko", "Data dodania", "Akcje"]
        }
    },
    computed: {
        students() {
            return this.$store.getters.getStudents;
        },
        studentsPagination() {
            return this.$store.getters.getStudentsPagination;
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