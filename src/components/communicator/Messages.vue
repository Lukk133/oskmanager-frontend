<template>
    <v-sheet class="d-flex rounded-lg frame bg-white pa-5 mt-2">
        <div>
            HALO
        </div>
        <v-sheet class=" align-self-end d-flex">
            <img src="../../assets/icons/camera.svg" />
            <img src="../../assets/icons/gallery.svg" class="mx-3" />
            <img src="../../assets/icons/attachments.svg" />
            <!-- <icon :icon="'user'"></icon> -->
            <TextInput class="ml-3" :width="590" />
            <!-- :icon="bell.svg" -->
        </v-sheet>
    </v-sheet>
</template>

<script>
import TextInput from '../ui/inputs/TextInput.vue';
import Icon from '../ui/icons/Icon.vue';
export default {
    components: {
        TextInput,
        Icon
    },
    data() {
        return {
            maxWidthSearchInput: "100%"
        }
    }
}
</script>

<style scoped>
.frame {
    flex: 0.8;
    height: calc(52.5vh - 20px);
}
</style>
