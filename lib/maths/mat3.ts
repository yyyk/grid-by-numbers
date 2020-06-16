import { Vec2 } from './vec2'

export type Mat3 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export function getIdentityMatrix(): Mat3 {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1]
}

export function translate(mat: Mat3, v: Vec2): Mat3 {
  const out: Mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  const mat00 = mat[0]
  const mat01 = mat[1]
  const mat02 = mat[2]
  const mat10 = mat[3]
  const mat11 = mat[4]
  const mat12 = mat[5]
  const mat20 = mat[6]
  const mat21 = mat[7]
  const mat22 = mat[8]

  const x = v[0]
  const y = v[1]

  out[0] = mat00
  out[1] = mat01
  out[2] = mat02

  out[3] = mat10
  out[4] = mat11
  out[5] = mat12

  out[6] = x * mat00 + y * mat10 + mat20
  out[7] = x * mat01 + y * mat11 + mat21
  out[8] = x * mat02 + y * mat12 + mat22

  return out
}

export function rotate(mat: Mat3, rad: number): Mat3 {
  const out: Mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  const mat00 = mat[0]
  const mat01 = mat[1]
  const mat02 = mat[2]
  const mat10 = mat[3]
  const mat11 = mat[4]
  const mat12 = mat[5]
  const mat20 = mat[6]
  const mat21 = mat[7]
  const mat22 = mat[8]

  const s = Math.sin(rad)
  const c = Math.cos(rad)

  out[0] = c * mat00 + s * mat10
  out[1] = c * mat01 + s * mat11
  out[2] = c * mat02 + s * mat12

  out[3] = c * mat10 - s * mat00
  out[4] = c * mat11 - s * mat01
  out[5] = c * mat12 - s * mat02

  out[6] = mat20
  out[7] = mat21
  out[8] = mat22

  return out
}

export function scale(mat: Mat3, vec: Vec2): Mat3 {
  const out: Mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  const x = vec[0]
  const y = vec[1]

  out[0] = x * mat[0]
  out[1] = x * mat[1]
  out[2] = x * mat[2]

  out[3] = y * mat[3]
  out[4] = y * mat[4]
  out[5] = y * mat[5]

  out[6] = mat[6]
  out[7] = mat[7]
  out[8] = mat[8]

  return out
}

export function multiply(matA: Mat3, matB: Mat3): Mat3 {
  const out: Mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  const matA00 = matA[0]
  const matA01 = matA[1]
  const matA02 = matA[2]
  const matA10 = matA[3]
  const matA11 = matA[4]
  const matA12 = matA[5]
  const matA20 = matA[6]
  const matA21 = matA[7]
  const matA22 = matA[8]

  const matB00 = matB[0]
  const matB01 = matB[1]
  const matB02 = matB[2]
  const matB10 = matB[3]
  const matB11 = matB[4]
  const matB12 = matB[5]
  const matB20 = matB[6]
  const matB21 = matB[7]
  const matB22 = matB[8]

  out[0] = matB00 * matA00 + matB01 * matA10 + matB02 * matA20
  out[1] = matB00 * matA01 + matB01 * matA11 + matB02 * matA21
  out[2] = matB00 * matA02 + matB01 * matA12 + matB02 * matA22

  out[3] = matB10 * matA00 + matB11 * matA10 + matB12 * matA20
  out[4] = matB10 * matA01 + matB11 * matA11 + matB12 * matA21
  out[5] = matB10 * matA02 + matB11 * matA12 + matB12 * matA22

  out[6] = matB20 * matA00 + matB21 * matA10 + matB22 * matA20
  out[7] = matB20 * matA01 + matB21 * matA11 + matB22 * matA21
  out[8] = matB20 * matA02 + matB21 * matA12 + matB22 * matA22

  return out
}
