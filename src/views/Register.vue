<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="v$.form.email.$model"
          :class="{invalid: v$.form.email.$errors.length, validate: !v$.form.email.$errors.length}"
      >
      <label for="email">Email</label>
      <small
        v-if="v$.form.email.$errors.length && this.v$.form.email.required.$invalid"
        class="helper-text invalid">Введите Email
      </small>
      <small
        v-else-if="v$.form.email.$errors.length && this.v$.form.email.email.$invalid"
      class="helper-text invalid">Email должен быть валидным
      </small>

    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="v$.form.password.$model"
          :class="{invalid: v$.form.password.$errors.length, validate: !v$.form.password.$errors.length}"
      >
      <label for="password">Пароль</label>
        <small
          v-if="v$.form.password.$errors.length && this.v$.form.password.required.$invalid"
         class="helper-text invalid">Введите Password</small>
        <small
          v-else-if="v$.form.password.$errors.length && this.v$.form.password.min.$invalid"
         class="helper-text invalid">Password не может содержать меньше {{v$.form.password.min.$params.min}} символов, сейчас {{form.password.length}}</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="v$.form.name.$model"
          :class="{invalid: v$.form.name.$errors.length, validate: !v$.form.name.$errors.length}"
      >
      <label for="name">Имя</label>
      <small
        v-if="v$.form.name.$errors.length && this.v$.form.name.required.$invalid"
       class="helper-text invalid">Введите имя</small>
       <small
        v-else-if="v$.form.name.$errors.length && this.v$.form.name.min.$invalid"
       class="helper-text invalid">Имя не может быть меньше {{v$.form.name.min.$params.min}} символов</small>
    </div>
    <p>
      <label>
        <input
        v-model="form.rules"
        type="checkbox" />
        <span
        :class="{redColor: !form.rules}"
        >С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>
<script>
import { required, email, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default ({
    name: 'register',
    setup () {
        return { v$: useVuelidate() }
    },
    data: () => ({
        form: {
            email: '',
            password: '',
            name: '',
            rules: false
        },
    }),
    validations: () => ({
        form: {
            email: {
              required, email
            },
            password: {
              required, min: minLength(6)
            },
            name: {
              required, min: minLength(2)
            },
            rules: {
              true: v => v
            },
        }
    }),
    methods: {
        async submitHandler(){
            if (this.v$.$invalid){
                this.v$.$touch()
                return
            }
            const formData = {
                email: this.form.email,
                password: this.form.password,
                name: this.form.name,
                rules: this.form.rules
            }
            try {
                await this.$store.dispatch('register', formData)
                this.$router.push('/')
            } catch (e) {}
        }
    }
})
</script>
<style scoped>
  .redColor{
    color:red;
  }
</style>