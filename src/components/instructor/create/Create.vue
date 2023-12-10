<template>
    <div>
        <v-sheet class="d-flex bg-solitude mt-8 ml-8">
            <v-sheet class="bg-solitude" width="300">
                <AvatarInput @changed="changedAvatar" :src="defaultSrc">
                    <template #title>
                        <div class="ml-4">
                            <div class="avatar-title">{{ instructor.name }}</div>
                            <div class="avatar-subtitle">{{ instructor.lastName }}</div>
                        </div>
                    </template>
                </AvatarInput>
            </v-sheet>
            <v-sheet class="bg-solitude" width="300">
                <ValidationForm ref="form">
                    <TextInput :rules="['required', 'max']" :label="'Imię'" :placeholder="'Podaj imię'"
                        v-model="instructor.name" ref="nameInput" />
                    <TextInput :rules="['required', 'max']" :label="'Nazwisko'" :placeholder="'Podaj nazwisko'"
                        v-model="instructor.lastName" ref="lastNameInput" />
                    <TextInput :rules="['required', 'phoneNumber']" :label="'Numer telefonu'"
                        :placeholder="'Podaj numer telefonu'" v-model="instructor.phoneNumber" ref="phoneNumberInput" />
                    <TextInput :label="'E-mail'" :rules="['required', 'email']" :placeholder="'Podaj e-mail'"
                        v-model="instructor.email" ref="emailInput" />

                    <SelectInput :items="categories" v-model="instructor.category" :rules="['required']"
                        ref="courseTypeInput" @update:model-value="listCars" :title="'Wybierz kategorię'" />
                    <SelectInput :disabled="cars.length == 0" :items="cars" v-model="instructor.car" :rules="['required']"
                        ref="courseTypeInput" :labelingFunction="carLabelingFunction" :withAvatar="true"
                        :avatarLabeling="avatarCarLabelingFunction" :title="'Wybierz samochód'" />
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
import axios from "axios"
export default {
    components: {
        TextInput,
        AvatarInput,
        ValidationForm,
        SelectInput
    },
    data() {
        return {
            courseType: {},
            carLabelingFunction: item => `${item?.brand?.name} ${item?.model?.name}`,
            avatarCarLabelingFunction: item => item.model,
        }
    },
    computed: {
        instructor() {
            return this.$store.getters.getInstructor
        },
        categories() {
            return this.$store.getters.getCategories
        },
        cars() {
            return this.$store.getters.getCars
        },
        defaultSrc() {
            const fileInfo = this.$store.getters.getFileInfo
            if (fileInfo.path) {
                return this.getSrc(fileInfo.path)
            }
            return false
        }
    },
    methods: {
        getSrc(src) {
            return `${axios.defaults.baseURL}files?path=${src}`
        },
        async changedAvatar(file) {
            await this.$store.dispatch("uploadFile", file)
            this.instructor.avatarId = this.$store.getters.getFileInfoId
        },
        validate() {
            return this.$refs.form.validate(this.$refs)
        },
        listCars() {
            const params = {
                categoryId: this.instructor.category.id,
                schoolId: this.$route.params.schoolId
            }
            this.$store.commit("setCarsParams", params)
            this.$store.dispatch("listCars")
        }
    }
}

</script>