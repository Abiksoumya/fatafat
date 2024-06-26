import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./form.css"; // You can style your form in LoginForm.css
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { InputNumber } from "primereact/inputnumber";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useAllUser, useAllUsers } from "../../query/use-all-users";
import { useEffect, useState } from "react";
import { decodeToken } from "../../helper/jwt.halper";
import { useUserDetails } from "../../query/use-user-details";
import Success from "../ui/success";
import { useCreateUser } from "../../mutation/create-user";

export type CreateUserInputs = {
  name: string;
  role: string;
  margin: number;
  password: string;
  balance: number;
  createdBy: string;
};

export const CreateUserForm = () => {
  const [suggestions, setSuggestions] = useState<string[]>();
  const [selectedStokez, setSelectedStokez] = useState<any>(null);
  const [filteredStokez, setFilteredStokez] = useState<any>(null);

  console.log("selectedStokez", selectedStokez);

  const filterStokez = (event: any) => {
    const query = event.query;
    const filteredStokez = stokezData?.filter((stokez: any) => {
      return stokez?.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredStokez(filteredStokez);
  };

  const handleStokezSelection = (e: any) => {
    setSelectedStokez(e.value);
  };

  const message = "Create user";

  const [userId, setUserId] = useState<string>();
  const [userRole, setUserRole] = useState<string>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserInputs>();
  const { mutate, isSuccess } = useCreateUser();

  const { data: allUsers } = useAllUser();

  const stokezData = allUsers?.data?.filter((entry) => entry.role === "stokez");

  const userData = useUserDetails();

  useEffect(() => {
    const tokeData = decodeToken();
    setUserId(tokeData?.userId);
    setUserRole(tokeData?.role);
  }, []);

  const roles = [
    { name: "Stokez", value: "stokez" },
    { name: "Agent", value: "agent" },
  ];
  const role = [{ name: "Agent", value: "agent" }];

  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    // You can call other setter functions or perform other actions here
  };

  const submitForm: SubmitHandler<CreateUserInputs> = (data) => {
    const formData = {
      ...data, // Spread existing data from the form
      createdBy: selectedStokez.userId, // Add the createdBy variable with its value
    };
    mutate(formData); // Call the mutate function instead of directly calling createUserMutation.mutate
  };

  // const search = (e: AutoCompleteCompleteEvent) => {
  //   let suggs;
  //   if (!e.query.trim().length) {
  //     suggs = [
  //       ...allUsers?.data.map(({ userId }: { userId: string }) => {
  //         return userId;
  //       }),
  //     ];
  //   }else{
  //     suggs = allUsers?.data.filter((country) => {
  //       return country.name.toLowerCase().startsWith(event.query.toLowerCase());
  //     });
  //   }

  // };

  return (
    <>
      {isSuccess === true ? (
        <Success data={{ message: "User Create", url: "all-users" }} />
      ) : (
        <div className="login-form mt-4">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="p-field">
              <div>
                <label htmlFor="name">Name</label>
                <InputText
                  id="name"
                  className="mt-2"
                  {...register("name", { required: true })}
                />
              </div>
              {userRole === "admin" ? (
                <div className="mt-2">
                  <label htmlFor="role">Role</label>
                  <br />
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required." }}
                    render={({ field }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        optionLabel="name"
                        placeholder="Select a Role"
                        options={roles}
                        focusInputRef={field.ref}
                        onChange={(e) => {
                          field.onChange(e.value), handleChange(e);
                        }}
                        className="w-full mt-2"
                      />
                    )}
                  />
                </div>
              ) : (
                <div className="mt-2">
                  <label htmlFor="role">Role</label>
                  <br />
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required." }}
                    render={({ field }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        optionLabel="name"
                        placeholder="Select a Role"
                        options={role}
                        focusInputRef={field.ref}
                        onChange={(e) => {
                          field.onChange(e.value), handleChange(e);
                        }}
                        className="w-full mt-2"
                      />
                    )}
                  />
                </div>
              )}

              {value === "agent" ? (
                <div className="mt-3">
                  <label htmlFor="createdBy">Assign Stokez Id</label>
                  <AutoComplete
                    id="createdBy"
                    value={selectedStokez}
                    onChange={handleStokezSelection}
                    suggestions={filteredStokez}
                    completeMethod={filterStokez}
                    field="name"
                    dropdown
                    className="mt-2 w-full"
                  />
                </div>
              ) : null}

              <div className="mt-3">
                <label htmlFor="margin">Margin</label>
                <br />
                <Controller
                  name="margin"
                  control={control}
                  defaultValue={0}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputNumber
                      id="margin"
                      min={0}
                      max={100}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      showButtons
                      className="mt-2 w-full"
                    />
                  )}
                />
                {errors.margin && (
                  <span className="p-error">{errors.margin.message}</span>
                )}
              </div>
              <div className="p-field mt-4">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <InputText
                  className="mt-2"
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="balance">Balance</label>
                <br />
                <Controller
                  name="balance"
                  control={control}
                  defaultValue={0}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputNumber
                      id="balance"
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      showButtons
                      className="mt-3 w-full"
                    />
                  )}
                />
              </div>
            </div>
            <Button
              label="Create User"
              // onClick={() => {
              //   formRef.current?.submit();
              // }}
              type="submit"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default CreateUserForm;
