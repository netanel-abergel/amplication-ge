import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const AppSettingEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          label="AppSettingDescription"
          multiline
          source="AppSettingDescription"
        />
        <TextInput label="AppSettingName" source="AppSettingName" />
        <TextInput label="AppSettingValue" source="AppSettingValue" />
      </SimpleForm>
    </Edit>
  );
};
