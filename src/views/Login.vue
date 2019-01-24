<template>
   <main>
     <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm4 elevation-6>
            <v-toolbar class="pt-5 blue darken-4">
              <v-toolbar-title class="white--text"><h4>Login</h4></v-toolbar-title>
              </v-toolbar-items>
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4">
                <div>
                    <v-form v-model="valid" ref="form">
                      <v-text-field
                        label="Enter your e-mail address"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Enter your password"
                        v-model="password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        @click:append="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      <v-layout >
                          <v-btn @click="submit" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
                          <v-btn @click="clear">clear</v-btn>
                          <a href="">Forgot Password</a>
                      </v-layout>
                    </v-form>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
     </v-container>
   </main>
</template>

<script>
export default {
  name: 'Login',
  props: {
  },
  data() {
    return {
      valid: false,
      e1: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const userInfo = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch('user/userLogin', userInfo);
          this.email = '';
          this.password = '';
          this.$refs.form.reset();
          this.$router.replace({ name: 'main' });
        } catch (error) {
          this.$toasted.error('Hmm, those details don\'t seem right.');
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped lang="scss">
  #login {
    background-size: cover;
    overflow:hidden;
  }
  .loginOverlay {
    // background:rgba(33,150,243,0.3);
  }
  .photoCredit{
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
</style>
