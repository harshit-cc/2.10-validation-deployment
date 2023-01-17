# 2.10 Validation and Deployment
## Preparation

Clone the lesson repository amd copy the starter code from `src/begin` into a work folder.

## Part 1: JOI Schema Validator

[JOI](https://joi.dev/) is a schema description language and data validator for JavaScript. 
It is used to validate data based on criteria created by the user. This is especially useful 
if there is a need to validate form inputs. In this example, the JOI validator will 
be used to validate user inputs in a form.

In order to use JOI together with React, the following packages needs to be installed:

```
npm install joi joi-browser
```
Run the starter to code to see a simple data entry form rendered in React:

```
npm start
```
Open the source code for the `SimpleForm` component and integrate JOI functions:

```js
// components/SimpleForm.js
...
import Joi from 'joi-browser';

const schema = {
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(100).required(),
}
```
The JOI schema is constructed using provided types and constraints. Refer to the JOI documentation
for details of the schema definition.

The next step is to validate the input values against the scheme. In order to get the name of the field to be validated, the computed property value can be used for both the object to compare and sub schema:

```js
// components/SimpleForm.js
  const validate = (event) => {
    const {name, value} = event.target;
    const objToCompare = {[name]: value};
    const subSchema ={[name]: schema[name]};

    const result = Joi.validate(objToCompare, subSchema);
    const {error} = result;
    return error ? error.details[0].message : null;
  }

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    const result = Joi.validate(user, schema, {abortEarly: false});
    ...
  }
```
If the input validation fails, an `error` will be displayed in the console log window. 
Open up the Inspector window on your browser to check the console messages.

Test the entry form with invalid inputs and observe the error messages displayed.

## Part 2: Environment Variables and `dotenv`

Environment variables are pre-defined name/value pairs that are set outside a program, 
typically used to configure your code used to generate your application. For example, 
you can set an environment variable `DEBUG=true` in your code to generate more verbose 
debugging information used during development. When the code is ready for production, 
the variable can be set to `DEBUG=false` to switch of debugging messages for better
performance.

In Node.js, the `dotenv` package can be used to create system variables on the server side.

For ReactJS, `dotenv` is automatically installed and the environment variables start with 
the prefix `REACT_APP_`, e.g. `REACT_APP_TITLE`

In order to create a configuration file for the application, create a file called `.env` 
in the root directory of the application.

```js
// .env
REACT_APP_MESSAGE=This message is from an environment variable
```

To refer to the environment variable in your code, use `process.env.REACT_APP_<variable_name>`

In `App.js`, input the following code:

```js
function App() {
  return (
    <> 
      ...
      <h3>{process.env.REACT_APP_MESSAGE}</h3>
    </>
  );
}
```
The application should be able to display the environment variable in the screen.

In a React development environment, you can use the built-in environment variable 
`NODE_ENV` to determine the target application that is being compiled. This
variable is read-only variable can be used to toggle debugging messages, for example.

| Command | `NODE_ENV` value |
|---|---|
| `npm start` | development |
| `npm run test` | test |
| `npm run build` | production | 

Let's add some verbose debugging messages into `SimpleForm`:
```js
// SimpleForm.js
...
handlerOnChange = (event) => {
  ...
  if (process.env.NODE_ENV === 'development')
  console.log('userData', userData);
}
...
```
Run your application to see the debugging messages on the console window.

```
npm start
```
Start a new terminal window and run a production build with:
```
npm run build
```
This command will compile an optimised production build of your React 
application into a folder called `build`. Change to the `build` folder
and start the application, this time in production mode.
```
cd build
npx serve
```
Since the debugging messages are only shown when `process.env.NODE.ENV === development`,
they will not appear in the production build.

Check out [this page](https://create-react-app.dev/docs/adding-custom-environment-variables/) 
for more information on using environment variables on React apps.

## Part 3: Deploying to Netlify

Follow this [guide](https://www.freecodecamp.org/news/publish-your-website-netlify-github/) to deploy the page to Netlify. 