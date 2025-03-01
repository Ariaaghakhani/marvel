import {defineStore} from "pinia";
export const useMarvelStore = defineStore('marvelStore',{
    state:()=>({
        characters:[],
        selectedCharacter:{}
    }),
    actions:{

    },
})