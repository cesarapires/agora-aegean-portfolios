import { UUIDHandler } from '@/infraestructure/gateways/crypto/uuid-handler'

export const makeUUIDHandler = (): UUIDHandler => {
  return new UUIDHandler()
}
