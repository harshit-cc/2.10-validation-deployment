## Brief

### How to use the lesson sample code

There are two folders prepared for the lesson. 
- [Instructor's folder](./lesson-sample-code/instructor-demo-code)
- [Learners' folder](./lesson-sample-code/learners-practice-code)

Instructor to use the code provided for demonstration during the I DO segment. Learners will use the java file provided in the respective folder for practice during the WE DO segment.

### Any other announcements to instructors or learners

---

## Part 1 - Environment Variables and dotenv

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

## Part 2 - JOI Schema validator

JOI is a schema description language and data validator for JavaScript. It is used to validate data based on criteria created by the user.

This is especially useful if there is a need to validate form inputs.

In this example, the JOI validator will be used to validate user inputs in a form.

In order to use JOI together with React, the following packages needs to be installed:

`joi`
`joi-browser`

Create a folder called component and in the folder, a file called SimpleForm.js and code the following codebase.

Codebase for SimpleForm for structure
```js
import { useState } from "react";

function SimpleForm(){
    const [user, setUser] = useState({
        name: "",
        email: "",
        age: 0
    })
    const [errors, setErrors] = useState({});

    return (
        <>
            <form>
                <label>Name:</label>
                <input type="text" name="name" placeholder="Enter Name"/>
                <br/>
                <label>Email:</label>
                <input type="email" name="email" placeholder="Enter Email"/>
                <br/>
                <label>Age:</label>
                <input type="number" name="age" placeholder="Enter Name"/>
                <br/>
                <button>Submit</button>
            </form>
        </>
    );
}

export default SimpleForm;
```

Define the JOI Schema. The parameters for each field can be specified and more information can be found in the documentation.

```js
const schema = {
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(1).max(100).required()
};
```

Add the onChange and data validation functions:
```js
const validateProperty = (event) => {
    const { name, value } = event.target;
    const objToCompare = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(objToCompare, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
};

const handleChange = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(event);
    if (errorMessage) {
        errorData[name] = errorMessage;
    } else {
        delete errorData[name];
    }
    let userData = { ...user };
    userData[name] = value;
    setUser(userData);
    setErrors(errorData);
};
```

Modify the fields to include the handleChange function:
```js
<label>Name:</label>
<input type="text" name="name" placeholder="Enter Name" onChange={handleChange}/>
<br/>
<label>Email:</label>
<input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
<br/>
<label>Age:</label>
<input type="number" name="age" placeholder="Enter Name"
onChange={handleChange}/>
<br/>
<button>Submit</button>
```

Add the saveUser function:
```js
const saveUser = (event) => {
    event.preventDefault();
    const result = Joi.validate(user, 
        schema, { abortEarly: false });
    const { error } = result;
    if (!error) {
        console.log(user);
        return user;
    } else {
        const errorData = {};
        for (let item of error.details) {
            const name = item.path[0];
            const message = item.message;
            errorData[name] = message;
        }
        setErrors(errorData);
        console.log(errorData);
        return errorData;
    }
};
```

Integrate the function to the form. After this, test out the form by opening the console to check the outputs upon form submission.

---

## Part 3 - GitHub pages 

Instructors are to follow this [guide](https://create-react-app.dev/docs/deployment/#github-pages) to deploy the page in github. It's better to fork and clone the lesson and deploy demo_app for students' benefit.