<template>
    <div class="rides-list">
        <div class="ml-2" style="max-height: 455px;">
            <DataTable>
                <template #body>
                    <ctr v-if="usersParams.fullName === ''" v-for="conversation in  conversations" :key="conversation.id"
                        class="text-left c-pointer" :class="{ 'selected-row': conversation.id === selectedConversationId }"
                        @click="setSelectedConversation(conversation)">
                        <ctd>
                            <div class="d-flex justify-space-between w-100">
                                <div class="ml-6 mr-8">
                                    <!-- <span>
                                        <icon :icon="'bell'" class="" />
                                    </span> -->
                                    Antoni Nowicki
                                    <span class="notification ml-6"
                                        :class="{ 'alert': conversation.id === selectedConversationId }">Napisał
                                        wiadomość</span>
                                </div>
                                <div class="notification" :class="{ 'alert': conversation.id === selectedConversationId }">
                                    {{ formatLastMessageDate(conversation?.lastMessageAt) }}
                                </div>
                            </div>
                        </ctd>
                    </ctr>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DeleteConfimrationDialog from '../ui/dialogs/DeleteConfimrationDialog.vue';
import Icon from '../ui/icons/Icon.vue';
import DataTable from '../instructor/show/rides/Table.vue';

export default {
    components: {
        DeleteConfimrationDialog,
        DataTable,
        Icon
    },
    data() {
        return {
            searchedUser: "",
            selectedConversationId: 0
        };
    },
    computed: {
        usersParams() {
            console.log(this.$store.getters.getUsersParams);
            return this.$store.getters.getUsersParams
        },
        conversationParams() {
            return this.$store.getters.conversationParams
        },
        conversations() {
            return this.$store.getters.getConversations;
        },
        conversation() {
            return this.$store.getters.getConversation;
        },
        users() {
            return this.$store.getters.getUsers;
        },
        loggedUser() {
            return this.$store.getters.getUser
        },
        messagesParams() {
            return this.$store.getters.getMessagesParams
        }
    },
    methods: {
        formatLastMessageDate(dateArray) {
            if (!dateArray || dateArray.length !== 7) {
                return '';
            }

            const [year, month, day, hours, minutes, seconds, milliseconds] = dateArray;
            const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);

            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return formattedDate.toLocaleDateString(undefined, options);
        },
        async createConversation(id) {
            const payload = { userIds: [this.loggedUser.id, id] };
            await this.$store.dispatch("createConversation", payload);
            this.conversationParams.fullName = '';
            this.listConversations();
        },
        async listConversations() {
            this.$store.commit("setConversationsParams", { customerId: this.loggedUser.id });

            await this.$store.dispatch("listConversations");
        },
        listAvailableUsers() {
            this.$store.dispatch("listUsers")
            console.log(this.usersParams);
        },
        setSelectedConversation(conversation) {
            this.$store.commit('setConversation', conversation);
            this.selectedConversationId = conversation.id;
            this.messagesParams.conversationId = this.selectedConversationId
            this.$store.commit('setMessagesParams', conversation);
            this.$store.dispatch('listMessages');
        },
        async refreshConversations(conversation) {
            if (this.searchedUser !== '') {
                await this.createConversation(conversation.id);
            } else {
                this.listConversations();
            }
        },
        async selectTopRow() {
            this.$nextTick(() => {
                if (this.conversations.length > 0) {
                    this.$store.commit('setConversation', this.conversations[0]);
                    this.setSelectedConversation(this.conversations[0])
                }
            });
        },
        async initConversation() {
            await this.$store.dispatch("getLoggedUser")
            this.$store.commit("setConversationsParams", { customerId: this.loggedUser.id })
            await this.$store.dispatch("listConversations")
        }
    },
    watch: {
        conversations: 'selectTopRow',
        usersParams: {
            handler() {
                this.listAvailableUsers();
            },
            deep: true
        },
        conversationsParams: {
            handler() {
                this.listConversations()
            },
            deep: true

        }
    },
    mounted() {
        this.initConversation()
        this.$store.dispatch("listUsers");
    },
}
</script>
<style scoped>
.selected-row {
    background-color: #e8ecf4;
}

.rides-list {
    flex: 0.7;
    margin-right: 16px;
    overflow-y: scroll;
}

.rides-list::-webkit-scrollbar {
    width: 8px;
    margin-left: 20px;
}

.rides-list::-webkit-scrollbar-thumb {
    background-color: #d9dee2;
    border-radius: 4px;
}

.rides-list::-webkit-scrollbar-track {
    background-color: #F5F7FA;
}

.notification {
    margin-top: 1px;
    font-size: 12px;
}
</style>