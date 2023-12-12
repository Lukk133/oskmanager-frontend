<template>
    <div class="d-flex justify-space-between align-center">
        <div class="total-elements-label">
            {{ `Znaleziono łącznie ${totalElements}` }}
        </div>
        <div class="d-flex">
            <div class="mx-1">
                <Arrows :left="true" v-model:page="pagination.page" :totalPages="totalPages" />
            </div>
            <div class="mx-1">
                <Page :page="pagination.page" :totalPages="totalPages" />
            </div>
            <div class="mx-1">
                <Arrows v-model:page="pagination.page" :totalPages="totalPages" />
            </div>
        </div>
        <PerPage :perPageOptions="perPageOptions" v-model:size="pagination.size" v-model:page="pagination.page" />
    </div>
</template>
<script>
import Arrows from './Arrows.vue';
import Page from './Page.vue';
import PerPage from './PerPage.vue';
export default {
    props: {
        pagination: {
            required: true
        },
        totalPages: {
            required: true
        },
        totalElements: {
            required: true
        },
        perPageOptions: {
            type: Array,
            required: true
        }

    },
    emits: ['update:pagination'],
    components: {
        Arrows,
        Page,
        PerPage
    },
    methods: {
        setPage() {

        }
    }
}
</script>
<style scoped>
.total-elements-label {

    font-family: Rubik;
    font-size: 16px;
}
</style>