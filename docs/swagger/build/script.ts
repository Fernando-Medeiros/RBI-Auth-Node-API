import "tsconfig-paths/register";

import type { SwaggerInterface, Swagger } from "./interface";
import * as fs from "fs";

import swaggerFile from "@root/swagger.json";

import information from "../config/info.json";

import authentication from "../config/authentication.json";
import exceptions from "../config/exceptions.json";

import authPaths from "../auth/paths.json";
import authReq from "../auth/requests.json";
import authRes from "../auth/responses.json";

import customerPaths from "../customer/paths.json";
import customerReq from "../customer/requests.json";
import customerRes from "../customer/responses.json";

import passwordPaths from "../password/paths.json";
import passwordReq from "../password/requests.json";

class BuildSwagger implements SwaggerInterface {
  public file = swaggerFile as Swagger;

  insertInfo(i: object[]): void {
    const infos = Object.assign({}, ...i);

    this.file.info = infos;
  }

  insertSecurity(s: object[]): void {
    const authentications = Object.assign({}, ...s);

    this.file.components.securitySchemes = authentications;
  }

  insertComponents(c: object[]): void {
    const components = Object.assign({}, ...c);

    this.file.components.schemas = components;
  }

  insertPaths(p: object[]): void {
    const paths = Object.assign({}, ...p);

    this.file.paths = paths;
  }

  save(): void {
    const toSave = JSON.stringify(this.file);

    fs.writeFileSync("./swagger.json", toSave);
  }
}

const build = new BuildSwagger();

build.insertInfo([information]);

build.insertSecurity([authentication]);

build.insertComponents([
  exceptions,
  authReq,
  customerReq,
  passwordReq,
  authRes,
  customerRes,
]);

build.insertPaths([authPaths, customerPaths, passwordPaths]);

build.save();
