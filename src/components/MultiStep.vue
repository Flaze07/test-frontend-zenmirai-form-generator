<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import type FormConfig from '@/interfaces/FormConfig.interface';
import type FormStepData from '@/interfaces/FormStepData.interface';
import type FormInputValues from '@/interfaces/FormInputValues.interface';

// import FormStep from '@/components/FormStep.vue';
import FormViewer from '@/components/FormViewer.vue';
import NavigationButtons from '@/components/NavigationButtons.vue';
import JumpButton from '@/components/JumpButton.vue';

const props = defineProps<{
    formStepData: FormStepData[]
}>();

const emit = defineEmits([
    'submit'
]);

/**
 * variabes related to form step count
 */
const totalStep = props.formStepData.length;
const currentStep = ref<number>(0);

/**
 * variables related to next button
 */
const nextDisabled = ref<boolean>(true);

/**
 * Initialize input value
 */
const inputValue = ref<FormInputValues[][]>([]);

props.formStepData.forEach((elem) => {
    const temp: FormInputValues[] = [];
    elem.fields.forEach((elem2) => {
        temp.push({
            question: elem2.label,
            required: elem2.required,
            value: ''
        })
    })

    inputValue.value?.push(temp);
})


/**
 * perform checking on whether or not to enable next button
 * whenever currentStep changes
 */

watch(currentStep, (newCurrentStep) => {
    checkNextButton();
})

/**
 * input functions
 */
function updateInputValue(index: number, value: string) {
    inputValue.value[currentStep.value][index].value = value;
    checkNextButton();
}

function checkNextButton() {
    let valid = true;
    inputValue.value[currentStep.value].forEach((elem) => {
        if (elem.required && elem.value === '') {
            valid = false;
        }
    })

    nextDisabled.value = !valid;
}

function updateStepValue(newValue: number) {
    if (newValue >= totalStep) {
        submit();
        return;
    }

    currentStep.value = newValue;
}

function submit() {
    emit('submit', inputValue.value);
}

</script>

<template>
    <main class="vertical flex-center form-container">
        <div class="vertical title-container">
            <h1>
                {{ formStepData[currentStep].title }}
            </h1>
            <p>
                {{ formStepData[currentStep].description }}
            </p>
        </div>
        <div class="vertical form-box">
            <FormViewer 
                :formFields="formStepData[currentStep].fields" 
                :formInputValues="inputValue[currentStep]"
                @update-value="(index: number, value: string) => updateInputValue(index, value)"
            />
            <NavigationButtons :currentStep="currentStep" :totalStep="totalStep" :nextDisabled="nextDisabled" @update-value="updateStepValue" />
        </div>
        <JumpButton :totalStep="totalStep" :currentStep="currentStep" @update-value="updateStepValue" />
    </main>    
</template>

<style scoped>

.form-container {
    width: 100%;
    margin-top: 15vh;
}

.title-container {
    width: var(--form-width);
    margin-left: -40px;
    margin-bottom: 50px;;
}

</style>