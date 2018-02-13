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
        $renderPending: false,
        $placeholderField: null,
        registerChild: function (child) {
            this.$children.push(child);
            child.$form = this;
            return this;
        },
        removeChild: function (child) {
            const index = this.$children.findIndex(function ($child) {
                return $child === child;
            });
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
        field: function (fieldName) {
            const fields = this.$children.filter((child) => child.$isField);
            if (fields.length === 0) {
                return this.placeholderField();
            }
            const foundField = fields.find((field) => (field.name === fieldName));
            return foundField || this.placeholderField();
        },
        renderChildren: function() {
            this.$children.forEach(function (child) {
                if (child.$isField) {
                    child.$renderPending = true;
                } else {
                    child.renderChildren();
                }
            });
        },
        placeholderField: function() {
            if (!this.$placeholderField) {
                this.$placeholderField = new FieldController('_placeholderField');
            }
            return this.$placeholderField;
        },
        get $valid() {
            return !this.$invalid;
        },
        get $invalid() {
            const invalidChild = this.$children.find(child => {
                return child.$invalid;
            });
            return invalidChild !== undefined;
        },
        get $pristine() {
            return !this.$dirty;
        },
        get $dirty() {
            const dirtyChild = this.$children.find(child => {
                return child.$dirty;
            });
            return dirtyChild !== undefined;
        },
        get $untouched() {
            return !this.$touched;
        },
        get $touched() {
            const touchedChild =  this.$children.find(child => {
                return child.$touched;
            });
            return touchedChild !== undefined;
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
        get $incomplete() {
            return !this.$ready;
        },
        submitted: function () {
            this.$submitted = true;
            this.renderChildren();
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
            this.$renderPending = true;
            if (this.$page && this.$page.redraw) {
                this.$page.redraw();
            }
        }
    }
    return form;
}