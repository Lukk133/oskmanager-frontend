<template>
    <div class="rides-list">
        <div class="mt-3 ml-2 bg-solitude">
            <SearchInput :title="'Wyszukiwarka tekstowa'" :width="maxWidthSearchInput" v-model="usersParams.fullName" />
        </div>
        <div class="ml-2" style="max-height: 400px;">
            <DataTable>
                <template #body>
                    <ctr v-if="usersParams.fullName === ''" v-for="conversation in  conversations" :key="conversation.id"
                        class="text-left c-pointer" :class="{ 'selected-row': conversation.id === selectedConversationId }"
                        @click="setSelectedConversation(conversation)">
                        <ctd>
                            <div>
                                <ConversationItem :conversation="conversation" />
                            </div>
                        </ctd>
                    </ctr>
                    <!-- index do wywalenia -->
                    <ctr v-else v-for="( user, index ) in users" :key="user.id" class="text-left c-pointer"
                        :class="{ 'selected-row': index === selectedRowIndex }"
                        @click="setSelectedConversation(user, index), refreshConversations">
                        <ctd>
                            <div @click="createConversation(user.id)">
                                {{ user.avatar }} {{ user.name }} {{ user.lastName }}
                            </div>
                        </ctd>
                    </ctr>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script>
import SearchInput from "../../components/ui/inputs/SearchInput.vue";
import DeleteConfimrationDialog from '../ui/dialogs/DeleteConfimrationDialog.vue';
import DataTable from '../instructor/show/rides/Table.vue';
import ConversationItem from '../ui/conversation/ConversationItem.vue';

export default {
    components: {
        SearchInput,
        DeleteConfimrationDialog,
        DataTable,
        ConversationItem,
    },
    data() {
        return {
            selectedRowIndex: null,
            maxWidthSearchInput: "100%",
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

.mt-3.ml-2 {
    position: sticky;
    top: 0;
    z-index: 99;
    background: inherit;
}
</style>