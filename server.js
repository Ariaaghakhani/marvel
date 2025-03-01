import axios from 'axios'
import md5 from 'md5'

const API_URL = 'https://gateway.marvel.com/'
const publicKey = process.env.MARVEL_PUBLIC_KEY || '518f2fe3105ddd68ed23588c7e3dfcdd'
const privateKey = process.env.MARVEL_PRIVATE_KEY || '8b69b4707be111f293035ac8686197fa19d0a20c'
const ts = new Date().getTime()
const hash = md5(`${ts}${privateKey}${publicKey}`)
export default {
    getApi(){
        return axios ({
            method:'get',
            url:`${API_URL}/docs/public`,
            retries:3
        })
    },
    getCharacters(name,pageNumber){
        if(name !== '') {
            return axios({
                method:'get',
                url:`${API_URL}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
                retries:3,
                params:{
                    nameStartsWith:name,
                    offset:((Number(pageNumber)-1)*20),
                }
            })
        } else {
            return axios({
                method:'get',
                url:`${API_URL}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
                retries:3,
                params:{
                    offset:Number(pageNumber)===1 ? ((Number(pageNumber)-1)*20) : (((Number(pageNumber)-1)*20))+1,
                }
            })
        }

    },
    getCharacter(id){
        return axios({
            method:'get',
            url:`${API_URL}/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        })
    }
}