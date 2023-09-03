import { AppSettingWhereInput } from "./AppSettingWhereInput";
import { AppSettingOrderByInput } from "./AppSettingOrderByInput";

export type AppSettingFindManyArgs = {
  where?: AppSettingWhereInput;
  orderBy?: Array<AppSettingOrderByInput>;
  skip?: number;
  take?: number;
};
