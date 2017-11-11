import FormController from './formController';

export default function pageController(pageComponent) {
    let page = {
        name: name,
        type: 'page',
        $forms: [],
        $pageComponent: pageComponent,
        $emptyForm: new FormController(),
        get form() {
            if (this.$forms.length === 0) {
                return this.$emptyForm;
            }
            return this.$forms[0];
        },
        getForm: function (index) { return this.$forms[index]; },
        setForm: function (form) {
            if (!this.findForm(form.name)) {
                form.$page = this;
                this.$forms.push(form);
            }
        },
        findForm: function (name) {
            return this.$forms.find((form) => form.name === name);
        },
        redraw: function () {
            if (this.$pageComponent) {
                this.$pageComponent.setState({ redraw: true });
            }
        }
    };
    pageComponent.page = page;
    return page;
}