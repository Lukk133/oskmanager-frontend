<template>
    <div class="rides-list">
        <div class="mt-3 ml-2">
            <SearchInput :title="'Wyszukiwarka tekstowa'" :width="maxWidthSearchInput" v-model="searchedUser" />
        </div>
        <div class="ml-2" style="max-height: 400px;">
            <DataTable>
                <template #body>
                    <ctr v-if="searchedUser === ''" v-for="(conversation, index) in  filteredConversations"
                        :key="conversation.id" class="text-left c-pointer"
                        :class="{ 'selected-row': index === selectedRowIndex }"
                        @click="setSelectedConversations(conversation, index)">
                        <ctd>
                            <div @click="displayConversation()">
                                <ConversationItem :conversation="conversation" />
                            </div>
                        </ctd>
                    </ctr>
                    <ctr v-if="searchedUser !== ''" v-for="( user, index ) in filteredUsers " :key="user.id"
                        class="text-left c-pointer" :class="{ 'selected-row': index === selectedRowIndex }"
                        @click="setSelectedConversations(user, index), refreshConversations">
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
import AvatarImg from '../ui/imgs/AvatarImg.vue';
import DataTable from '../instructor/show/rides/Table.vue';
import ConversationItem from '../ui/conversation/ConversationItem.vue';

export default {
    components: {
        SearchInput,
        DeleteConfimrationDialog,
        DataTable,
        ConversationItem,
        AvatarImg
    },
    data() {
        return {
            selectedRowIndex: null,
            maxWidthSearchInput: "100%",
            searchedUser: ""
        };
    },
    computed: {
        filteredConversations() {
            return this.conversations.filter(conversation =>
                conversation.users.some(user => user.id === this.loggedUser.id)
            );
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
        filteredUsers() {
            return this.users.filter(user =>
                user.name.toLowerCase().includes(this.searchedUser.toLowerCase()) ||
                user.lastName.toLowerCase().includes(this.searchedUser.toLowerCase())
            );
        },
        loggedUser() {
            return this.$store.getters.getUser
        }
    },
    methods: {
        displayConversation() {
            console.log(this.$store.getters.getConversation);
        },
        async createConversation(id) {
            try {
                const payload = { userIds: [this.loggedUser.id, id] };
                await this.$store.dispatch("createConversation", payload);
                this.searchedUser = '';
                this.listConversations();
            } catch (error) {
                console.error("Error creating conversation:", error);
            }
        },
        listConversations() {
            this.$store.dispatch("listConversations")
        },
        goTo(id) {
            this.$router.push({ name: 'CarsShow', params: { id: id } });
        },
        setSelectedConversations(conversation, index) {
            this.$store.commit('setConversation', conversation);
            this.selectedRowIndex = index;
            const params = { conversationId: this.conversation.id };
            this.$store.dispatch('listMessages', params);
            if (this.searchedUser !== '') {
                this.searchedUser = '';
                this.listConversations();
            }
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
                console.log('halo');
                if (this.conversations.length > 0) {
                    this.$store.commit('setConversation', this.conversations[0]);
                    const params = { conversationId: this.conversation.id };
                    this.$store.dispatch('listMessages', params);
                    this.selectedRowIndex = 0;
                }
            });
        },
    },
    watch: {
        conversations: 'selectTopRow',
    },
    mounted() {
        this.listConversations()
        this.$store.dispatch("listUsers")
        this.$store.dispatch("getLoggedUser")

    },
}
</script>
<style scoped>
.selected-row {
    background-color: #e8ecf4;
}

.highlighted-hours {
    font-weight: bold;
}

.light-font {
    font-weight: 400;
    font-size: 12px;
    color: #9B9B9B;
}

.rides-list {
    flex: 0.7;
    margin-right: 16px;
    overflow-y: scroll;
    /* Change from auto to scroll */
}

.rides-list::-webkit-scrollbar {
    width: 8px;
}

.rides-list::-webkit-scrollbar-thumb {
    background-color: #41494E;
    border-radius: 4px;
}

.rides-list::-webkit-scrollbar-track {
    background-color: #F5F7FA;
}
</style>