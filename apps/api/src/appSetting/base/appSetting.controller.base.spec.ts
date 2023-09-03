import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { AppSettingController } from "../appSetting.controller";
import { AppSettingService } from "../appSetting.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  AppSettingDescription: "exampleAppSettingDescription",
  AppSettingName: "exampleAppSettingName",
  AppSettingValue: "exampleAppSettingValue",
  CreatedAt: new Date(),
  id: 42,
  UpdatedAt: new Date(),
};
const CREATE_RESULT = {
  AppSettingDescription: "exampleAppSettingDescription",
  AppSettingName: "exampleAppSettingName",
  AppSettingValue: "exampleAppSettingValue",
  CreatedAt: new Date(),
  id: 42,
  UpdatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    AppSettingDescription: "exampleAppSettingDescription",
    AppSettingName: "exampleAppSettingName",
    AppSettingValue: "exampleAppSettingValue",
    CreatedAt: new Date(),
    id: 42,
    UpdatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  AppSettingDescription: "exampleAppSettingDescription",
  AppSettingName: "exampleAppSettingName",
  AppSettingValue: "exampleAppSettingValue",
  CreatedAt: new Date(),
  id: 42,
  UpdatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("AppSetting", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AppSettingService,
          useValue: service,
        },
      ],
      controllers: [AppSettingController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /appSettings", async () => {
    await request(app.getHttpServer())
      .post("/appSettings")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        CreatedAt: CREATE_RESULT.CreatedAt.toISOString(),
        UpdatedAt: CREATE_RESULT.UpdatedAt.toISOString(),
      });
  });

  test("GET /appSettings", async () => {
    await request(app.getHttpServer())
      .get("/appSettings")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          CreatedAt: FIND_MANY_RESULT[0].CreatedAt.toISOString(),
          UpdatedAt: FIND_MANY_RESULT[0].UpdatedAt.toISOString(),
        },
      ]);
  });

  test("GET /appSettings/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/appSettings"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /appSettings/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/appSettings"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        CreatedAt: FIND_ONE_RESULT.CreatedAt.toISOString(),
        UpdatedAt: FIND_ONE_RESULT.UpdatedAt.toISOString(),
      });
  });

  test("POST /appSettings existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/appSettings")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        CreatedAt: CREATE_RESULT.CreatedAt.toISOString(),
        UpdatedAt: CREATE_RESULT.UpdatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/appSettings")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
