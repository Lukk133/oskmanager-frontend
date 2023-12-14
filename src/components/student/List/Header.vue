<template>
    <div>
        <ModuleTitle :icon="'student.svg'" :title="'KURSANCI'" :label="'Lista kursantów'">

            <template #button>
                <RedirectButton @click="goToCreate" :label="'Nowy kursant'" />
            </template>

        </ModuleTitle>
    </div>
</template>
<script>
import RedirectButton from '../../ui/buttons/RedirectButton.vue';
import ModuleTitle from '../../ui/titles/ModuleTitle.vue';
export default {
    components: {
        ModuleTitle,
        RedirectButton
    },
    methods: {
        goToCreate() {
            const schoolId = this.$route.params.schoolId
            this.$router.push({ name: "StudentCreate", params: { schoolId: schoolId } })

        }
    }

}
</script>