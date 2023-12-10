

<template>
    <div>
        <ModuleTitle :icon="'instructor.svg'" :title="'INSTRUKTORZY'" :label="'Nowy Instruktor'"
            :previousRoute="'InstructorsList'">
            <template #navigation>
                <Navigation class="mt-12" />
            </template>
            <template #button>
                <AdditionalActions />
            </template>
        </ModuleTitle>
    </div>
</template>
<script>
import CreateButton from '../../ui/buttons/CreateButton.vue';
import ModuleTitle from '../../ui/titles/ModuleTitle.vue';
import Navigation from './Navigation.vue';
import AdditionalActions from '../../ui/actions/AdditionalActions.vue';
export default {
    components: {
        ModuleTitle,
        CreateButton,
        Navigation,
        AdditionalActions
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