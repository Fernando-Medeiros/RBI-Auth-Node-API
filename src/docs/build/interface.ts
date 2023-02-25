export interface SwaggerInterface {
  file: Swagger;
  info(schemas: object[]): void;
  security(schemas: object[]): void;
  components(schemas: object[]): void;
  paths(schemas: object[]): void;
  save(): void;
}

export type Swagger = {
  info: object;
  components: Components;
  paths: object;
};

type Components = {
  securitySchemes: object;
  schemas: object;
};
