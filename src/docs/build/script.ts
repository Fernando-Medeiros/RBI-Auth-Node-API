import type { SwaggerInterface, Swagger } from "./interface";
import * as fs from "fs";

import swaggerJson from "../swagger.json";

import information from "../config/info.json";

import authentication from "../config/authentication.json";
import exceptions from "../config/exceptions.json";

import authRoutes from "../auth/paths.json";
import authRequests from "../auth/requests.json";
import authResponses from "../auth/responses.json";

import customerRoutes from "../customer/paths.json";
import customerRequests from "../customer/requests.json";
import customerResponses from "../customer/responses.json";

class BuildSwagger implements SwaggerInterface {
  public file = swaggerJson as Swagger;

  info(i: object[]): void {
    const infos = Object.assign({}, ...i);

    this.file.info = infos;
  }

  security(a: object[]): void {
    const authentications = Object.assign({}, ...a);

    this.file.components.securitySchemes = authentications;
  }

  components(c: object[]): void {
    const components = Object.assign({}, ...c);

    this.file.components.schemas = components;
  }

  paths(p: object[]): void {
    const paths = Object.assign({}, ...p);

    this.file.paths = paths;
  }

  save(): void {
    const toSave = JSON.stringify(this.file);

    fs.writeFileSync("./src/docs/swagger.json", toSave);
  }
}

const build = new BuildSwagger();

build.info([information]);

build.security([authentication]);

build.components([
  exceptions,
  authRequests,
  customerRequests,
  authResponses,
  customerResponses,
]);

build.paths([authRoutes, customerRoutes]);

build.save();
