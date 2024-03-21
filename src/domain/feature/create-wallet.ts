export interface CreateWallet {
  handle: (params: CreateWallet.Params) => Promise<CreateWallet.Result>
}

export namespace CreateWallet {
  export type Params = {
    id?: string
    userId: string
    name: string
    balance: number
    creationDate: Date
  }

  export type Result = string
}
