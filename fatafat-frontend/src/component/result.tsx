import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PATTIS } from "../helper/constants";
import { slots } from "../helper/constants";

import { useDeclareResult } from "../mutation/result.mutation";
import { InputNumber } from "primereact/inputnumber";
export type ResultFormData = {
  winNumber: number;
  patti: string
  slot:any
};

export const Result = () => {
    console.log("[]]]]]]]]]]]]]]]]]]]]",PATTIS);

  const { register, handleSubmit, control } = useForm<ResultFormData>();
  const resultMutation = useDeclareResult();

  const submitForm: SubmitHandler<ResultFormData> = (data) => {
    console.log("result form data: ", typeof(data.winNumber))
    resultMutation.mutate(data);
  };

  return (
    <div className="login-form mt-4">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="p-field">
        <div className="mt-2">
  <label htmlFor="patti">Win Patti</label>
  <br />
  <Controller
    name="patti"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
      <Dropdown
        id="patti" // Update id to match htmlFor attribute of label
        value={field.value}
        optionLabel="patti"
        placeholder="Select Patti"
        options={PATTIS.map(patti => ({ patti: patti, value: patti }))}
        focusInputRef={field.ref}
        onChange={(e) => field.onChange(e.value)}
        className="w-full mt-2"
      />
    )}
  />
</div>

<div className="mt-3">
            <label htmlFor="winNumber">Point</label>
            <br />
            <Controller
              name="winNumber"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <InputNumber
                  id="winNumber"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  showButtons
                  className="mt-3 w-full"
                />
              )}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="slot">Slot</label>
            <br />
            <Controller
  name="slot"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Dropdown
    id="slot"
      value={field.value}
      optionLabel="slot" // Adjust this according to the property name used in the options array
      placeholder="Select Slot"
      options={slots.map(slot => ({ slot: slot, value: slot }))}
      focusInputRef={field.ref}
      onChange={(e) => field.onChange(e.value)}
      className="w-full mt-2"
    />
  )}
/>
          </div>
        </div>
        <Button label="Result" type="submit" />
      </form>
    </div>
  );
};

export default Result;

