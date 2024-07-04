export interface SaveWallet {
  save: (params: SaveWallet.Params) => Promise<SaveWallet.Result>
}

export interface GetWallet {
  get: (param: string) => Promise<Wallet | undefined>
}

export interface UpdateWallet {
  update: (params: Wallet) => Promise<Wallet | undefined>
}

export namespace SaveWallet {
  export type Params = Omit<Wallet, 'id'>
  export type Result = {
    id: string
  }
}

export type Wallet = {
  id: string
  userId: string
  name: string
  balance: number
  creationDate: Date
}
