<template>
    <div>
        <!-- HTML HERE -->    
        <h2>Tutorial</h2>
       
        <VContainer>
            <VRow class="bg-secondar yContainer pa-5"> 
                <VTextField v-model="numbers.digit1" type="number" label="Digit 1" color="primary"></VTextField>
                <VSpacer />
                <VTextField v-model="numbers.digit2"  type="number" label="Digit 2" color="primary"></VTextField>
                <VSpacer />
                <VBtn text="Multiply" @click="sendFormData"></VBtn>
                <VSpacer />
                <VCol cols="3">
                <div>Server response</div>
                <span>{{ formRes }}</span>
                </VCol>
                <VCol cols="3">                 
                <span>  {{ info }}</span>
                </VCol>
            </VRow>

            <VDivider class="my-5" />

            <VRow class="bg-surface pa-5"> 
                <VTextField v-model="numbers1.digit1" type="number" label="Digit 1" color="primary"></VTextField>
                <VSpacer />
                <VTextField v-model="numbers1.digit2"  type="number" label="Digit 2" color="primary"></VTextField>
                <VSpacer />
                <VBtn text="Divide" @click="sendJsonData"></VBtn>
                <VSpacer />
                <VCol cols="3">
                <div>Server response</div>
                <span>{{ jsonRes }}</span>
                </VCol>
            </VRow>

            
            <VDivider class="my-5" />


            <VRow>
                <VCol>
                    <div>{{ slider }}</div>
                    <v-slider v-model="slider.r" min="1" max="255" ></v-slider>
                    <v-slider v-model="slider.g" min="1" max="255" ></v-slider>
                    <v-slider v-model="slider.b" min="1" max="255" ></v-slider>
                    <VCard title="Radio" color="rgba(2, 250, 0, 0.5)"  ></VCard>
                    <VDivider class="my-1"  />
                    <VCard title="TV" :color="onecolor"   ></VCard>
                    <VDivider class="my-1"  />
                    <VCard title="SOCIAL" :color="`rgba(${slider.r},${slider.g},${slider.b},1)`"   ></VCard>
                </VCol>
            </VRow>
        </VContainer>
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
const AppStore    = useAppStore();


const formRes     = ref(null); // bool, int float, string
const jsonRes     = ref(null);
const numbers     = reactive({"digit1":0,"digit2":0}); // {"digit1":0,"digit2":0});
const numbers1    = reactive({"digit1":10,"digit2":0});

const onecolor    = ref("rgba(170,205,255,1)");
const slider      = reactive({"r":0,"g":0,"b":0});

// 

// FUNCTIONS
onMounted(()=>{
    // THIS FUNCTION IS CALLED AFTER THIS COMPONENT HAS BEEN MOUNTED
    // console.log(onecolor.value);
    // console.log(numbers1.digit1);

});

// WATCHERS
const numberChange = watch(numbers, (num)=>{
    console.log("Number changes", num);
})

//COMPUTED PROPERTIES
const info = computed(()=>{
    // let mul = numbers.digit1 * numbers.digit2;
    
     let details = `You entered these numbers ${numbers.digit1} and ${numbers.digit2} `;
   
    return   details // `${numbers.digit1} and ${numbers.digit2}`;
})

onBeforeUnmount(()=>{
    // THIS FUNCTION IS CALLED RIGHT BEFORE THIS COMPONENT IS UNMOUNTED
});


const sendFormData = async ()=> {
    let res = await AppStore.submitForm(numbers.digit1,numbers.digit2);
    formRes.value = res;
}


const sendJsonData = async ()=> {
    let res = await AppStore.submitJson(numbers1.digit1,numbers1.digit2);
    jsonRes.value = res;
}


</script>


<style scoped>
/** CSS STYLE HERE */


</style>
  