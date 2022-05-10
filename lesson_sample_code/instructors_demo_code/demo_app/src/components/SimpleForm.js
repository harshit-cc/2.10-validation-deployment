import { useState } from "react";
import Joi from "joi-browser";

function SimpleForm(){
    const [user, setUser] = useState({
        name: "",
        email: "",
        age: 0
    })

    const [errors, setErrors] = useState({});
    const schema = {
        name: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().required(),
        age: Joi.number().min(1).max(100).required()
    };

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

    return (
        <>
            <form onSubmit={saveUser}>
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
            </form>
        </>
    );
}

export default SimpleForm;