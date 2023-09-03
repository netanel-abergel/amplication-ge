import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const AppSettingList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"AppSettings"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField
          label="AppSettingDescription"
          source="AppSettingDescription"
        />
        <TextField label="AppSettingName" source="AppSettingName" />
        <TextField label="AppSettingValue" source="AppSettingValue" />
        <DateField source="CreatedAt" label="Created At" />
        <TextField label="ID" source="id" />
        <DateField source="UpdatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
