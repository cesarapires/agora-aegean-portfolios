export interface SaveWallet {
  save: (params: SaveWallet.Params) => Promise<SaveWallet.Result>
}

export interface GetWallet {
  get: (param: string) => Promise<WalletData | undefined>
}

export interface UpdateWallet {
  update: (params: WalletData) => Promise<WalletData>
}

export namespace SaveWallet {
  export type Params = {
    userId: string
    name: string
    balance: number
    creationDate: Date
  }
  export type Result = {
    id: string
  }
}

export type WalletData = {
  id: string
  userId: string
  name: string
  balance: number
  creationDate: Date
}
