<template>
    <ul class="sidenav app-sidenav">
        <router-link
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            custom
            v-slot="{ navigate, isActive}"
        >
            <li
                :class="[isActive && 'active']"
            >
                <a :href="link.url" @click="navigate" class="waves-effect waves-orange pointer">{{link.title}}</a>
            </li>
        </router-link>
    </ul>
</template>
<script>
export default {
    data: () => ({
        links:[
            {title: 'Счет', url: '/'},
            {title: 'История', url: '/history'},
            {title: 'Планирование', url: '/planning'},
            {title: 'Новая запись', url: '/record'},
            {title: 'Категории', url: '/categories'},
        ]
    })
}
</script>