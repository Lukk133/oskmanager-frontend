<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="">
            <v-btn size="x-small" icon="mdi-trash-can" @click="open"> </v-btn>
        </template>

        <v-card>
            <v-card-text>
                Czy napewno chcesz usunać {{ label }} ?
            </v-card-text>

            <v-card-actions>
                <v-btn @click="close" color="primary">
                    Zamknij
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn @click="destroy" color="error">
                    Usuń</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        label: {
            required: true
        }
    },
    data() {
        return {
            dialog: false
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