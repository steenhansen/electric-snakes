
import {makeTypedFactory} from "typed-immutable-record"

import project_constants from "../project-constants"
const {NON_EXISTANT_XY} = project_constants

import {IXyPoint, IXyPointRecord} from "./immutable-interfaces"

const defaultXy = {
  x: NON_EXISTANT_XY,
  y: NON_EXISTANT_XY
}

export const XyFactory = makeTypedFactory<IXyPoint, IXyPointRecord>(defaultXy)

export const XyNull = () => XyFactory(defaultXy)
