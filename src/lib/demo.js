// demo.js
import React from 'react';
import ReactDOM from 'react-dom';
import Form, {FieldComponent, MyHOC, TextHOC, Text, Address, SubmitButton} from './src/index';
import withListNull from './src/utils/withListNull';
import _PlainList from './src/utils/PlainList';
import TextField from 'material-ui/TextField'


const PlainList = withListNull(_PlainList);
const Txt = FieldComponent(TextField)


ReactDOM.render((
        <Form name="form" onSubmit={data => console.log(data)}>
            <PlainList items={["work", "play", "exercise"]} />
            <MyHOC name="name" if={false} label="Name" required placeholder="Type your name here" />
            <Text
                name="name"
                required
                placeholder="Type your name here"
                label="Your name"/>

            <Text
                name="userName"
                userNameIsValid
                placeholder="Type your user name here"
                label="Your user name"/>
            <Address label="Home" type="home"/>
            <Address label="Delivery" type="delivery"/>
            <Text
                name="email"
                required
                email
                placeholder="Type your email here"
                label="E-mail"/>
            <Text
                name="website"
                url
                placeholder="Type your website url here"
                label="Website" />

            <SubmitButton/>
        </Form>
), document.getElementById('container'));
