<template>
    <SelectSearchInput v-model:searchValue="locationsParams.address" @update:searchValue="listLocations"
        v-model:selectedItem="ride.startPlace" :items="locations" :icon="'loop'" ref="input" :editable="editable">
        <template #selected>
            <div v-if="ride.startPlace">
                {{ ride.startPlace.address }}
            </div>
        </template>
        <template #list>
            <v-sheet class="bg-solitude c-pointer" v-for="location in locations" :key="location.id"
                v-if="locations.length > 0 && !ride.startPlace" @click="select(location)">
                {{ location.address }}
            </v-sheet>
            <v-sheet v-else-if="locations.length === 0 && !ride.startPlace">
                Nie znaleziono
            </v-sheet>
        </template>
    </SelectSearchInput>
</template>
<script>
import SelectSearchInput from '../../ui/inputs/SelectSearchInput.vue'


export default {
    props: {
        editable: {
            type: Boolean,
            default: true
        }
    },
    components: {
        SelectSearchInput
    },
    computed: {
        ride() {
            return this.$store.getters.getRide
        },
        locations() {
            return this.$store.getters.getLocations
        },
        locationsParams() {
            return this.$store.getters.getLocationsParams
        },
        locationsPagination() {
            return this.$store.getters.getLocationsPagination
        },
    },
    methods: {
        select(location) {
            if (this.editable) {
                this.$refs.input.select(location)
            }
        },
        listLocations() {
            if (this.editable) {

                this.$store.dispatch("listLocations")
            }
        },
        initLocations() {
            this.$store.commit("initLocationsParams")
            const schoolId = this.$route.params.schoolId
            this.locationsParams.schoolId = schoolId
            this.$store.commit("initLocationsPagination")
            this.locationsPagination.size = 3;

            this.listLocations()
        }
    },
    mounted() {
        this.initLocations()
    }
}
</script>