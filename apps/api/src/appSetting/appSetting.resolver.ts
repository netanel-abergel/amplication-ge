import * as graphql from "@nestjs/graphql";
import { AppSettingResolverBase } from "./base/appSetting.resolver.base";
import { AppSetting } from "./base/AppSetting";
import { AppSettingService } from "./appSetting.service";

@graphql.Resolver(() => AppSetting)
export class AppSettingResolver extends AppSettingResolverBase {
  constructor(protected readonly service: AppSettingService) {
    super(service);
  }
}
