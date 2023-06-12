<template>
    <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>
  <div class="history-chart">
    <canvas></canvas>
  </div>
  <section>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>1212</td>
        <td>{{ filterData }}</td>
        <td>name</td>
        <td>
          <span class="white-text badge red">Расход</span>
        </td>
        <td>
          <button class="btn-small btn">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</div>
</template>
<script>
export default {
    data:() => ({
        interval: null,
        filterData: 'Загрузка...'
    }),
    mounted(){
        console.log('Components mounted')
        // this.interval = setInterval(()=> {
            // this.date = new Date()
            this.filterData = this.$dateFilter('short' ,'ru-RU')
        // }, 1000)
    },
    beforeUnmount(){
        console.log('Components destroyed');
        clearInterval(this.interval)
    }
}
</script>