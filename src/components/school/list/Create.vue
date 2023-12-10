<template>
    <div>
        <ValidationSnackbar />
        <v-dialog v-model="dialog" persistent max-width="600px">

            <template v-slot:activator="">
                <v-btn size="x-small" icon="mdi-plus" @click="open"> </v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-form ref="form" v-model="valid">
                            <v-text-field v-model="school.name" :rules="nameRules" label="Nazwa" required></v-text-field>
                            <v-text-field v-model="school.location.address" label="Adress" required></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Zamnkij</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Zapisz</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ValidationSnackbar from '../../ui/snackbars/ValidationSnackbar.vue';

export default {
    components: {
        ValidationSnackbar
    },
    data() {
        return {
            dialog: false,
            valid: true,
            nameRules: [
                v => !!v || 'School name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        };
    },
    computed: {
        school() {
            return this.$store.getters.getSchool;
        }
    },
    methods: {
        async save() {
            if (this.$refs.form.validate()) {
                await this.$store.dispatch("createSchool")
                    .then(response => {
                        this.$emit("created");
                        this.close();
                    })
                    .catch(error => {
                        const message = error.message;
                        this.showSnackbar(message);
                    });
            }
        },
        showSnackbar(message) {
            this.$store.dispatch("showError", message);
        },
        open() {
            this.dialog = true;
            this.init();
        },
        close() {
            this.dialog = false;
        },
        init() {
            this.$store.commit("initSchool");
        }
    },
};
</script>
