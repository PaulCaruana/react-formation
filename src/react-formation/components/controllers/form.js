import FieldController from './field';

export default function formField(name, attrs, component) {
    let form = {
        name: name,
        type: 'form',
        $submitted: false,
        $isField: false,
        $isForm: true,
        $children: [],
        $page: null,
        $emptyField: new FieldController('_empty'),
        registerChild: function (child) {
            this.$children.push(child);
            child.$form = this;
            return this;
        },
        removeChild: function (child) {
            var index = this.$children.indexOf[child];
            if (index > -1) {
                this.$children.splice(index, 1);
            }
            child.$form = null;
        },
        getChild: function (childName) {
            return this.findChild(this, childName);
        },
        findChild: function (form, fieldName) {
            var child = this.$children.find(function (child) {
                if (child.$isField) {
                    var found = (child.name === fieldName);
                    return found;
                } else {
                    var form = child;
                    return findChild(form, fieldName)
                }
            });
            return child;
        },
        findField: function (fieldName) {
            var form = this;
            while (form.$form != null) {
                form = form.$form;
            }
        },
        field: function (fieldName) {
            const fields = this.$children.filter((child) => child.$isField);
            if (fields.length === 0) {
                return this.$emptyField;
            }
            const foundField = fields.find((field) => (field.name === fieldName));
            return foundField || this.$emptyField;
        },
        get $valid() {
            return !this.$invalid;
        },
        get $invalid() {
            return this.$children.find(child => {
                return child.$invalid
            });
        },
        get $pristine() {
            return !this.$dirty;
        },
        get $dirty() {
            return this.$children.find(child => {
                return child.$dirty;
            });
        },
        get $untouched() {
            return !this.$untouched;
        },
        get $touched() {
            return this.$children.find(child => {
                return child.$touched
            });
        },
        get $pending() {
            const pending = this.$children.find(child => {
                return child.$pending;
            });
            return (pending != null);
        },
        get $ready() {
            return this.$valid && !this.$pending;
        },
        submitted: function () {
            this.$submitted = true;
            this.redraw();
        },
        reset: function () {
            this.$submitted = false;
            this.$form = null;
            this.$children.forEach(child => {
                child.reset();
            });
            this.redraw();
        },
        redraw: function () {
            if (this.$page && this.$page.redraw) {
                this.$page.redraw();
            }
        }
    }
    return form;
}