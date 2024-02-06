<template>
    <v-sheet class="d-flex flex-column rounded-lg frame bg-white pa-5 mt-2" style="max-height: 500px;">
        <div class="message-container" style="overflow-y: auto;">
            <div v-for="message in messages" :key="message.id" class="d-flex text-left c-pointer">
                <div class="mb-2 d-flex"
                    :style="{ justifyContent: message?.sender.id === loggedUser.id ? 'flex-end' : 'flex-start', width: '780px' }">
                    <!-- do poprawy width -->
                    <icon :icon="'user'" class="mt-2 mx-2"
                        :style="{ order: message.sender.id === loggedUser.id ? 1 : 0 }" />
                    <v-sheet class="bg-solitude rounded-lg flex-row d-flex pa-2">
                        {{ message.content }}
                    </v-sheet>
                </div>
            </div>
        </div>
        <div class="mt-auto"></div>
        <v-sheet class="d-flex justify-space-between align-center mb-n4">
            <icon :icon="'camera'" />
            <icon :icon="'gallery'" />
            <icon :icon="'attachments'" />
            <TextInput v-model="message" class="ml-3" :width="590" />
            <v-btn class="mt-2" @click="sendMessage">Wyślij</v-btn>
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
            message: ''
        };
    },
    methods: {
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$el.querySelector('.message-container');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            });
        },
        async sendMessage() {
            if (this.message !== '') {
                const params = { content: this.message, conversationId: this.conversation.id, senderId: this.loggedUser.id };
                await this.$store.dispatch("sendMessage", params);
                await this.$store.dispatch('listMessages', { conversationId: this.conversation.id });
                this.message = '';

                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            }
        },
    },
    mounted() {
        this.scrollToBottom();
    },
    updated() {
        this.scrollToBottom();
    },
    watch: {
        messages() {
            this.scrollToBottom();
        }
    },
}
</script>

<style scoped>
.frame {
    flex: 0.8;
    height: calc(52.5vh - 20px);
    font-size: 12px;
}

.message-container {
    overflow-y: auto;
}

.message-container::-webkit-scrollbar {
    width: 8px;
}

.message-container::-webkit-scrollbar-thumb {
    background-color: #d9dee2;
    border-radius: 4px;
}

.message-container::-webkit-scrollbar-track {
    background-color: #F5F7FA;
}
</style>