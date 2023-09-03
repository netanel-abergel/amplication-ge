import { AppSetting as TAppSetting } from "../api/appSetting/AppSetting";

export const APPSETTING_TITLE_FIELD = "AppSettingName";

export const AppSettingTitle = (record: TAppSetting): string => {
  return record.AppSettingName || String(record.id);
};
