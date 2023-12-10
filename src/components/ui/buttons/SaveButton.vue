<template>
    <v-sheet class="c-pointer bg-arsenic rounded-lg d-flex align-center justify-center" width="83" height="41">
        {{ label }}
    </v-sheet>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: "Zapisz"
        }
    }
}
</script>