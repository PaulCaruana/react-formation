export default function formField(name, attrs, component) {
    let form = {
        name: name,
        type: 'form',
        $submitted: false,
        $isField: false,
        $isForm: true,
        $children: [],
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
                form = form.$form
            }
            ;
        },
        get $valid() {
            return !this.$invalid
        },
        get $invalid() {
            return this.$children.find(child => {
                return child.$invalid
            })
        },
        get $pristine() {
            return !this.$dirty
        },
        get $dirty() {
            return this.$children.find(child => {
                return child.$dirty
            })
        },
        get $untouched() {
            return !this.$untouched
        },
        get $touched() {
            return this.$children.find(child => {
                return child.$touched
            })
        },
        get $pending() {
            return this.$children.find(child => {
                return child.$pending
            })
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
                child.reset()
            });
            this.redraw();
        },
        redraw: function () {
            component.setState({redraw: true});
        }
    }
    return form;
}