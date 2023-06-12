<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('customClick')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ filterData }}</span>
        </div>
        <ul class="right hide-on-small-and-down">
          <li>
            <a ref="dropDown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a  href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
    data:() => ({
        // date: new Date(),
        interval: null,
        dropDown: null,
        filterData: 'Загрузка...'
    }),
    methods:{
        async logout(){
            console.log('Logout')
            await this.$store.dispatch('logout')
            this.$router.push('/login?message=logout')
        },
    },
    mounted(){
        console.log('Components mounted')
        this.interval = setInterval(()=> {
            // this.date = new Date()
            this.filterData = this.$dateFilter('datetime' ,'ru-RU')
        }, 1000),
        this.dropDown = M.Dropdown.init(this.$refs.dropDown, {constrainWidth:true})
    },
    beforeUnmount(){
        console.log('Components destroyed');
        clearInterval(this.interval)
        if (this.dropDown && this.dropDown.destroy){
            this.dropDown.destroy
        }
    },
    computed:{
      name(){
        return this.$store.getters.info.name
      }
    }
}
</script>