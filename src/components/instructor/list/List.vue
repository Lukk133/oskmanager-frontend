<template>
    <div class="mt-4">
        <DataTable :headers="headers" :items="instructors">
            <template #body>

                <ctr v-for="(instructor, index) in instructors" :key="instructor.id">
                    <ctd>{{ `${index + 1 + instructorsPagination.size * (instructorsPagination.page - 1)} .` }}</ctd>
                    <ctd class="d-flex align-center c-pointer" @click="goTo(instructor.id)">
                        <AvatarImg :obj="instructor" class="mx-1" />
                        {{ `${instructor.name} ${instructor.lastName}` }}
                    </ctd>
                    <ctd>{{ $moment(instructor.createdAt).format("DD-MM-Y") }}</ctd>
                    <ctd>{{ instructor.category?.name }}</ctd>
                    <ctd>
                        <div>
                            <DeleteConfimrationDialog :label="`Instruktora : ${instructor.name}`"
                                @destroy="destroy(instructor.id)" />
                        </div>
                    </ctd>
                </ctr>
            </template>
        </DataTable>
    </div>
</template>

<script>
import AvatarImg from '../../ui/imgs/AvatarImg.vue';
import DeleteConfimrationDialog from '../../ui/dialogs/DeleteConfimrationDialog.vue';
import DataTable from '../../ui/table/DataTable.vue';


export default {
    components: {
        AvatarImg,
        DeleteConfimrationDialog,
        DataTable
    },
    data() {
        return {
            headers: ["", "Imię i nazwisko", "Data dodania", "Kategoria", "Akcje"]
        }
    },
    computed: {
        instructors() {
            return this.$store.getters.getInstructors;
        },
        instructorsPagination() {
            return this.$store.getters.getInstructorsPagination
        }
    },
    methods: {
        goTo(id) {
            this.$router.push({ name: "InstructorShow", params: { id: id } })
        },
        async destroy(id) {
            await this.$store.dispatch("deleteInstructor", id);
            this.$emit("list");
        }
    },
}
</script>
