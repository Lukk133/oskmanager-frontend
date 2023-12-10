
<template>
    <v-sheet width="133" height="41"
        class="c-pointer rounded-lg bg-forsetGreen create-btn align-center justify-center d-flex">
        <div>
            {{ label }}
        </div>
    </v-sheet>
</template>
<script>
export default {
    props: {
        label: {
            default: "Zapisz zmiany"
        }
    }
}
</script>
<style>
.create-btn {
    font-family: Rubik;
    font-size: 14px;
}
</style>