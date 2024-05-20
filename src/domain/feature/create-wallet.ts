export interface CreateWallet {
  handle: (params: CreateWallet.Params) => Promise<CreateWallet.Result>
}

export namespace CreateWallet {
  export type Params = {
    userId: string
    name: string
    balance: number
  }

  export type Result = string
}
