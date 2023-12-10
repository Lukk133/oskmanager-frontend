<template>
    <div class="d-flex pointer c-pointer align-center">
        <img :src="messageIcon" alt="">
        <div class="d-flex align-center">
            <span class="ma-1">Witaj!</span>
            <span class="fw-bold ma-1"> {{ ` ${actualUser.name} ${actualUser.lastName}` }}</span>
            <AvatarImg class="ma-1" />
        </div>
    </div>
</template>
<script>
import MessageIcon from "../../assets/icons/message.svg"
import AvatarImg from "../ui/imgs/AvatarImg.vue"
export default {
    components: {
        AvatarImg
    },
    data() {
        return {
            messageIcon: MessageIcon
        }
    },
    computed: {
        actualUser() {
            return this.$store.getters.getActualUser
        }
    }
}
</script>