<template>
    <div class="parent">
        <v-snackbar v-model="showError" timeout="3000" color="error" location="top">
            {{ error }}
        </v-snackbar>
        <v-sheet class="d-flex align-center flex-column justify-center bg-white pa-9 rounded-lg login-form" width="403"
            height="350">
            <!-- height=635 -->
            <div class="mb-10">
                <!-- mb-15 -->
                Zaloguj się
            </div>
            <TextInput class="bg-white rounded-pill mb-3 align-center pt-1 pl-7 d-flex" width="331" height="42"
                v-model="auth.email" :rules="emailRules" placeholder="Login" />
            <!--:icon="'user'"-->
            <TextInput class="bg-white rounded-pill mb-7 align-center pl-7 d-flex" width="331" height="42"
                v-model="auth.password" :readonly="loading" :rules="passwordRules" clearable
                :type="showPassword ? 'text' : 'password'" placeholder="Hasło" :icon="'car.svg'" />
            <!-- label="Password" -->
            <v-sheet
                class="bg-arsenic rounded-pill mb-3 align-center d-flex login align-center justify-center d-flex c-pointer"
                width="331" height="42" @click="login">Zaloguj
                się</v-sheet>
        </v-sheet>
    </div>
</template>
<script>
import TextInput from '../../components/ui/inputs/TextInput.vue'
export default {
    components: {
        TextInput
    },
    data() {
        return {
            auth: {
                email: "admin112@mail.com",
                password: "password"
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            showPassword: false,
            loading: false,
            password: null,
            form: null,
            error: "",
            showError: false
        }
    },
    methods: {
        async login() {
            await this.$store.dispatch("login", this.auth).then(response => {
                this.$store.commit("setShowError", false)
                var token = response.data.token;
                var refreshToken = response.data.refreshToken;
                var roles = response.data.roles;
                localStorage.setItem('access_token', token)
                localStorage.setItem('refresh_token', refreshToken)
                localStorage.setItem('roles', roles)
                this.$store.commit("setIsAuthenticated", true)
                this.$store.dispatch("getActualUser");
                this.$router.push({ name: 'Home' })
            }).catch(error => {
                var message = error.message;
                this.showSnackbar(message)
            })
        },
        showSnackbar(error) {
            this.error = error
            this.showError = true;
        },
        redirectIfAuth() {
            if (this.$store.getters.getIsAuthenticated) {
                this.$router.push({ name: "Home" })
            }
        }
    },
    created() {
        this.redirectIfAuth()
    }
}
</script>
<style>
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

.parent .login-form {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login {
    font-size: 14px;
}
</style>