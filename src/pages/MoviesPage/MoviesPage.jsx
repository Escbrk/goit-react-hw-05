import { Field, Formik, Form } from "formik";

const MoviesPage = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        actions.resetForm();

        if (values.query.trim() === "") {
          console.log("error");
          return;
        }

        onSearch(values.query.toLowerCase());
      }}
    >
      <Form>
        <Field name="query" type="search" placeholder="Search movie..." />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default MoviesPage;
