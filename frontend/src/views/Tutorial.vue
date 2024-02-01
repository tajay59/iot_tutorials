<template>
    <div>
        <!-- HTML HERE -->    
        <h2>Tutorial</h2>
        <VBtn text="click" @click="AppStore.submitText(123,456)"></VBtn>
    </div>
</template>

<script setup>
/** JAVASCRIPT HERE */

// IMPORTS
import { ref,reactive,watch ,onMounted,onBeforeUnmount,computed } from "vue";  
import { useRoute ,useRouter } from "vue-router";
import { useAppStore } from "@/store/appStore";
 
 
// VARIABLES
const router      = useRouter();
const route       = useRoute();  
const AppStore    = useAppStore()


// FUNCTIONS
onMounted(()=>{
    // THIS FUNCTION IS CALLED AFTER THIS COMPONENT HAS BEEN MOUNTED
});


onBeforeUnmount(()=>{
    // THIS FUNCTION IS CALLED RIGHT BEFORE THIS COMPONENT IS UNMOUNTED
});


</script>


<style scoped>
/** CSS STYLE HERE */


</style>
  