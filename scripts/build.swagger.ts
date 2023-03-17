import "tsconfig-paths/register";
import { BuildSwagger } from "docs/swagger/build/build.impl";

import information from "docs/swagger/config/info.json";

import authentication from "docs/swagger/config/authentication.json";
import exceptions from "docs/swagger/config/exceptions.json";

import authPaths from "docs/swagger/auth/paths.json";
import authReq from "docs/swagger/auth/requests.json";
import authRes from "docs/swagger/auth/responses.json";

import customerPaths from "docs/swagger/customer/paths.json";
import customerReq from "docs/swagger/customer/requests.json";
import customerRes from "docs/swagger/customer/responses.json";

import passwordPaths from "docs/swagger/password/paths.json";
import passwordReq from "docs/swagger/password/requests.json";

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
