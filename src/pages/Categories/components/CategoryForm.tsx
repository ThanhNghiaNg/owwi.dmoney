import { Controller, useForm } from "react-hook-form";
import VerticalField from "../../../components/atoms/VerticalField";
import CInput from "../../../components/atoms/Input";
import CButton from "../../../components/atoms/CButton";
import { useCreateCategory } from "../../../apis/hooks/category";

const CategoryForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { mutate: createCategory, isPending } = useCreateCategory();

  const submitHandler = handleSubmit((data) => {
    createCategory(
      { ...data },
      {
        onSuccess: () => {
          console.log("Create record success");
          reset()
        },
      }
    );
  });

  return (
    <form onReset={() => reset()} onSubmit={submitHandler}>
      <div className="flex flex-col gap-4">
        <VerticalField label="Category Name">
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => {
              return <CInput value={value.toString()} onChange={onChange} />;
            }}
          />
        </VerticalField>
        <VerticalField label="Description">
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => {
              return <CInput value={value.toString()} onChange={onChange} />;
            }}
          />
        </VerticalField>
      </div>
      <div className="flex gap-4">
        <CButton
          label="Create"
          className="mt-6"
          type="submit"
          disabled={isPending}
        />
        <CButton
          label="Reset"
          className="mt-6"
          type="reset"
          variant="outlined"
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default CategoryForm;
