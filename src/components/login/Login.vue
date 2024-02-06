<template>
    <!-- To jest do wywalenia-->
    <div class="parent">
        <v-snackbar v-model="showError" timeout="3000" color="error" location="top">
            {{ error }}
        </v-snackbar>
        <v-sheet class="d-flex align-center flex-column justify-center bg-white pa-9 rounded-lg" width="403" height="635">
            <div class="mb-15">
                Zaloguj się
            </div>
            <!-- <img src="/icons/car.svg" alt="" class="mr-3"> -->
            <TextInput class="bg-white rounded-pill mb-3 align-center pl-7 d-flex" width="331" height="42"
                v-model="auth.email" :rules="emailRules" placeholder="Login" :icon="'car.svg'" />
            <TextInput class="bg-white rounded-pill mb-7 align-center pl-7 d-flex" width="331" height="42"
                v-model="auth.password" :readonly="loading" :rules="passwordRules" clearable label="Password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'" placeholder="Hasło" :icon="'car.svg'" />
            <v-sheet
                class="bg-arsenic rounded-pill mb-3 align-center d-flex login align-center justify-center d-flex c-pointer"
                width="331" height="42" @click="login">Zaloguj
                się</v-sheet>
        </v-sheet>
    </div>
    <!-- <div class="mt-16 text-center">
        <v-snackbar v-model="showError" timeout="3000" color="error" location="top">
            {{ error }}
        </v-snackbar>
        <v-form v-model="form" @submit.prevent="login">
            <v-card width="400" class="mx-auto">
                <v-card-title>
                    LOGIN PAGE
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Podaj email" v-model="auth.email" :rules="emailRules"></v-text-field>
                    <v-text-field v-model="auth.password" :readonly="loading" :rules="passwordRules" clearable
                        label="Password" placeholder="Enter your password"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="login">Zaloguj</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div> -->
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