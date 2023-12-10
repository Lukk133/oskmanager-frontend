<template>
    <div>
        <ModuleTitle :icon="'instructor.svg'" :title="'INSTRUKTORZY'" :label="'Lista instruktorów'">
            <template #button>
                <RedirectButton @click="goToCreate" :label="'Nowy instruktor'" />
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
            this.$router.push({ name: "InstructorCreate", params: { schoolId: schoolId } })

        }
    }

}
</script>