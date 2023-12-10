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
        </v-dialog>
    </div>
</template>
  
<script>
import DatePicker from '../../ui/pickers/DatePicker.vue';
import ValidationSnackbar from '../../ui/snackbars/ValidationSnackbar.vue';
export default {
    components: {
        ValidationSnackbar,
        DatePicker
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
        },
        course() {
            return this.$store.getters.getCourse
        },
        courseTypes() {
            return this.$store.getters.getCourseTypes
        },
        instructors() {
            return this.$store.getters.getInstructors
        }
    },
    methods: {
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
        },
        async save() {
            if (this.$refs.form.validate()) {
                const schoolId = this.$route.params.schoolId
                this.student.schoolId = schoolId
                this.$store.dispatch("createStudent")
                    .then(response => {
                        if (response) {
                            console.log("response")
                            console.log(response)
                            console.log(response.data)
                            const studentId = response.data.user.id
                            this.course.studentId = studentId;
                            console.log(new Date())
                            this.$store.dispatch("createCourse")
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
            console.log(new Date())
            this.dialog = true
            this.init()
            this.initCourse()
            this.listCourseTypes()
            this.initInstructors()
        },
        close() {
            this.dialog = false
        },
        init() {
            this.$store.commit("initStudent")
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
};
</script>
  