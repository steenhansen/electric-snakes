"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typed_immutable_record_1 = require("typed-immutable-record");
const project_constants_1 = require("../project-constants");
const { NON_EXISTANT_XY } = project_constants_1.default;
const defaultXy = {
    x: NON_EXISTANT_XY,
    y: NON_EXISTANT_XY
};
exports.XyFactory = typed_immutable_record_1.makeTypedFactory(defaultXy);
exports.XyNull = () => exports.XyFactory(defaultXy);
