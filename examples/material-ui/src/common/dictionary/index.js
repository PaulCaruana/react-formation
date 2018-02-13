import dictionary from './en';

const messages = {
    validator: (validatorType, fieldType, name) => {
        if (!dictionary && !dictionary.form) {
            return null;
        }
        const form = dictionary.form;
        const fieldMsg = (name && form.fields && form.fields[name] && form.fields[name].validators
            && form.fields[name].validators[validatorType]);
        if (fieldMsg) {
            return fieldMsg;
        }
        const typeMsg = (fieldType, form.fieldTypes && form.fieldTypes[fieldType]
            && form.fieldTypes[fieldType].validators
            && form.fieldTypes[fieldType].validators[validatorType]);
        if (typeMsg) {
            return typeMsg;
        }
        const globalMsg = (form.global && form.global.validators
            && form.global.validators[validatorType]);
        if (globalMsg) {
            return globalMsg;
        }
        return null;
    }
};

export default messages;