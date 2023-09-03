import { SortOrder } from "../../util/SortOrder";

export type AppSettingOrderByInput = {
  AppSettingDescription?: SortOrder;
  AppSettingName?: SortOrder;
  AppSettingValue?: SortOrder;
  CreatedAt?: SortOrder;
  id?: SortOrder;
  UpdatedAt?: SortOrder;
};
