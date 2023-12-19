<template>
    <div>
        <v-sheet class="d-flex bg-solitude mt-8 ml-8">
            <v-sheet class="bg-solitude" width="300">
                <AvatarInput @changed="changedAvatar" :src="defaultSrc">
                    <template #title>
                        <div class="ml-4">
                            <div class="avatar-title">{{ student.name }}</div>
                            <div class="avatar-subtitle">{{ student.lastName }}</div>
                        </div>
                    </template>
                </AvatarInput>
            </v-sheet>
            <v-sheet class="bg-solitude" width="300">
                <ValidationForm ref="form">
                    <TextInput :rules="['required', 'max']" :label="'Imię'" :placeholder="'Podaj imię'"
                        v-model="student.name" ref="nameInput" />
                    <TextInput :rules="['required', 'max']" :label="'Nazwisko'" :placeholder="'Podaj nazwisko'"
                        v-model="student.lastName" ref="lastNameInput" />
                    <TextInput :rules="['required']" :label="'Telefon'" :placeholder="'000 000 000'"
                        v-model="student.phoneNumber" ref="lastNameInput" />
                    <TextInput :rules="['required']" :label="'E-mail'" :placeholder="'Podaj e-mail'" v-model="student.email"
                        ref="courseTypeInput" />
                    <TextInput :rules="['required']" :label="'PESEL'" :placeholder="'Podaj PESEL'" v-model="student.pesel"
                        ref="courseTypeInput" />
                    <TextInput :rules="['required']" :label="'Numer pkk'" :placeholder="'000000000000'"
                        v-model="student.pkk" ref="courseTypeInput" />
                    <SelectInput :items="instructors" :rules="['required']" v-model="student.instructor"
                        ref="courseTypeInput" :title="'Przypisanie głównego instruktora'" />
                    <SelectInput :items="categories" :rules="['required']" v-model="student.category" ref="courseTypeInput"
                        :title="'Przypisania kategoria'" />
                    <v-btn @click="createStudent()" class="c-pointer mt-5">Dodaj
                        kursanta</v-btn><!--placeholder bo nwm jak w headerze to zrobic-->
                </ValidationForm>
            </v-sheet>
        </v-sheet>
    </div>
</template>
  
<script>
import DatePicker from '../../ui/pickers/DatePicker.vue';
import TextInput from "../../ui/inputs/TextInput.vue"
import AvatarInput from "../../ui/inputs/AvatarInput.vue"
import ValidationForm from "../../ui/forms/ValidationForm.vue"
import SelectInput from "../../ui/inputs/SelectInput.vue"

export default {
    components: {
        //  DatePicker,
        AvatarInput,
        ValidationForm,
        SelectInput,
        TextInput
    },
    data() {
        return {
            valid: true,
            schoolId: "",
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
        },
        course() {
            return this.$store.getters.getCourse
        },
        courseTypes() {
            return this.$store.getters.getCourseTypes
        },
        categories() {
            return this.$store.getters.getCategories
        },
        instructors() {
            return this.$store.getters.getInstructors;
        }
    },
    methods: {
        validate() {
            return this.$refs.form.validate(this.$refs)
        },
        showSnackbar(message) {
            this.$store.dispatch("showError", message)
        },
        init() {
            this.$store.commit("initStudent")
            this.schoolId = this.$route.params.schoolId
            console.log(this.schoolId);
        },
        initCourse() {
            this.$store.commit("initCourse")
        },
        listCourseTypes() {
            this.$store.commit("initCourseTypesParams")
            var params = this.$store.getters.getCourseTypesParams
            const schoolId = this.$route.params.schoolId;
            params.schoolId = schoolId;
            this.$store.commit("setCourseTypesParams", params)
            this.$store.dispatch("listCourseTypes")
        },
        initInstructors() {
            this.$store.commit("setInstructors", [])
        },
        listInstructors() {
            this.$store.commit("initInstructorsParams")
            var params = this.$store.getters.getInstructorsParams
            const schoolId = this.$route.params.schoolId;
            const courseTypeId = this.course.courseTypeId;
            params.schoolId = schoolId;
            params.courseTypeId = courseTypeId;
            this.$store.commit("setInstructorsParams", params)
            this.$store.dispatch("listInstructors")
        }
    },
    created() {
        console.log(new Date())
        this.init()
        this.initCourse()
        this.listCourseTypes()
        this.listInstructors()
        this.initInstructors()
    }
};
</script>