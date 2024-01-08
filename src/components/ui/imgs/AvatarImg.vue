<template>
    <img v-if="src" :src="src ? src : ''" :width="width" :height="height" class="rounded-circle" />
</template>
<script>
import axios from "axios";
import DefaultAvatarImg from "../../../assets/imgs/defaultAvatar.jpg"
export default {
    props: {
        obj: {
            default: null
        },
        width: {
            default: 30
        },
        height: {
            default: 30
        }
    },
    computed: {
        src() {
            if (!this.obj || !this.obj.avatar) {
                return null;
            }
            return `${axios.defaults.baseURL}files?path=${this.obj.avatar.path}`
        }
    },
    data() {
        return {
            defaultAvatarImg: DefaultAvatarImg
        }
    }
}
</script>
