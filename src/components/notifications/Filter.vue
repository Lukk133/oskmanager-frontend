<template>
    <div class="d-flex flex-row align-center bg-background rounded-lg">
        <v-sheet class="pa-2 bg-background ma-2">
            <SelectInput @update:model-value="" title="Grupa odbiorców" />
        </v-sheet>
        <v-sheet class="pa-2 bg-background">
            <SelectInput class="selectInput" @update:model-value="updateCategory" title="Kategoria" :items="categories" />
        </v-sheet>
        <v-sheet class="pa-2 bg-background">
            <SelectInput class="selectInput" @update:model-value="updateCategory" title="Rodzaj powiadomień"
                :items="categories" />
        </v-sheet>
    </div>
</template>

<script>
import SelectInput from "../../components/ui/inputs/SelectInput.vue";

export default {
    components: {
        SelectInput,
    },
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        },
        conversationsParams() {
            return this.$store.getters.getConversationsParams;
        },
    },
    methods: {
        updateCategory(category) {
            this.conversationsParams.categoryId = category.id;
            this.$store.dispatch("listConversations", this.conversationsParams);
        },
        save() {
            this.$emit("save");
        },
    },
    mounted() {
        this.$store.dispatch("listCategories")
    }
}; 
</script>
<style scoped></style>

