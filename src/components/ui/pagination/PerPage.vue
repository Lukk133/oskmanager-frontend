<template>
    <v-sheet class="d-flex bg-solitude align-center justrify-cetner">
        <div class="mr-2 per-page-label">Wyników na stronę</div>
        <v-sheet class="d-flex bg-background align-center rounded-lg" height="42">
            <v-sheet width="47px" height="36" class="mx-1 d-flex align-center justify-center rounded-lg c-pointer"
                :class="{ 'bg-background': !isChosen(perPage) }" v-for="perPage in perPageOptions" :key="perPage"
                @click="setSize(perPage)">
                {{ perPage }}
            </v-sheet>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    props: {
        perPageOptions: {
            type: Array,
            required: true
        },
        size: {
            required: true
        },
        page: {
            required: true
        }
    },
    emits: ['update:size', 'update:page'],
    methods: {
        isChosen(perPage) {
            return this.size === perPage
        },
        setSize(perPage) {
            if (!this.isChosen(perPage)) {
                this.$emit('update:page', 1);
            }
            this.$emit('update:size', perPage);
        }
    }
}
</script>
<style scoped>
.per-page-label {

    font-family: Rubik;
    font-size: 16px;
}
</style>