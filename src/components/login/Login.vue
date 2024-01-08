<template>
    <div class="parent">
        <v-sheet class="d-flex align-center flex-column justify-center bg-white pa-9 rounded-lg" width="403" height="635">
            <div class="mb-15">
                Zaloguj się
            </div>
            <TextInput class="bg-white rounded-pill mb-3 align-center pl-7 d-flex" width="331" height="42"
                placeholder="Kod ośrodka" :icon="'car.svg'" />
            <!-- <img src="/icons/car.svg" alt="" class="mr-3"> -->
            <TextInput class="bg-white rounded-pill mb-3 align-center pl-7 d-flex" width="331" height="42"
                placeholder="Login" :icon="'car.svg'" />
            <TextInput class="bg-white rounded-pill mb-7 align-center pl-7 d-flex" width="331" height="42"
                placeholder="Hasło" :icon="'car.svg'" />
            <v-sheet
                class="bg-arsenic rounded-pill mb-3 align-center d-flex login align-center justify-center d-flex c-pointer"
                width="331" height="42">Zaloguj
                się</v-sheet>
        </v-sheet>
    </div>
</template>
<script>
import TextInput from '../ui/inputs/TextInput.vue';

export default {
    components: {
        TextInput
    }
}
</script>
<style>
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login {
    font-size: 14px;
}
</style>