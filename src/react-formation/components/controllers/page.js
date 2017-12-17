import FormController from './form';

export default function pageController(pageComponent) {
    let page = {
        name: name,
        type: 'page',
        $forms: [],
        $pageComponent: pageComponent,
        $emptyForm: new FormController(),
        getForm: function (index) {
            if (this.$forms.length === 0) {
                return this.$emptyForm;
            }
            return this.$forms[index];
        },
        setForm: function (form) {
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
        redraw: function () {
            if (this.$pageComponent) {
                this.$pageComponent.forceUpdate();
            }
        }
    };
    if (pageComponent) {
        pageComponent.page = page;
    }
    return page;
}