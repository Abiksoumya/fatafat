import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { useAllUsers } from "../../query/use-all-users";
import { useEffect, useState } from "react";
import { decodeToken } from "../../helper/jwt.halper";
import { useUserDetails } from "../../query/use-user-details";
import Success from "../ui/success";
import { useUpdateUser } from "../../mutation/create-user";
import { useParams } from "react-router-dom";


export type UpdateUserInputs = {
  name: string;
  role: string;
  margin: number;
  password: string;
  balance: number;
  createdBy: string;
};

export const UpdateUserForm = () => {
    const { id } = useParams();

    console.log("user id: " + id);

  const [userId, setUserId] = useState<string>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserInputs>();
  const { mutate, isSuccess } = useUpdateUser(id);
  const { data: allUsers } = useAllUsers();
  const filteredUser = allUsers?.data?.find(user => user.userId === id);

  console.log("user filtered: " + filteredUser.userId)



  useEffect(() => {
    const tokenData = decodeToken();
    setUserId(tokenData.userId);
  }, []);

  const roles = [
    { name: "Stokez", value: "stokez" },
    { name: "Agent", value: "agent" },
  ];

  const submitForm: SubmitHandler<UpdateUserInputs> = (data) => {
    mutate(data);
  };

  return (
    <>
      {isSuccess === true ? (
        <Success data={{ message: "User Updated" }} />
      ) : (
        <div className="login-form mt-4">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="p-field">
              <div>
                <label htmlFor="name">Name</label>
                <InputText
                  id="name"
                  className="mt-2"
                  defaultValue={filteredUser?.name}
                  {...register("name", { required: true })}
                />
              </div>
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
                      onChange={(e) => field.onChange(e.value)}
                      className="w-full mt-2"
                    />
                  )}
                />
              </div>

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
            <Button label="Update User" type="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateUserForm;
