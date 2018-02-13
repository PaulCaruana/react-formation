import FormController from './form';

export default function pageController() {
    let page = {
        name: name,
        type: 'page',
        $forms: [],
        $pageComponent: null,
        $emptyForm: new FormController(),
        getForm: function (index) {
            if (this.$forms.length === 0) {
                return this.$emptyForm;
            }
            return this.$forms[index];
        },
        registerForm: function (form) {
            if (!this.findForm(form.name)) {
                form.$page = this;
                this.$forms.push(form);
            }
        },
        get form() {
            return this.getForm(0);
        },
        findForm: function (name) {
            return this.$forms.find((form) => form.name === name);
        },
        registerComponent(pageComponent) {
            this.$pageComponent = pageComponent;
            this.redraw();
        },
        redraw: function () {
            if (this.$pageComponent) {
                this.$pageComponent.forceUpdate();
            }
        }
    };
    return page;
}