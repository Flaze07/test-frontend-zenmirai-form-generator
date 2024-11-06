import type FormConfig from "@/interfaces/FormConfig.interface";

export default interface FormStepData {
    step: number;
    title: string;
    description: string;
    fields: FormConfig[];
}