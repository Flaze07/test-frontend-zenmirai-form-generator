import type RadioOptions from './RadioOptions.interface';

export default interface FormConfig {
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    options?: Array<RadioOptions> | Array<String>;
}