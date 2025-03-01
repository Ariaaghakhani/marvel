<template>
  <div class="w-full bg-custom-gradient mx-auto p-6 text-white">
    <div class="md:container md:px-8 mx-auto flex flex-wrap">
      <div class="bg-red-700 w-fit p-2 rounded text-white">LOGO</div>
      <div class="w-full bg-[#2C2E30] p-4 rounded mt-3 flex flex-nowrap items-center justify-between">
        <InputText  style="border-radius:.25rem" type="text" v-model="search" placeholder="Search for characters" class="w-full"/>
        <Button  style="border-radius:.25rem;color:white " class="ms-4 rounded-xl" variant="secondary" label="Search" icon="pi pi-search" :loading="loading" @click="getCharacters(search)"/>
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
        <template v-for="item in marvelStore.characters" :key="item.id" v-else>
          <router-link :to="`/characters/${item.id}`" class="col-span-4 md:col-span-2 lg:col-span-1 border rounded-lg border-gray-600 overflow-hidden p-2 flex content-between flex-wrap" @click="console.log(item)">
            <img :src="`${item.thumbnail.path}.${item.thumbnail.extension}`" class="object-cover w-full rounded-lg" alt="">
            <div class="my-4 text-white">{{item.name}}</div>
          </router-link>
        </template>
      </div>
      <div class="w-full flex justify-center">
        <Paginator :rows="20" :totalRecords="totalRecords" class="mx-auto" @page="onPageChange"/>
      </div>
    </div>
  </div>
</template>


<script>

import SERVER from '~/server.js'
import {useMarvelStore} from "~/stores/marvelStore.js";
import Skeleton from 'primevue/skeleton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';


export default {
  components:{
    Skeleton,InputText,Button,Paginator
  },
  data() {
    return {
      characters: [],
      error:null,
      search: "",
      loading:false,
      page:1,
      totalRecords:null,
    };
  },
  methods: {
    async getApis(){
      SERVER.getApi()
          .then((res)=>{

          })
          .catch((err)=>{
            console.log(err)
            this.error=err
            throw err
          })
    },
    async getCharacters(){
      this.loading = true
      SERVER.getCharacters(this.search,this.page)
          .then((res)=>{
            this.marvelStore.characters = res.data.data.results
            this.characters = res.data.data.results
            this.totalRecords = res.data.data.total
            this.loading=false
          })
          .catch((err)=>{
            console.log(err)
            this.error=err
            throw err
            this.loading=false
          })
    },
    onPageChange(event){
      this.page = event.page+1
      this.getCharacters();
    }
  },
  async mounted() {
    await this.getCharacters()
    await this.getApis()
  },
  setup(){
    const marvelStore = useMarvelStore()
    return {marvelStore}
  },
};
</script>

<style scoped>
</style>
