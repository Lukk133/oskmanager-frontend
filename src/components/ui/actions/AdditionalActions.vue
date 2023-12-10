<template>
    <v-sheet v-if="!show" @click="open" class="bg-atomic rounded-lg d-flex justify-center align-center c-pointer" width="42"
        height="42">
        <icon :icon="'dots'" />
    </v-sheet>

    <v-sheet v-else @click="close" class="pa-5 bg-atomic rounded-lg  c-pointer d-flex flex-column" width="118" height="104">
        <div class="edit d-flex justify-space-between" @click="edit">
            <icon :icon="'edit'" />
            <div class="">
                Edytuj
            </div>
        </div>
        <div class="delete d-flex justify-space-between mt-auto" @click="destroy">
            <icon :icon="'trash-can'" />
            <div class="">
                Usuń
            </div>
        </div>
    </v-sheet>
    <slot></slot>
</template>
<script>
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        close() {
            this.show = false;
        },
        open() {
            this.show = true;
        },
        edit() {
            this.$emit("edit")
        },
        destroy() {
            this.$emit("destroy")
        },
    }

}
</script>