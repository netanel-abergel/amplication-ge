import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AppSettingService } from "./appSetting.service";
import { AppSettingControllerBase } from "./base/appSetting.controller.base";

@swagger.ApiTags("appSettings")
@common.Controller("appSettings")
export class AppSettingController extends AppSettingControllerBase {
  constructor(
    protected readonly service: AppSettingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
