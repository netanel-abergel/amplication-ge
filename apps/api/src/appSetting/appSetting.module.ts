import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AppSettingModuleBase } from "./base/appSetting.module.base";
import { AppSettingService } from "./appSetting.service";
import { AppSettingController } from "./appSetting.controller";
import { AppSettingResolver } from "./appSetting.resolver";

@Module({
  imports: [AppSettingModuleBase, forwardRef(() => AuthModule)],
  controllers: [AppSettingController],
  providers: [AppSettingService, AppSettingResolver],
  exports: [AppSettingService],
})
export class AppSettingModule {}
