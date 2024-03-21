export interface SaveWallet {
  save: (params: SaveWallet.Params) => Promise<SaveWallet.Result>
}

export namespace SaveWallet {
  export type Params = {
    id: string
    userId: string
    name: string
    balance: number
    creationDate: Date
  }
  export type Result = {
    id: string
  }
}
