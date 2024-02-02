<template>
    <div class="rides-list">
        <div class="mt-3 ml-2">
            <SearchInput :title="'Wyszukiwarka tekstowa'" :width="maxWidthSearchInput" v-model="searchedUser" />
        </div>
        <div class="ml-2">
            <DataTable>
                <template #body>
                    <ctr v-for="(conversation, index) in  conversations " :key="conversation.id" class="text-left c-pointer"
                        :class="{ 'selected-row': index === selectedRowIndex }"
                        @click="setSelectedConversations(conversation, index)">
                        <ctd>
                            <div>
                                <ConversationItem :conversation="conversation" />
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
        conversations() {
            return this.$store.getters.getConversations;
        },
    },
    methods: {
        listConversations() {
            this.$store.dispatch("listConversations")
        },
        goTo(id) {
            this.$router.push({ name: 'CarsShow', params: { id: id } });
        },
        setSelectedConversations(conversation, index) {
            this.$store.commit('setConversation', conversation);
            this.selectedRowIndex = index;
            console.log(this.$store.getters.getConversation);
        },
        async selectTopRow() {
            this.$nextTick(() => {
                if (this.conversations.length > 0) {
                    this.$store.commit('setConversation', this.conversations[0]);
                    console.log(this.conversations[0]);
                    this.selectedRowIndex = 0;
                }
            });
        },
    },
    watch: {
        conversations: 'selectTopRow',
    },
    mounted() {
        this.listConversations
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

/* You can also adjust the scrollbar appearance if needed */
.rides-list::-webkit-scrollbar {
    width: 8px;
}

.rides-list::-webkit-scrollbar-thumb {
    background-color: #F5F7FA;
    border-radius: 4px;
}

.rides-list::-webkit-scrollbar-track {
    background-color: #E8ECF4;
}

/* colors: {
        "background": "#E8ECF4",
        "solitude": "#F5F7FA",
        "arsenic": "#41494E",
        "forsetGreen": "#2A9A2F",
        "atomic": "#3C4B52"
    } */
</style>