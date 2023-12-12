<template>
    <div>
        <ModuleTitle :icon="'car.svg'" :title="'SAMOCHODY'" :label="'Lista samochodów'">

            <template #button>
                <RedirectButton @click="goToCreate" :label="'Nowy samochód'" />
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
            this.$router.push({ name: "CarCreate", params: { schoolId: schoolId } })
        }
    }

}
</script>