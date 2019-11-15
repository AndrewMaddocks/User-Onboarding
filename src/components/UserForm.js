import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);
  return (
    <div>
      <Form>
        <h1>Log In</h1>
        <Field className="field" type="text" name="name" placeholder="Name" />

        {touched.name && errors.name && <p>{errors.name}</p>}

        <Field className="field" type="text" name="email" placeholder="Email" />

        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field
          className="field"
          type="password"
          name="password"
          placeholder="Password"
        />

        {touched.password && errors.password && <p>{errors.password}</p>}

        <label>
          Terms of Service
          <Field
            className="field"
            required
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
        </label>
        <Field className="field" as="button" type="submit" name="submit">
          Submit
        </Field>
      </Form>
      {user.map(users => (
        <ul key={users.id}>
          <li>Name: {users.name}</li>
          <li>Email: {users.email}</li>
          <li>Password: {users.password}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;
