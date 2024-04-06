import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./form.css"; // You can style your form in LoginForm.css
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { InputNumber } from "primereact/inputnumber";
import { useTransferPoint } from "../../mutation/transfer-point";
import { useEffect, useState } from "react";
import { useAllUsers } from "../../query/use-all-users";
import Success from "../ui/success";
export type TransferPointFormData = {
  type: String;
  userId: string;
  point: number;
};

export const TransferPointForm = () => {

  const { register, handleSubmit, control } = useForm<TransferPointFormData>();
  // const transferMutation = useTransferPoint();
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const {mutate,isSuccess} = useTransferPoint();

  console.log("select value",selectedUserId)

  const types = [
    { name: "Credit", value: "credit" },
    { name: "Debit", value: "debit" },
  ];

  const submitForm: SubmitHandler<TransferPointFormData> = (data) => {
    // console.log("transferMutation data: " + data.point)
    const formData = { ...data, userId: selectedUserId };

    mutate(formData);
  };

  const allUsers = useAllUsers()


  useEffect(() => {
    setUserData(allUsers?.data?.data)
  },[allUsers])

  return (
    <>
    {
      isSuccess === true ? <Success data={{ message: "Transfer" }} /> 
      :
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
        Target User
      </label>
      <Dropdown
  className="mt-2 w-full"
  id="userId"
  value={selectedUserId}
  options={userData?.map(user => ({ label: user?.name, value: user?.userId }))}
  onChange={(e) => {
    console.log('Selected user ID:', e.value); // Check the selected value
    setSelectedUserId(e.value); // Ensure that setSelectedUserId is updating the state correctly
  }}
  placeholder="Select a user"
/>
          </div>

          <div className="mt-3">
            <label htmlFor="point">Amount</label>
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
        <Button label="Submit" type="submit" />
      </form>
    </div>
    }
    </>
   
  );
};

export default TransferPointForm;
