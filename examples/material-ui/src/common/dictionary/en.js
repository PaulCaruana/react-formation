/*eslint-disable no-template-curly-in-string */
const en = {
    form: {
        global: {
            validators: {
                required: '${props.label} must be entered'
            }
        },
        fieldTypes: {
            select: {
                validators: {
                    required: '${props.label} must be selected'
                }
            },
            password: {
                validators: {
                    matches: 'Both passwords must match'
                }
            }
        },
        fields: {
            age: {
                validators: {
                    minValue: '${props.label} must be least ${props.minValue} years of age',
                    maxValue: '${props.label} must be no more than ${props.maxValue} years of age'
                }
            }
        }
    }
};
/*eslint-enable */
export default en;