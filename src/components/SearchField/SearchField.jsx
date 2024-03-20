import { Field, Formik, Form } from "formik";
import { useSearchParams } from "react-router-dom";

const SearchField = ({ onSearch }) => {
  const [params, setParams] = useSearchParams();

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        actions.resetForm();

        if (values.query.trim() === "") {
          console.log("error");
          return;
        }

        params.set("query", values.query);
        setParams(params);
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

export default SearchField;
