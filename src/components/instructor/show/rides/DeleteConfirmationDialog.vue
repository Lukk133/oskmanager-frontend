<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="">
            <v-btn size="x-small" :src="src" :icon="icon" @click="open">
                <div v-html="icon"></div>
            </v-btn>
        </template>
        <v-card>
            <v-card-text class="text-center">
                Czy napewno chcesz usunać {{ label }} ?
            </v-card-text>

            <v-card-actions class="d-flex align-center justify-center">
                <v-btn @click="destroy" width="195" class="bg-atomic delete-button" height="48"><!--width=188-->
                    <img src="../../../../assets/icons/trash-can.svg" class="mr-2" /> <!--inaczej nwm jak do konca-->
                    <span class="confirm-delete">Tak</span>, chcę usunąć
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        label: {
            required: true
        },
        icon: {
            default: "mdi-trash-can"
        }
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        open() {
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        },
        destroy() {
            this.$emit("destroy")
            this.close()
        }
    }
}
</script>
<style>
.delete-button {
    border-radius: 12px;
    font-family: Rubik;
    font-weight: 400;
    text-transform: lowercase;
}

.confirm-delete {
    text-transform: capitalize;
}
</style>