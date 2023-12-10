<template>
    <ModuleTitle :icon="'gear.svg'" :title="'Ustawienia'" :label="label">
        <template #navigation>
            <Navigation class="mt-12" />
        </template>
    </ModuleTitle>
</template>
<script>
import ModuleTitle from '../../ui/titles/ModuleTitle.vue';
import Navigation from './Navigation.vue';
export default {
    props: {
        label: {
            type: String,
            default: "Ustawienia"
        }
    },
    components: {
        ModuleTitle,
        Navigation
    }
}
</script>