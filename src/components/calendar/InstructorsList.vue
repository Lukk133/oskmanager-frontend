<template>
    <div>
        <div class="label">
            PRACOWNICY
        </div>
        <v-checkbox v-for="(instructor, index) in instructors" :key="instructor.id" v-model="instructorsIds"
            :value="instructor.id" style="margin-bottom: -13px;">
            <template v-slot:label>
                <div class="d-flex align-center checkbox-label">
                    <AvatarImg :obj="instructor" />
                    <div class="ml-2">

                        {{ instructor.name + ' ' + instructor.lastName }}
                    </div>
                </div>
            </template>
        </v-checkbox>
    </div>
</template>
<script>
import AvatarImg from '../ui/imgs/AvatarImg.vue'
export default {
    components: {
        AvatarImg
    },
    computed: {
        instructors() {
            return this.$store.getters.getInstructors
        },
        instructorsIds: {
            get() {
                return this.$store.getters.getInstructorsIds
            },
            set(val) {
                this.$store.commit("setInstructorsIds", val)
                this.changed()
            }
        }
    },
    methods: {
        changed() {
            this.$emit("changed")
        },
        async initInstructors() {
            this.$store.commit("initInstructorsParams")
            let params = this.$store.getters.getInstructorsParams
            params.schoolId = this.$route.params.schoolId
            this.$store.commit("setInstructorsParams", params)

            this.$store.commit("initInstructorsPagination")
            let pagination = this.$store.getters.getInstructorsPagination
            pagination.size = 1000
            this.$store.commit("setInstructorsPagination", pagination)

            await this.$store.dispatch("listInstructors")
            this.setAllInstructorsIds()
        },
        setAllInstructorsIds() {
            this.instructorsIds = this.instructors.map(instructor => instructor.id)
        }
    },
    mounted() {
        this.initInstructors()
    }
}
</script>
<style scoped>
.checkbox-label {
    color: var(--d-9-d-9-d-9, #3C4B52);

    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.21px;
}

.label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
}
</style>