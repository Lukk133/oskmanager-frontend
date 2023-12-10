<template>
    <div class="mt-16 text-center">
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
    </div>
</template>
<script>
export default {
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