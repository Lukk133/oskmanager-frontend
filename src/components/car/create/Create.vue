<template>
    <div>
        <v-sheet class="d-flex bg-solitude mt-8 ml-8">
            <v-sheet class="bg-solitude" width="300">
                <AvatarInput @changed="changedAvatar" :src="defaultSrc">
                    <template #title>
                        <div class="ml-4">
                            <div class="avatar-title">{{ car.brand ? car.brand.name : '' }}</div>
                            <div class="avatar-subtitle">{{ car.model ? car.model.name : '' }}</div>
                        </div>
                    </template>
                </AvatarInput>
            </v-sheet>
            <v-sheet class="bg-solitude" width="300">
                <ValidationForm ref="form">
                    <SelectInput :items="brands" :rules="['required']" v-model="car.brand" ref="courseTypeInput"
                        :title="'Wybierz markę samochodu'" />
                    <SelectInput :disabled="!car.brand" :items="models" v-model="car.model" :rules="['required']"
                        ref="modelInput" :title="'Wybierz model samochodu'" />
                    <TextInput :rules="['required']" :label="'Kolor'" :placeholder="'Podaj kolor samochodu'"
                        v-model="car.color" ref="lastNameInput" />
                    <TextInput :rules="['required']" :label="'Tablica rejestracyjna'"
                        :placeholder="'Podaj tablicę rejestracyjną'" v-model="car.registration" ref="courseTypeInput" />
                    <TextInput :rules="['required']" :label="'Numer VIN'" :placeholder="'Podaj Numer VIN'" v-model="car.vin"
                        ref="courseTypeInput" />
                    <SelectInput :items="instructors" :rules="['required']" v-model="car.instructor" ref="courseTypeInput"
                        :title="'Przypisanie głównego instruktora'" />
                </ValidationForm>
            </v-sheet>
        </v-sheet>
    </div>
</template>

<script>
import TextInput from "../../ui/inputs/TextInput.vue"
import AvatarInput from "../../ui/inputs/AvatarInput.vue"
import ValidationForm from "../../ui/forms/ValidationForm.vue"
import SelectInput from "../../ui/inputs/SelectInput.vue"

export default {
    components: {
        AvatarInput,
        ValidationForm,
        SelectInput,
        TextInput
    },
    data() {
        return {
            dialog: false,
            valid: true,
            car: {
                model: {
                    name: '',
                },
                brand: {
                    name: '',
                },
            }

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
        validate() {
            return this.$refs.form.validate(this.$refs)
        },
        listInstructors() {
            this.$store.dispatch("listInstructors")
        },
        showSnackbar(message) {
            this.$store.dispatch("showError", message);
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
    },
    created() {
        this.$store.commit("initCar");
        this.$store.commit("setCarCreated", false);
        this.listInstructors()
        this.initModelsParams()
        this.listModels();
        this.listBrands();
        this.listGearboxes();
    }
};
</script>
