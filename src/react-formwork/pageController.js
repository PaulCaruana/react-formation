import FormController from './formController';

export default function pageController(name, pageComponent) {
    let page = {
        name: name,
        type: 'page',
        $forms: [],
        $emptyForm: new FormController(),
        get form() {
            if (this.$forms.length === 0) {
                return this.$emptyForm;
            }
            return this.$forms[0];
        },
        getForms: (index) => this.$forms[index],
        setForms: (form) => {
            const form = this.findForm(form.name);
            if (!form) {
                this.$forms.push(form);
            }
        },
        findForm: (name) => {
            return this.$forms.find((form) => form.name === name);
        },
        redraw: function () {
            if (pageComponent) {
                pageComponent.setState({redraw: true});
            }
        }
    }
    return page;
}