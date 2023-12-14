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
            <v-sheet>
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
        createStudent() {
            console.log(this.schoolId);
            const params = {
                email: this.student.email,
                password: "Password123!",
                pesel: this.student.pesel,
                pkk: this.student.pkk,
                name: this.student.name,
                lastName: this.student.lastName,
                phoneNumber: this.student.phoneNumber,
                schoolId: this.schoolId
            }
            console.log(params);
            this.$store.commit("setStudent", params)
            this.$store.dispatch("createStudent", params)
            this.$store.commit("initStudent")
        },/*
        courseTypeProps(courseType) {
            return {
                title: courseType.name,
                subtitle: `${courseType.category?.name} ${courseType.gearbox?.name}   ${courseType.express ? "Ekspresowy" : "Zwykły"}`,
            }
        },
        instructorProps(instructor) {
            return {
                title: `${instructor.name} ${instructor.lastName}`,
                subtitle: instructor.numberOfCourses,
            }
        },*/
        //nwm o co cho
        async save() {
            if (this.$refs.form.validate()) {
                const schoolId = this.$route.params.schoolId
                this.student.schoolId = schoolId
                this.$store.dispatch("createStudent")
                    .then(response => {
                        if (response) {
                            const studentId = response.data.user.id
                            this.course.studentId = studentId;
                            console.log(new Date())
                            this.$store.dispatch("createCourse")
                                .then(response => {
                                    if (response) {
                                        this.$emit("created")
                                    }
                                })
                                .catch(error => {
                                    const message = error.message
                                    this.showSnackbar(message)
                                })
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
<!-- <ValidationSnackbar />
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
                            <v-select :items="courseTypes" item-value="id" label="Kurs" v-model="course.courseTypeId"
                                :item-props="courseTypeProps" @update:model-value="listInstructors"></v-select>
                            <v-select :items="instructors" item-value="id" :item-props="instructorProps"
                                label="Główny instruktor" :disabled="instructors.length === 0"
                                v-model="course.mainInstructorId"></v-select>
                            <DatePicker v-model="course.date" />
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Zamknij</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Zapsiz</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>-->