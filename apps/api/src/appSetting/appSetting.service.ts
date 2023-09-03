import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AppSettingServiceBase } from "./base/appSetting.service.base";

@Injectable()
export class AppSettingService extends AppSettingServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
