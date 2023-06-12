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
         class="helper-text invalid">Введите пароль</small>
         <small
            v-else-if="v$.form.password.$errors.length && this.v$.form.password.min.$invalid"
         class="helper-text invalid">Пароль не может содержать меньше {{v$.form.password.min.$params.min}} символов, сейчас {{form.password.length}}</small>
        </div>
    </div>
    <div class="card-action">
        <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
            Войти
            <i class="material-icons right">send</i>
        </button>
        </div>

        <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
        </p>
    </div>
    </form>
</template>
<script>
import { required, email, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import messages from '@/utils/messages'

export default {
    login: 'login',
    setup () {
        return { v$: useVuelidate() }
    },
    data: () => ({
        form: {
            email: '',
            password: '',
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
        }
    }),
    mounted(){
        if (messages[this.$route.query.message]){
            this.$message(messages[this.$route.query.message])
        }

    },
    methods: {
        async submitHandler(){
            if (this.v$.$invalid){
                this.v$.$touch()
                return
            }
            const formData = {
                email: this.form.email,
                password: this.form.password
            }

            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch (e){}
        }
    }
}
</script>
