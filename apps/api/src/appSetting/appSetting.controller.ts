import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { AppSettingService } from "./appSetting.service";
import { AppSettingControllerBase } from "./base/appSetting.controller.base";

@swagger.ApiTags("appSettings")
@common.Controller("appSettings")
export class AppSettingController extends AppSettingControllerBase {
  constructor(protected readonly service: AppSettingService) {
    super(service);
  }
}
