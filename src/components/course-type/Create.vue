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
                            <v-text-field v-model="courseType.name" label="Nazwa" required></v-text-field>
                            <v-text-field v-model="courseType.cost" :rules="costRules" label="Koszt"
                                required></v-text-field>
                            <v-text-field v-model="courseType.estimatedTime" :rules="timeRules" label="Czas"
                                required></v-text-field>
                            <v-switch v-model="courseType.express" label="Express"></v-switch>
                            <v-select :items="categories" item-value="id" item-title="name" label="Kategoria"
                                v-model="courseType.categoryId" required>
                            </v-select>
                            <v-select :items="gearboxes" item-value="id" item-title="name" label="Rodzaj skrzyni"
                                v-model="courseType.gearboxId">
                            </v-select>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Zamknij</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Zapisz</v-btn>
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
            costRules: [
                v => !!v || 'Cost is required',
                v => !isNaN(parseFloat(v)) || 'Cost must be a number',
            ],
            timeRules: [
                v => !!v || 'Estimated time is required',
            ],
        };
    },
    computed: {
        courseType() {
            return this.$store.getters.getCourseType;
        },
        gearboxes() {
            return this.$store.getters.getGearboxes
        },
        categories() {
            return this.$store.getters.getCategories
        },
    },
    methods: {
        async save() {
            if (this.$refs.form.validate()) {
                const schoolId = this.$route.params.schoolId
                this.courseType.schoolId = schoolId
                await this.$store.dispatch("createCourseType")
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
        listGearboxes() {
            this.$store.dispatch("listGearboxes")
        },
        listCategories() {
            this.$store.dispatch("listCategories")
        },
        init() {
            this.$store.commit("initCourseType");
            this.listGearboxes()
            this.listCategories()
        }
    },
};
</script>
