import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PATTIS, SINGLE_PATTIS, THREEPATTIS } from "../helper/constants";
import { slots } from "../helper/constants";

import { useDeclareResult } from "../mutation/result.mutation";
import { InputNumber } from "primereact/inputnumber";
import Success from "./ui/success";
export type ResultFormData = {
  winSinglePatti: number;
  winThreePatti: number
  slot:any
};

export const Result = () => {

  const { register, handleSubmit, control } = useForm<ResultFormData>();
  // const resultMutation = useDeclareResult();

  const {mutate, isSuccess} = useDeclareResult();

  const submitForm: SubmitHandler<ResultFormData> = (data) => {
    console.log("result form data: ",(data))
    mutate(data);
  };

  return (
    <>{
      isSuccess ? <Success data={{ message: "Result Publish" }}/> :
      <div className="login-form mt-4">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="p-field">
        <div className="mt-2">
  <label htmlFor="winSinglePatti">Win Single Patti</label>
  <br />
  <Controller
    name="winSinglePatti"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
      <Dropdown
        id="winSinglePatti" // Update id to match htmlFor attribute of label
        value={field.value}
        optionLabel="winSinglePatti"
        placeholder="Select Single Patti"
        options={SINGLE_PATTIS.map(winSinglePatti => ({ winSinglePatti: winSinglePatti, value: winSinglePatti }))}
        focusInputRef={field.ref}
        onChange={(e) => field.onChange(e.value)}
        className="w-full mt-2"
      />
    )}
  />
</div>

<div className="mt-3">
            <label htmlFor="winThreePatti">Win Three Patti</label>
            <br />
            <Controller
    name="winThreePatti"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
      <Dropdown
        id="winThreePatti" // Update id to match htmlFor attribute of label
        value={field.value}
        optionLabel="winThreePatti"
        placeholder="Select Three Patti"
        options={THREEPATTIS.map(winThreePatti => ({ winThreePatti: winThreePatti, value: winThreePatti }))}
        focusInputRef={field.ref}
        onChange={(e) => field.onChange(e.value)}
        className="w-full mt-2"
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
    optionLabel="slot"
    placeholder="Select Slot"
    options={slots.map(slot => ({
      slot: slot, // Parse slot as a float
      value: parseFloat(slot), // Parse slot as a float
    }))}
    focusInputRef={field.ref}
    onChange={(e) => field.onChange(parseFloat(e.value))}
    className="w-full mt-2"
  />
  )}
/>
          </div>
        </div>
        <Button label="Submit" type="submit" />
      </form>
    </div>

    }
    </>
   
  );
};

export default Result;

