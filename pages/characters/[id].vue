<template>
  <div class="w-full bg-custom-gradient mx-auto p-6 text-white">
    <div class="md:container md:px-8 mx-auto flex flex-wrap">
      <router-link to="/" class="bg-red-700 w-fit p-2 rounded text-white">LOGO</router-link>
      <div v-if="loading"
           class="w-full overflow-hidden py-4 rounded my-8 flex flex-wrap md:flex-nowrap items-center justify-start">
        <div class=" hidden md:block rounded">
          <Skeleton borderRadius="0.25rem" class=" hidden md:block rounded" size="15rem"/>
        </div>
        <div class=" block md:hidden rounded">
          <Skeleton borderRadius="0.25rem" class=" block md:hidden rounded" size="11.25rem"/>
        </div>
        <div class="flex flex-wrap md:ms-8 mt-8 md:mt-0 content-start w-fit">
          <div class="w-full">
            <Skeleton width="5rem"/>
          </div>
          <div class="w-full mt-8">
            <Skeleton width="18rem"/>
          </div>
          <div class="w-full mt-2">
            <Skeleton width="18rem"/>
          </div>
          <div class="w-full mt-2">
            <Skeleton width="12rem"/>
          </div>
          <div class="w-full flex mt-8">
            <Skeleton height="2rem" width="8rem"/>
            <Skeleton class="ms-4" height="2rem" width="8rem"/>
          </div>
        </div>
      </div>
      <div v-else class="w-full py-4 rounded my-8 flex flex-wrap md:flex-nowrap items-center justify-between">
        <img :src="`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`" alt="" class="hidden md:block rounded" height="240"
             width="240">
        <img :src="`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`" alt="" class="block md:hidden rounded" height="180"
             width="180">
        <div class="w-full flex flex-wrap md:ms-8 mt-8 md:mt-0 content-start">
          <h1 class="text-3xl w-full">{{ character?.name }}</h1>
          <h6 class="text-md my-8">{{ character?.description }}</h6>
          <div class="flex mt-4 w-full">
            <Button class="me-4" icon="pi pi-arrow-up-right" label="Details" outlined severity="contrast"
                    style="border-radius:.5rem"/>
            <Button class="me-4" icon="pi pi-arrow-up-right" label="Wiki" outlined severity="contrast"
                    style="border-radius:.5rem"/>
            <Button icon="pi pi-arrow-up-right" label="Comiclink" outlined severity="contrast"
                    style="border-radius:.5rem"/>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#2C2E30] p-6">
      <div class="md:container md:px-8 mx-auto flex flex-wrap">
        <div class="grid grid-cols-4 gap-8 my-8">
          <template v-for="n in 20" v-if="loading" :key="n" >
            <div class="col-span-4 md:col-span-2 lg:col-span-1 overflow-hidden rounded-lg">
              <Skeleton height="20rem" width="17rem"></Skeleton>
            </div>
          </template>
          <template v-for="(item,index) in comics" v-else :key="index">
            <div
                class="col-span-4 md:col-span-2 lg:col-span-1 border rounded-lg border-gray-600 overflow-hidden p-2 flex content-between flex-wrap"
                @click="console.log(item)">
              <div class="my-4 text-white">{{ item.name }}</div>
            </div>
          </template>
        </div>
        <div class="w-full flex justify-center">
          <Paginator v-if="totalComics>20" v-model="page" :rows="20" :totalRecords="totalComics" class="mx-auto"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {useMarvelStore} from "~/stores/marvelStore";
import SERVER from '~/server'
import {defineComponent} from 'vue'
import Skeleton from "primevue/skeleton";
import Button from "primevue/button";

export default defineComponent({
  components:{
    Skeleton,Button
  },
  data() {
    return {
      id: this.$route.params.id,
      character: {},
      comics: {},
      loading: false,
      page: 1,
      totalComics: null
    }
  },
  mounted() {
    this.getCharacter()
  },
  methods: {
    async getCharacter() {
      this.loading = true
      SERVER.getCharacter(Number(this.$route.params.id))
          .then((res) => {
            this.character = res.data.data.results[0]
            this.comics = this.character.comics.items
            this.loading= false
            this.totalComics = this.character.comics.available
          })
          .catch((err) => {
            this.loading= false
            console.log(err)
            throw err
            this.character = {}
          })
    }
  },
  setup() {
    const marvelStore = useMarvelStore()
    return {marvelStore}
  }
})
</script>


<style scoped>

</style>