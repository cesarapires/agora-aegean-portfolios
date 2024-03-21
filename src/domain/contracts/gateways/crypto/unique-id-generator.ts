export interface UniqueIdGenerator {
  generate: () => Promise<UniqueIdGenerator.Result>
}

export namespace UniqueIdGenerator {
  export type Result = {
    uniqueId: string
  }
}
