import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import BrandingWhite from "./assets/branding-white.png";
import { TextInput } from "./components/input";
import { Link } from "./components/link";
import { FieldNames } from "./enums/field-name.enum";

function App() {
  const [mountedUrl, setMountedUrl] = useState<string>();

  async function handleSubmit(data): Promise<void> {
    const url = new URL(data.link);

    data.params.forEach((param) => {
      if (param.key && param.value) {
        url.searchParams.append(param.key, param.value);
      }
    });

    setMountedUrl(url.toString());
  }

  return (
    <main className="p-10">
      <div className="flex items-center justify-center">
        <img
          src={BrandingWhite}
          alt="Linkly"
          className="w-[170px]"
          draggable={false}
        />
      </div>

      <Formik
        initialValues={{
          [FieldNames.Link]: "",
          [FieldNames.Params]: [
            {
              [FieldNames.Key]: "utm_source",
              [FieldNames.Value]: "",
            },
            {
              [FieldNames.Key]: "utm_medium",
              [FieldNames.Value]: "",
            },
            {
              [FieldNames.Key]: "utm_campaign",
              [FieldNames.Value]: "",
            },
            {
              [FieldNames.Key]: "utm_term",
              [FieldNames.Value]: "",
            },
          ],
        }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="grid gap-6 mb-6 pt-4 pb-8 border-b">
              <TextInput
                label="Url base"
                name={FieldNames.Link}
                value={values[FieldNames.Link]}
                onChange={handleChange(FieldNames.Link)}
                type="text"
                placeholder="https://trebla.com.br"
              />
            </div>

            {mountedUrl && (
              <Link
                title={mountedUrl}
                onNewClick={() => setMountedUrl(undefined)}
              />
            )}

            <FieldArray name={FieldNames.Params}>
              {({ insert, remove, push }) => (
                <div className="flex-column">
                  <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
                    {values.params.length > 0 &&
                      values.params.map((param, index) => {
                        return (
                          <div
                            className="flex w-full md:gap-4 gap-2 border rounded p-4 items-center"
                            key={index}
                          >
                            <div className="w-full">
                              <TextInput
                                label="Key"
                                name={`params.${index}.key`}
                                value={values.params[index].key}
                                onChange={handleChange(`params.${index}.key`)}
                                type="text"
                                placeholder="utm_source"
                              />
                            </div>

                            <div className="w-full">
                              <TextInput
                                label="Value"
                                name={`params.${index}.value`}
                                value={values.params[index].value}
                                onChange={handleChange(`params.${index}.value`)}
                                type="text"
                                placeholder="google"
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-[#101827]">
                                Remove
                              </label>

                              <button
                                type="button"
                                className="text-white border hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => remove(index)}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <button
                    type="button"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
                    onClick={() =>
                      push({
                        [FieldNames.Key]: "",
                        [FieldNames.Value]: "",
                      })
                    }
                  >
                    Add more
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-16 border"
            >
              Do it
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default App;
