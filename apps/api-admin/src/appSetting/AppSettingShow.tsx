import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
} from "react-admin";

export const AppSettingShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField
          label="AppSettingDescription"
          source="AppSettingDescription"
        />
        <TextField label="AppSettingName" source="AppSettingName" />
        <TextField label="AppSettingValue" source="AppSettingValue" />
        <DateField source="CreatedAt" label="Created At" />
        <TextField label="ID" source="id" />
        <DateField source="UpdatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
