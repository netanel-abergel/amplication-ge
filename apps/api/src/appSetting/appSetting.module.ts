import { Module } from "@nestjs/common";
import { AppSettingModuleBase } from "./base/appSetting.module.base";
import { AppSettingService } from "./appSetting.service";
import { AppSettingController } from "./appSetting.controller";
import { AppSettingResolver } from "./appSetting.resolver";

@Module({
  imports: [AppSettingModuleBase],
  controllers: [AppSettingController],
  providers: [AppSettingService, AppSettingResolver],
  exports: [AppSettingService],
})
export class AppSettingModule {}
