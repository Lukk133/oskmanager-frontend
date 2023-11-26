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
                <tr v-for="school in schools" :key="school.id">
                    <td>{{ school.id }}</td>
                    <td>{{ school.name }}</td>
                    <td>{{ school.code }}</td>
                    <td>{{ school.numberOfInstructors }}</td>
                    <td>{{ school.numberOfStudents }}</td>
                    <td>
                        <div>
                            <DeleteConfimrationDialog :label="`Szkołę : ${school.name}`" @destroy="destroy(school.id)" />
                            <v-btn size="x-small" icon="mdi-arrow-left" @click="goTo(school.id)"></v-btn>
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
            headers: ["Id", "Nazwa", "Kod", "Ilość instruktorów", "Ilość kursantów", "Akcje"]
        }
    },
    computed: {
        schools() {
            return this.$store.getters.getSchools;
        }
    },
    methods: {
        async destroy(id) {
            await this.$store.dispatch("deleteSchool", id)
            this.$emit("list")
        },
        goTo(id) {
            localStorage.setItem("schoolId", id)
            this.$router.push({ name: "SchoolProfile", params: { id: id } })
        }
    },
}
</script>