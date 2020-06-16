import { Mat3 } from './mat3'

export type Vec3 = [number, number, number]

export function transformByMat3(vec: Vec3, mat: Mat3): Vec3 {
  const out: Vec3 = [0, 0, 0]

  const x = vec[0]
  const y = vec[1]
  const z = vec[2]

  out[0] = x * mat[0] + y * mat[3] + z * mat[6]
  out[1] = x * mat[1] + y * mat[4] + z * mat[7]
  out[2] = x * mat[2] + y * mat[5] + z * mat[8]

  return out
}
