import { Field, Formik, Form } from "formik";
// import { useSearchParams } from "react-router-dom";

const SearchField = ({ onSearch }) => {
  // const validationSchema =

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        actions.resetForm();

        onSearch(values.query.toLowerCase());
      }}
    >
      {({ values }) => (
        <Form>
          <Field
            name="query"
            type="search"
            placeholder="Search movie..."
            value={values.query}
          />
          <button type="submit" disabled={!values.query.trim()}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchField;
