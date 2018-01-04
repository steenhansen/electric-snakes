
//   https://stackoverflow.com/questions/38906359/create-a-global-variable-in-typescript
type IConfigTestingVars = undefined |  {
  TESTING_BOARD_COLOR: number
  TESTING_BOARD_INDEX: number
  TESTING_SECONDS_COUNT_DOWN: number
  TESTING_TIME_OUT_SECONDS: number
}

declare namespace NodeJS {
  interface Global {
    CONFIG_TESTING_VARS: IConfigTestingVars
  }
}

declare const CONFIG_TESTING_VARS: IConfigTestingVars
