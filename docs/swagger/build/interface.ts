export interface SwaggerInterface {
  insertInfo(schemas: object[]): void;
  insertSecurity(schemas: object[]): void;
  insertComponents(schemas: object[]): void;
  insertPaths(schemas: object[]): void;
  save(): void;
}

export type Swagger = {
  info: InfoSchema;
  components: ComponentsSchema;
  paths: object;
};

type InfoSchema = {
  title: string;
  description: string;
  version: string;
  contact: { name: string; email: string };
};

type ComponentsSchema = {
  securitySchemes: object;
  schemas: object;
};
