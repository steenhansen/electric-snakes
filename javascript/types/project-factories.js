"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyNull = exports.XyFactory = void 0;
const typed_immutable_record_1 = require("typed-immutable-record");
const project_constants_1 = require("../project-constants");
const { NON_EXISTANT_XY } = project_constants_1.default;
const defaultXy = {
    x: NON_EXISTANT_XY,
    y: NON_EXISTANT_XY
};
exports.XyFactory = (0, typed_immutable_record_1.makeTypedFactory)(defaultXy);
const XyNull = () => (0, exports.XyFactory)(defaultXy);
exports.XyNull = XyNull;
