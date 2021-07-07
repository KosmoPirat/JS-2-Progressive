Vue.component('filter-prod', {
    data() {
        return {
            searchLine: '',

        };
    },
    template: `
        <form action="#" method="post" class="search-form">
            <input type="text" class="search-field" v-model="searchLine">
            <button class="btn-search" type="submit" @click.prevent="$root.$refs.products.filter(searchLine)">
                <i class="fas fa-search"></i>
            </button>
        </form>`
});