import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { IntFilter } from "../../util/IntFilter";

export type AppSettingWhereInput = {
  AppSettingDescription?: StringNullableFilter;
  AppSettingName?: StringFilter;
  AppSettingValue?: StringFilter;
  id?: IntFilter;
};
