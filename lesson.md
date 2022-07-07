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

The next step is to validate the input values against the scheme:

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

Environment variables are variables whose value are set outside the program, typically through functionality built into the appication. An environment variable is made up of a name/value pair, and any number may be created and available for reference at a point in time.

For nodeJS, the dotenv package can be used to create system variables on the server side.

For ReactJS, dotenv is automatically installed and the environment variables start with the prefix `REACT_APP_`.

Ex.
REACT_APP_TITLE

In order to create a configuration file for the application, create a file called `.env` and place the file in the root directory of the application.

Content of .env
```
REACT_APP_TITLE="Demo App"
```

To use the environment variables, use the `process.env.REACT_APP_<variable_name>`

In App.js, input the following code:

```js
function App() {
  return (
    <> 
      <h1>{process.env.REACT_APP_TITLE}</h1>
    </>
  );
}

export default App;
```

The application should be able to display the environment variable in the screen.

---


---

## Part 3 - GitHub pages 

Instructors are to follow this [guide](https://create-react-app.dev/docs/deployment/#github-pages) to deploy the page in github. It's better to fork and clone the lesson and deploy demo_app for students' benefit.