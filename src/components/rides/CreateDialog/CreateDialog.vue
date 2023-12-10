<template>
    <v-sheet class="bg-solitude pa-6" style="z-index:9;position:absolute;right:50px" elevation="2" mi n-height="600"
        width="372">
        <div class="c-pointer" style="position: absolute; right: 25px;" @click="close">
            <v-icon>
                mdi-close
            </v-icon>
        </div>
        <div class="date-label  d-flex align-center">
            <div class="mr-3">
                Data
            </div>
            <MenuDatePicker v-model="ride.startDate" :editable="editable">
                <template #activator>
                    <div v-if="ride.startDate">
                        {{ $moment(ride.startDate).format('DD.MM.YYYY') }}
                    </div>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                        <path d="M2.09542 2L8 8.94804L2 16" stroke="#41494E" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </template>
            </MenuDatePicker>
        </div>
        <SelectCourse class="my-4" :editable="editable" />
        <SelectInput :items="instructors" v-model="ride.instructor" :title="'Wybierz instruktora'"
            :labelingFunction="instructorLabelingFunction" :editable="editable" :withAvatar="true" />
        <SelectInput class="my-10" :items="cars" v-model="ride.car" :title="'Wybierz samochód'"
            :labelingFunction="carLabelingFunction" :editable="editable" :avatarLabeling="avatarCarLabelingFunction"
            :withAvatar="true" />

        <div class="d-flex my-10" v-if="editable">
            <div class="mr-2">
                <SelectInput :items="timeOptions" v-model="startHour" :labelingFunction="timeLabelingFunction" :width="128"
                    :placeholder="'Od'" />
            </div>
            <div class="mr-2">
                <SelectInput :items="endHourTimeOptions" v-model="endHour" :labelingFunction="timeLabelingFunction"
                    :width="128" :placeholder="'Do'" />
            </div>
        </div>
        <div class="my-2" v-else>
            <div class="dates-label">
                Godziny jazdy
            </div>
            <div class="dates-ride">
                {{ `${ride.startDate.format("HH:mm")} - ${ride.endDate.format("HH:mm")}` }}
            </div>
        </div>
        <SelectLocation :editable="editable" />
        <div class="d-flex justify-space-between mt-8" v-if="editable">
            <SaveButton @click="close" :label="'Zamknij'" />
            <SaveButton @click="save" :label="'Zapisz'" />
        </div>
        <div class="d-flex justify-space-between mt-8" v-else>
            <AdditionalActions @destroy="destroy" @edit="startEdit" />
        </div>
    </v-sheet>
</template>
<script>
import SelectInput from '../../ui/inputs/SelectInput.vue';
import MenuDatePicker from '../../ui/pickers/MenuDatePicker.vue';
import SelectSearchInput from '../../ui/inputs/SelectSearchInput.vue';
import SaveButton from '../../ui/buttons/SaveButton.vue'
import SelectCourse from './SelectCourse.vue';
import SelectLocation from './SelectLocation.vue';
import AdditionalActions from '../../ui/actions/AdditionalActions.vue';
export default {
    components: {
        SelectCourse,
        SelectLocation,
        SelectInput,
        MenuDatePicker,
        SelectSearchInput,
        SaveButton,
        AdditionalActions
    },
    data() {
        return {
            defaultDate: new Date(),
            startHour: '',
            endHour: '',
            carLabelingFunction: item => `${item?.brand?.name} ${item?.brand?.name}`,
            instructorLabelingFunction: item => `${item.name} ${item.lastName}`,
            timeLabelingFunction: item => item,
            avatarInstructorLabelingFunction: item => item,
            avatarCarLabelingFunction: item => item.model,
            startTime: 8,
            endTime: 20,
            interval: 30,
            editing: false
        }
    },
    computed: {
        editable() {
            return this.$store.getters.getRide.id == 0 || this.editing;
        },
        ride() {
            return this.$store.getters.getRide
        },
        date() {
            return this.ride.startDate
        },
        instructors() {
            return this.$store.getters.getInstructors
        },
        cars() {
            return this.$store.getters.getCars
        },
        locationsParams() {
            return this.$store.getters.getLocationsParams
        },
        locationsPagination() {
            return this.$store.getters.getLocationsPagination
        },
        locations() {
            return this.$store.getters.getLocations
        },
        timeOptions() {
            const times = this.getTimeOptions(this.startTime, 0);
            return times
        },
        endHourTimeOptions() {
            if (!this.startHour) {
                return this.timeOptions
            }
            var date = this.getDateFromTime(this.startHour)
            if (this.endHour && this.endHour.length > 0 && date > this.getDateFromTime(this.endHour)) {
                this.endHour = ''
            }
            return this.getTimeOptions(date.getHours(), date.getMinutes())
        }
    },
    methods: {
        startEdit() {
            this.editing = true
            this.startHour = this.ride.startDate.format('HH:mm')
            this.endHour = this.ride.endDate.format('HH:mm')
        },
        async destroy() {
            await this.$store.dispatch("destroyRide", this.ride.id)
            this.changed()
        },
        changed() {
            this.$emit("changed")
            this.close()
        },
        getTimeOptions(startHour, startMinute) {
            const times = [];
            let currentTime = this.$moment().hours(startHour).minutes(startMinute).seconds(0);

            while (currentTime.hours() < this.endTime) {
                times.push(currentTime.format('HH:mm'));

                currentTime.add(this.interval, 'minutes');
            }

            return times;
        },
        zeroFormat(value) {
            if (value >= 10) {
                return value
            }
            return `0${value}`
        },
        getDateFromTime(time) {
            const [hours, minutes] = time.split(':').map(Number);
            const newDate = this.$moment(this.ride.startDate).tz('Europe/Warsaw').hours(hours).minutes(minutes).toDate();
            return newDate
        },
        async save() {
            if (!this.validate()) return
            var locationId = 0;
            if (this.ride.startPlace && this.ride.startPlace.id) {
                locationId = this.ride.startPlace.id
            } else {
                const address = this.locationsParams.address;
                this.$store.commit("initLocation")
                this.$store.commit("setLocationAddress", address)
                await this.$store.dispatch("createLocation")
                    .then(response => {
                        locationId = response.data.id
                    })
            }
            this.ride.startPlaceId = this.ride.startPlace.id
            this.ride.courseId = this.ride.course.id
            this.ride.carId = this.ride.car.id
            this.ride.instructorId = this.ride.instructor.id
            this.ride.startDate = this.getDateFromTime(this.startHour)
            this.ride.endDate = this.getDateFromTime(this.endHour)
            const methodName = (this.ride.id == 0) ? "createRide" : "updateRide";
            this.$store.dispatch(methodName)
                .then(response => {
                    this.changed()
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        },
        close() {
            this.$emit('close')
        },
        validate() {
            return true
        },
        formatted() {
            return this.$moment(this.date).format('DD.MM.YYYY');
        },
        open() {
            this.$refs.datePicker.open()
        },
        initRide() {
            this.$store.commit("initRide")
        },
        listCars() {
            this.$store.commit("initCarsParams")
            let params = this.$store.getters.getCarsParams
            params.schoolId = this.$route.params.schoolId
            this.$store.commit("setCarsParams", params)
            this.$store.dispatch("listCars")
        },
        listLocations() {
            this.$store.dispatch("listLocations")
        },
        initLocations() {
            this.$store.commit("initLocationsParams")
            this.$store.commit("initLocationsPagination")
            this.locationsPagination.size = 3;
            this.listLocations()
        },
    },
    mounted() {
        this.listCars()
        this.initLocations()

    }
}
</script>
<style scoped>
.dates-ride {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.date-label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
}
</style>