<template>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>
          <p
            v-for="cur of currencies"
            :key="cur"
           class="currency-line">
            <span>
                {{ getCurrency(cur) }}
            </span>
          </p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    props: ['rates'],
    data: () => ({
        currencies: ['RUB', 'USD', 'EUR'],
    }),
    computed: {
        base(){
            return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
        }
    },
    methods: {
        getCurrency(currency){
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency
            }).format(Math.floor(this.base * this.rates[currency]))
        }
    }
}
</script>