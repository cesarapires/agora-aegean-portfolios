import { type UniqueIdGenerator } from '@/domain/contracts/gateways/crypto/unique-id-generator'

import { v4 as uuidv4 } from 'uuid'

export class UUIDHandler implements UniqueIdGenerator {
  async generate (): Promise<UniqueIdGenerator.Result> {
    return {
      uniqueId: uuidv4()
    }
  }
}
