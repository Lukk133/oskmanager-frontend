<template>
    <div>
        <ModuleTitle :icon="'car.svg'" :title="'SAMOCHODY'" :label="'Nowy smaochód HALO'"
            :previousRoute="'InstructorsList'">
            <template #navigation>
                <div class="ml-4 mb-2 mt-12 d-flex align-center">
                    <img src="/icons/profile-user.svg" alt="">
                    <div class="ml-2 subnavigation-label">
                        Informacje ogólne
                    </div>
                </div>
            </template>
            <template #button>
                <CreateButton @click="save" />
            </template>
        </ModuleTitle>
    </div>
</template>
<script>
import CreateButton from '../../ui/buttons/CreateButton.vue';
import ModuleTitle from '../../ui/titles/ModuleTitle.vue';
export default {
    components: {
        ModuleTitle,
        CreateButton
    },
    methods: {
        save() {
            this.$emit("save")
        }
    }

}
</script>
<style>
.subnavigation-label {
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
</style>