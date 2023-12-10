<template>
    <v-sheet :width="sheetWidth" :height="sheetHeight" class="bg-background rounded-lg d-flex custom-pagination">
        <v-sheet :width="sheetWidth / 2" :height="sheetHeight"
            class="bg-background rounded-lg align-center d-flex justify-center">
            {{ page }}
        </v-sheet>
        <v-sheet :width="sheetWidth / 2" :height="sheetHeight"
            class="bg-background rounded-lg align-center d-flex justify-center">
            <v-sheet :width="36" :height="36" class=" rounded-lg align-center d-flex justify-center">
                {{ `/${totalPages}` }}
            </v-sheet>

        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
    props: {
        page: {
            required: true
        },
        totalPages: {
            required: true

        }
    },
    data() {
        return {
            sheetWidth: 84,
            sheetHeight: 42
        }
    }
}
</script>

<style>
.custom-pagination {
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>