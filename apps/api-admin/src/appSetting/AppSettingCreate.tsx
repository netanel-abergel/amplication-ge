import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const AppSettingCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput
          label="AppSettingDescription"
          multiline
          source="AppSettingDescription"
        />
        <TextInput label="AppSettingName" source="AppSettingName" />
        <TextInput label="AppSettingValue" source="AppSettingValue" />
      </SimpleForm>
    </Create>
  );
};
