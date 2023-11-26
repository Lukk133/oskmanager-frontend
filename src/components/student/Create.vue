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
                            <v-text-field v-model="student.name" :rules="nameRules" label="Name" required></v-text-field>
                            <v-text-field v-model="student.lastName" :rules="lastNameRules" label="Last Name"
                                required></v-text-field>
                            <v-text-field v-model="student.email" :rules="emailRules" label="E-mail"
                                required></v-text-field>
                            <v-text-field v-model="student.phoneNumber" label="Phone Number" required></v-text-field>
                            <v-text-field v-model="student.pesel" label="PESEL" required></v-text-field>
                            <v-text-field v-model="student.pkk" label="PKK" required></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Zamknij</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Zapsiz</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import ValidationSnackbar from '../ui/snackbars/ValidationSnackbar.vue';
export default {
    components: {
        ValidationSnackbar
    },
    data() {
        return {
            dialog: false,
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            lastNameRules: [
                v => !!v || 'Last name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        };
    },
    computed: {
        student() {
            return this.$store.getters.getStudent
        }
    },
    methods: {
        async save() {
            if (this.$refs.form.validate()) {
                const schoolId = this.$route.params.schoolId
                this.student.schoolId = schoolId
                await this.$store.dispatch("createStudent")
                    .then(response => {
                        if (response) {
                            this.$emit("created")
                            this.close()
                        }
                    })
                    .catch(error => {
                        const message = error.message
                        this.showSnackbar(message)
                    })
            }
        },
        showSnackbar(message) {
            this.$store.dispatch("showError", message)
        },
        open() {
            this.dialog = true
            this.init()
        },
        close() {
            this.dialog = false
        },
        init() {
            this.$store.commit("initStudent")
        }
    },
};
</script>
  