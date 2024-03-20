import { Field, Formik, Form } from "formik";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";

const SearchField = () => {
  const [params, setParams] = useSearchParams();
  const notify = () => toast.error("This field can't be empty!");
  const validationSchema = Yup.object().shape({
    query: Yup.string().min(1, "Too Short! ❌").required(notify),
  });

  const onReset = () => {
    params.delete("query");
    setParams(params);
  };

  return (
    <Formik
      initialValues={{ query: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();

        params.set("query", values.query);
        setParams(params);
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
          <button type="reset" onClick={onReset}>
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchField;
