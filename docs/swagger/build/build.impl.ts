import "tsconfig-paths/register";
import type { SwaggerInterface, Swagger } from "./interface";
import * as fs from "fs";

import swaggerFile from "swagger.json";

export class BuildSwagger implements SwaggerInterface {
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
