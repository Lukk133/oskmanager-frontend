<template>
    <v-sheet class="d-flex flex-column rounded-lg frame bg-white pa-5 mt-2">
        <div v-for="(message, index) in messages" :key="message.id" class="d-flex text-left c-pointer">
            <div class="mb-2 d-flex"
                :style="{ justifyContent: message.sender.id === loggedUser.id ? 'flex-end' : 'flex-start', width: '780px' }">
                <icon :icon="'user'" class="mt-2 mx-2" :style="{ order: message.sender.id === loggedUser.id ? 1 : 0 }" />
                <v-sheet class="bg-solitude rounded-lg flex-row d-flex pa-2"
                    :class="{ 'message-right': message.sender.id === loggedUser.id, 'message-left': message.sender.id !== loggedUser.id }">
                    {{ message.content }}
                </v-sheet>
            </div>
        </div>
        <div class="mt-auto"></div>
        <v-sheet class="d-flex justify-center">
            <img src="../../assets/icons/camera.svg" />
            <img src="../../assets/icons/gallery.svg" class="mx-3" />
            <img src="../../assets/icons/attachments.svg" />
            <TextInput class="ml-3" :width="590" />
        </v-sheet>
    </v-sheet>
</template>

<script>
import TextInput from '../ui/inputs/TextInput.vue';
import ConversationItem from '../ui/conversation/ConversationItem.vue';
import Icon from '../ui/icons/Icon.vue';

export default {
    components: {
        TextInput,
        Icon,
        ConversationItem,
    },
    computed: {
        messages() {
            return this.$store.getters.getMessages;
        },
        conversation() {
            return this.$store.getters.getConversation;
        },
        loggedUser() {
            return this.$store.getters.getUser;
        },
    },
    data() {
        return {
            maxWidthSearchInput: '100%',
        };
    },
};
</script>

<style scoped>
.frame {
    flex: 0.8;
    height: calc(52.5vh - 20px);
    font-size: 12px;
}

.img {
    width: 20px;
    /* Adjust the width as needed */
    height: 20px;
    /* Adjust the height as needed */
}
</style>
