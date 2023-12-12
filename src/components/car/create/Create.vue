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
                            <v-text-field v-model="car.color" label="Kolor" required></v-text-field>
                            <v-text-field v-model="car.registration" label="Rejestracja"></v-text-field>
                            <v-text-field v-model="car.vin" label="Vin"></v-text-field>

                            <v-select :items="brands" item-value="id" item-title="name" label="Marka" v-model="car.brandId"
                                required @update:model-value="setModelsParams">
                            </v-select>
                            <v-select :items="models" :disabled="models.length === 0" item-value="id" item-title="name"
                                label="Model" v-model="car.modelId" required>
                            </v-select>
                            <v-select :items="gearboxes" item-value="id" item-title="name" label="Rodzaj skrzyni"
                                v-model="car.gearboxId" required>
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
import ValidationSnackbar from '../../ui/snackbars/ValidationSnackbar.vue';

export default {
    components: {
        ValidationSnackbar
    },
    data() {
        return {
            dialog: false,
            valid: true
        };
    },
    computed: {
        car() {
            return this.$store.getters.getCar;
        },
        models() {
            return this.$store.getters.getModels;
        },
        brands() {
            return this.$store.getters.getBrands;
        },
        gearboxes() {
            return this.$store.getters.getGearboxes;
        }
    },
    methods: {
        async save() {
            if (this.$refs.form.validate()) {
                await this.$store.dispatch("createCar")
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
        setModelsParams() {
            var params = this.$store.getters.getModelsParams
            params.brandId = this.car.brandId
            this.$store.commit("setModelsParams", params)
            this.listModels()
        },
        initModelsParams() {
            this.$store.commit("initModelsParams")
        },
        listModels() {
            this.$store.dispatch("listModels")
        },
        listBrands() {
            this.$store.dispatch("listBrands")
        },
        listGearboxes() {
            this.$store.dispatch("listGearboxes")
        },
        init() {
            this.$store.commit("initCar");
            this.initModelsParams()
            this.listModels();
            this.listBrands();
            this.listGearboxes();
        }
    },
};
</script>
