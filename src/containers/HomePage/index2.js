import React, { Component } from 'react';
import Form, { TextInput, Checkbox, Switch, Select, RadioGroup, Radio, Button } from 'components/index';
import { ComposedForm } from 'react-formwork';

class HomePage extends Component {
    static NAME = 'home';
    static displayName = `paul`;
    test() {
        console.log("test")
    }
    constructor(props) {
        super(props);
       // console.log(frm);
        Object.defineProperty(this, 'form3', {
            get: function() {
                return props.parent.form();
            }
        });
        Object.defineProperty(this, 'form4', {
            get: function() {
                return props.forms['home'];
            }
        });
        this.test()
        Object.defineProperty(this, 'form5', {
            get: () => {
                return props.form()
            }
        });
        this.form6 = () => props.form();
        props.xform(this)

        this.form = props.form;
        this.form2 = props.parent.form2;
    }

    onChange(event, index, value) {
        console.log('this', this.form());
        console.log('this', this.form2);
    }


    componentDidMount() {
       // this.form = this.props.form();
    }


    render() {
        const items = [
            {
                value: 'phone',
                label: 'Phone'
            },
            {
                value: 'email',
                label: 'Email'
            }
        ];
        return (
            <Form name="home" >
                <div>{this.data}</div>
                <TextInput
                    name="suburb"
                    placeholder="Suburb"
                    label="Suburb"
                />
                <RadioGroup name="salutation" required >
                    <Radio value="mr" label="Mr" />
                    <Radio value="mrs" label="Mrs" />
                    <Radio value="ms" label="Ms" />
                </RadioGroup>
                <TextInput
                    name="name"
                    required
                    placeholder="Type your name here"
                    label="Name"
                />
                <button
                    onClick={this.onChange.bind(this)}
                    />
                <Select required options={items} label="Contact method" name="contactMethod" />
                <TextInput
                    name="email"
                    required
                    email
                    placeholder="Type your email here"
                    label="E-mail"
                />
                <Switch
                    name="postalAddress"
                    label="Is your postal different than address?"
                />
                <Checkbox
                    name="over18"
                    label="Are you over 18 years old?"
                />
                <Button type="submit" primary label="Submit" disabled={false} />
            </Form>
        );
    }
}

export default ComposedForm(HomePage);