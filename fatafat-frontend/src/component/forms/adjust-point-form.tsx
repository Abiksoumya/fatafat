import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./form.css"; // You can style your form in LoginForm.css
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { InputNumber } from "primereact/inputnumber";
import { useAdjustPoint } from "../../mutation/adjust-point";
export type AdjustPointFormData = {
  type: String;
  userId: string;
  point: number;
};

export const AdjustPointForm = () => {
  const { register, handleSubmit, control } = useForm<AdjustPointFormData>();
  const adjustMutation = useAdjustPoint();

  const types = [
    { name: "Credit", value: "credit" },
    { name: "Debit", value: "debit" },
  ];

  const submitForm: SubmitHandler<AdjustPointFormData> = (data) => {
    adjustMutation.mutate(data);
    console.log(data);
  };

  return (
    <div className="login-form mt-4">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="p-field">
          <div className="mt-2">
            <label htmlFor="type">Transaction Type</label>
            <br />
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  optionLabel="name"
                  placeholder="Select Type"
                  options={types}
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className="w-full mt-2"
                />
              )}
            />
          </div>
          <div className="p-field mt-4">
            <label htmlFor="userId" className="mb-2">
              Target User ID
            </label>
            <InputText
              className="mt-2"
              id="userId"
              {...register("userId", { required: true })}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="point">Point</label>
            <br />
            <Controller
              name="point"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <InputNumber
                  id="amount"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  showButtons
                  className="mt-3 w-full"
                />
              )}
            />
          </div>
        </div>
        <Button label="Adjust" type="submit" />
      </form>
    </div>
  );
};

export default AdjustPointForm;
