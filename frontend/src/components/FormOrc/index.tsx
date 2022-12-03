import { Autocomplete, TextField } from "@mui/material";
import { handleForm } from "../../pages/Home/handleForm";
import { useState, useEffect } from "react";

export interface FormProps {
  selectionRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  addRows: (rows: any[]) => void;
}

const optionsCategories = [
  { label: "padrão", input: 1 },
  { label: "padrão varanda", input: 2 },
  { label: "luxo", input: 3 },
  { label: "luxo conjugado", input: 4 },
  { label: "luxo com hidro", input: 5 },
];

export const FormOrc = ({ selectionRange, addRows }: FormProps) => {
  const [childValue, setChildValue] = useState<any[]>([]);
  const [petValue, setPetValue] = useState<any[]>([]);
  const [categoryValue, setCategoryValue] = useState<{
    label: string;
    input: number;
  } | null>(null);
  const [pensionValue, setPensionValue] = useState<string | null>(null);

  useEffect(() => {
    handleForm(childValue, petValue, selectionRange, addRows);
  }, [childValue, petValue, categoryValue, pensionValue]);

  return (
    <form id="form" className="form">
      <TextField
        label="Adulto"
        type="number"
        name="adult"
        className="textField"
        variant="standard"
        onChange={() =>
          handleForm(childValue, petValue, selectionRange, addRows)
        }
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
            onChange={() =>
              handleForm(childValue, petValue, selectionRange, addRows)
            }
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
        options={optionsCategories}
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
      <Autocomplete
        options={["simples", "meia", "completa"]}
        className="textField"
        onChange={(_, newValue) => {
          setPensionValue(newValue);
        }}
        value={pensionValue}
        renderInput={(params) => (
          <TextField
            {...params}
            name="pension"
            label="Pensão"
            type="text"
            variant="standard"
          />
        )}
      />
      <TextField
        label="Nº Pipe"
        type="number"
        name="numberPipe"
        onChange={() =>
          handleForm(childValue, petValue, selectionRange, addRows)
        }
        className="textField"
        variant="standard"
      />
    </form>
  );
};
