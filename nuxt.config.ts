// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/nora';
import {definePreset} from "@primeuix/styled";
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    },
  }
});
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: MyPreset
      }
    }
  }
})