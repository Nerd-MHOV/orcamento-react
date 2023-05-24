import { Alert, AlertTitle, TextField } from "@mui/material";
import { Stack } from "@mui/system";

export const ErrorComponent = ({ msg }: { msg: string }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        <strong>{msg}</strong> - tente novamente!
      </Alert>
    </Stack>
  );
};
