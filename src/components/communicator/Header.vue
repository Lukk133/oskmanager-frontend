<template>
    <div class="ma-3">
        <ModuleTitle :icon="'comunicator.svg'" :title="'Komunikator'" :label="'Czaty'">
            <template #button>
                <RedirectButton :width="279" :label="'wiadomość dla wielu odbiorców'" />
            </template>
        </ModuleTitle>
    </div>
</template>
<script>
import RedirectButton from '../ui/buttons/RedirectButton.vue';
import ModuleTitle from '../ui/titles/ModuleTitle.vue';

export default {
    components: {
        ModuleTitle,
        RedirectButton
    },
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