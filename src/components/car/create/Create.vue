<template>
    <div>
        <!--Awatar-->
        <v-sheet>
            <ValidationForm ref="form">
                <TextInput :rules="['required', 'max']" :label="'Model'" :placeholder="'Podaj model samochodu'"
                    v-model="car.model" ref="nameInput" />
                <TextInput :rules="['required', 'max']" :label="'Marka'" :placeholder="'Podaj markę smochodu'"
                    v-model="car.brand" ref="lastNameInput" />
                <TextInput :rules="['required']" :label="'Kolor'" :placeholder="'Podaj kolor samochodu'" v-model="car.color"
                    ref="lastNameInput" />
                <TextInput :rules="['required']" :label="'Tablica rejestracyjna'"
                    :placeholder="'Podaj tablicę rejestracyjną'" v-model="car.registration" ref="courseTypeInput" />
                <TextInput :rules="['required']" :label="'Numer VIN'" :placeholder="'Podaj Numer VIN'" v-model="car.vin"
                    ref="courseTypeInput" />
                <SelectInput :items="instructors" :rules="['required']" v-model="car.instructor" ref="courseTypeInput"
                    :title="'Przypisanie głównego instruktora'" />
                <v-btn @click="createCar()" class="c-pointer mt-5">Dodaj samochód</v-btn>
            </ValidationForm>
        </v-sheet>
    </div>
</template>
<!--<template>
    <div>
        <ValidationSnackbar />
    </div>
</template>-->

<script>
import TextInput from "../../ui/inputs/TextInput.vue"
import ValidationSnackbar from '../../ui/snackbars/ValidationSnackbar.vue';
import AvatarInput from "../../ui/inputs/AvatarInput.vue"
import ValidationForm from "../../ui/forms/ValidationForm.vue"
import SelectInput from "../../ui/inputs/SelectInput.vue"
import axios from "axios"

export default {
    components: {
        ValidationSnackbar,
        AvatarInput,
        ValidationForm,
        SelectInput,
        TextInput
    },
    data() {
        return {
            dialog: false,
            valid: true
        };
    },
    computed: {
        categories() {
            return this.$store.getters.getCategories
        },
        car() {
            return this.$store.getters.getCar;
        },
        cars() {
            return this.$store.getters.getCars;
        },
        models() {
            return this.$store.getters.getModels;
        },
        brands() {
            return this.$store.getters.getBrands;
        },
        gearboxes() {
            return this.$store.getters.getGearboxes;
        },
        instructors() {
            return this.$store.getters.getInstructors;
        }
    },
    methods: {
        async save() {
            if (this.$refs.form.validate()) {
                await this.$store.dispatch("createCar")
                    .then(response => {
                    })
                    .catch(error => {
                        const message = error.message;
                        this.showSnackbar(message);
                    });
            }
        },
        listCars() {
            //  this.$store.commit("setCarsParams", params)
            this.$store.dispatch("listCars")
        },
        listInstructors() {
            this.$store.dispatch("listInstructors")
        },
        createCar() {
            const params = {
                model: this.car.model,
                brand: {
                    name: this.car.brand,
                },
                color: this.car.color,
                registration: this.car.registration,
                vin: this.car.vin,
                brandId: 1,
                categoryId: 1,
                gearboxId: 1,
                modelId: 2,
                schoolId: this.$route.params.schoolId
            }
            console.log(params);
            this.$store.commit("setCar", params)
            this.$store.dispatch("createCar")
            this.$store.commit("initCar")
            // const pagination = this.$store.getters.getCarsPagination
            // this.$router.push(`/${this.$route.params.schoolId}/cars?page=${pagination.page}&size=${pagination.size}`)
        },
        showSnackbar(message) {
            this.$store.dispatch("showError", message);
        },
        /*    open() {
                this.dialog = true;
                this.init();
            },
            close() {
                this.dialog = false;
            },*/
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

        }
    },
    created() {
        this.$store.commit("initCar");
        this.$store.commit("setCarCreated", false);
        this.listCars()
        this.listInstructors()
        this.initModelsParams()
        this.listModels();
        this.listBrands();
        this.listGearboxes();
    }
};
</script>
