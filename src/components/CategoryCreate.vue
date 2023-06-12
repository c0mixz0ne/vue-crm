<template>
    <div class="col s12 m6">
    <div>
    <div class="page-subtitle">
        <h4>Создать</h4>
    </div>
    <form @submit.prevent="submitHandler">
        <div class="input-field">
        <input
            v-model.trim="v$.title.$model"
            :class="{invalid: v$.title.$errors.length}"
         id="name" type="text">
        <label for="name">Название</label>
        <span
            v-if="v$.title.$errors.length && this.v$.title.required.$invalid"
         class="helper-text invalid">Введите название</span>
        </div>
        <div class="input-field">
        <input
            v-model.trim="v$.limit.$model"
            :class="{invalid: v$.limit.$errors.length}"
         id="limit" type="number">
        <label for="limit">Лимит</label>
        <span
        v-if="v$.limit.$errors.length && this.v$.limit.min.$invalid"
        class="helper-text invalid">Минимальная величина >= {{v$.limit.min.$params.min}}</span>
        <span
        v-else-if="v$.limit.$errors.length && this.v$.limit.required.$invalid"
        class="helper-text invalid">Заполните поле</span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
        </button>
    </form>
    </div>
</div>
</template>
<script>
import { required, minValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
    data: ()=>({
        title:'',
        limit: 1
    }),
    setup () {
        return { v$: useVuelidate() }
    },
    validations: () => ({
        title: {required},
        limit: {min: minValue(1), required}
    }),
    mounted(){
        M.updateTextFields();
    },
    methods: {
        async submitHandler(){
            if (this.v$.$invalid){
                this.v$.$touch()
                return
            }
            const formData = {
                title: this.title,
                limit: this.limit
            }
            try{
                const category = await this.$store.dispatch('addCategory', formData)
                this.title = ''
                this.limit = 1
                this.v$.$reset()
            }
            catch(e){}
        }
    }
}
</script>