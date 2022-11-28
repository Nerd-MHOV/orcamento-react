import { Autocomplete, TextField } from "@mui/material";
import { handleForm } from "../../pages/Home/handleForm";
import { useState, useEffect } from "react";

export interface selectionRange {
    selectionRange: {
        startDate: Date;
        endDate: Date;
        key: string;
    }
}

export const FormOrc = ({selectionRange}: selectionRange) => {
  const [childValue, setChildValue] = useState<any[]>([]);
  const [petValue, setPetValue] = useState<any[]>([]);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);

  useEffect(() => {
    handleForm(childValue, petValue, selectionRange);
  }, [childValue, petValue, categoryValue]);

  return (
    <form id="form" className="form">
      <TextField
        label="Adulto"
        type="number"
        name="adult"
        className="textField"
        variant="standard"
        onChange={() => handleForm(childValue, petValue, selectionRange)}
      />
      <Autocomplete
        multiple
        componentName="child"
        onChange={(_, newValue) => {
          setChildValue(newValue);
        }}
        value={childValue}
        options={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]}
        isOptionEqualToValue={() => false}
        className="textField"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Criança"
            type="text"
            placeholder="idade"
            variant="standard"
            onChange={() => handleForm(childValue, petValue, selectionRange)}
          />
        )}
      />
      <Autocomplete
        multiple
        options={["pequeno", "médio", "grande"]}
        isOptionEqualToValue={() => false}
        className="textField"
        onChange={(_, newValue) => {
          setPetValue(newValue);
        }}
        value={petValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pet"
            name="pet"
            placeholder="porte"
            type="text"
            variant="standard"
          />
        )}
      />
      <Autocomplete
        options={[
          "padrão",
          "padrão varanda",
          "luxo",
          "luxo hidro ou conjugado",
        ]}
        className="textField"
        onChange={(_, newValue) => {
          setCategoryValue(newValue);
        }}
        value={categoryValue}
        renderInput={(params) => (
          <TextField
            {...params}
            name="category"
            label="Categoria"
            type="text"
            variant="standard"
          />
        )}
      />
      <TextField
        label="Nº Pipe"
        type="number"
        name="numberPipe"
        onChange={() => handleForm(childValue, petValue, selectionRange)}
        className="textField"
        variant="standard"
      />
    </form>
  );
};
