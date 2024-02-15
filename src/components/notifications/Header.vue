<template>
    <div class="ma-3">
        <ModuleTitle :icon="'bell.svg'" :title="'Powiadomienia'" />
    </div>
</template>
<script>
import ModuleTitle from '../ui/titles/ModuleTitle.vue';

export default {
    components: {
        ModuleTitle,
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