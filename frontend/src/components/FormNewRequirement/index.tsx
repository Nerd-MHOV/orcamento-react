import { Alert, AlertTitle, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import serialize from "form-serialize";
import InputMask from "react-input-mask";
import { ReactNode, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "../../hooks/api/api";
import Btn from "../Btn";
import { ErrorComponent } from "./ErrorComponent";
import "./style.scss";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useNavigate } from "react-router-dom";

export const FormNewRequirement = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const api = useApi();
  const [errForm, setErrForm] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    api
      .createRequirement(data.name, Number(data.price))
      .then((response) => {
        navigate("/requirements");
      })
      .catch((err) => {
        setErrForm("Erro do servidor");
        if (err?.response?.data?.message?.message)
          setErrForm(err.response.data.message.message);
      });
  };

  return (
    <div className="new-requirement">
      {!!errForm && <ErrorComponent msg={errForm} />}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <TextField
            required
            margin="dense"
            {...register("name")}
            label="Nome"
            type="text"
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            {...register("price")}
            label="Preço"
            type="text"
            variant="outlined"
          />
        </div>

        <div className="button">
          <Btn action="Cadastrar" color="darkBlue" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
