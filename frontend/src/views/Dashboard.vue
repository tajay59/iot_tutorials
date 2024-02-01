<template>      
     <VContainer>
        <VRow>
            <VCol>
                <VTextField  v-model="start" label="Start date" type="Date" variant="underlined">  </VTextField>
                <VTextField v-model="end" label="End date" type="Date" variant="underlined">  </VTextField>
            </VCol>

            <VCol>
                <VBtn text="get data" @click="getDataFromApi"></VBtn>
            </VCol>
        </VRow>
        <VRow></VRow>
        <VRow></VRow>

     </VContainer>
</template>

<script setup>
/** JAVASCRIPT HERE */

// IMPORTS
import { ref,reactive,watch ,onMounted,onBeforeUnmount,computed } from "vue";  
import { useRoute ,useRouter } from "vue-router"; 
import  {useAppStore}  from "@/store/appStore";

 
 
// VARIABLES
const router      = useRouter();
const route       = useRoute();  
const AppStore    = useAppStore();
const start       = ref("");
const end         = ref("");
const one         = reactive({"start":0,"end":0})
let two           = 0;

//WATCHER
watch(start, (startnumber) =>{
    // console.log(`start date ${startnumber}`)
})

watch(end,(data)=>{
    // console.log(`End date ${data}`)
})
// FUNCTIONS
onMounted(()=>{
    // THIS FUNCTION IS CALLED AFTER THIS COMPONENT HAS BEEN MOUNTED
});


const getDataFromApi = async () =>{    
    
    let startTimestamp = new Date(start.value).getTime() / 1000
    let endTimestamp = new Date(end.value).getTime() / 1000
    console.log(`startTimestamp: ${startTimestamp} endTimestamp: ${endTimestamp} `)
    let res = await AppStore.getData(startTimestamp,endTimestamp);
    console.log(res);
}

onBeforeUnmount(()=>{
    // THIS FUNCTION IS CALLED RIGHT BEFORE THIS COMPONENT IS UNMOUNTED
});


</script>


<style scoped>
/** CSS STYLE HERE */


</style>
  