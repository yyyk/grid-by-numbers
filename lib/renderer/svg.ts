import { degToRad } from '../maths/helpers/degToRad'
import {
  getIdentityMatrix,
  rotate as mat3Rotate,
  scale as mat3Scale,
  translate as mat3Translate,
  Mat3
} from '../maths/mat3'
import { transformByMat3, Vec3 } from '../maths/vec3'
import { Vec2 } from './../maths/vec2'

export function getTransformMatrix(
  size: Vec2,
  position: Vec2,
  rotateRadian: number,
  scale: Vec2
): Mat3 {
  let matrix: Mat3 = getIdentityMatrix()
  const x: number = position[0] + size[0] / 2
  const y: number = position[1] + size[1] / 2
  // position
  matrix = mat3Translate(matrix, [x, y])
  // translate
  // matrix = mat3Translate(matrix, translate)
  // rotate
  matrix = mat3Rotate(matrix, rotateRadian)
  // scale
  matrix = mat3Scale(matrix, scale)
  return matrix
}

export function getTransformMatrixString(
  size: Vec2,
  position: Vec2,
  rotateRadian: number,
  scale: Vec2
): string {
  let matrix: Mat3 = getIdentityMatrix()
  const x: number = position[0] + size[0] / 2
  const y: number = position[1] + size[1] / 2
  // position
  matrix = mat3Translate(matrix, [x, y])
  // translate
  // matrix = mat3Translate(matrix, translate)
  // rotate
  matrix = mat3Rotate(matrix, rotateRadian)
  // scale
  matrix = mat3Scale(matrix, scale)
  // matrix(1,0,0,1,tx,ty)
  return `matrix(${matrix
    .filter((_, i: number) => i !== 2 && i !== 5 && i !== 8)
    .join(', ')})`
}

export interface Group {
  transform: string
}

export function getGroup(
  position: Vec2 = [0, 0],
  rotateDegree = 0,
  scale: Vec2 = [1, 1]
): Group {
  const rotateRadian: number = degToRad(rotateDegree)
  const matrix: string = getTransformMatrixString(
    [0, 0],
    position,
    rotateRadian,
    scale
  )
  return {
    transform: matrix
  }
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
  transform: string
}

export function getRect(
  size: Vec2,
  position: Vec2,
  rotateDegree = 0,
  scale: Vec2 = [1, 1]
): Rect {
  const halfWidth: number = size[0] / 2
  const halfHeight: number = size[1] / 2
  const rotateRadian: number = degToRad(rotateDegree)
  const matrix: string = getTransformMatrixString(
    size,
    position,
    rotateRadian,
    scale
  )
  return {
    x: -halfWidth,
    y: -halfHeight,
    width: size[0],
    height: size[1],
    transform: matrix
  }
}

export interface Path {
  d: string
}

export function getRectPath(
  size: Vec2,
  position: Vec2,
  rotateDegree = 0,
  scale: Vec2 = [1, 1]
): Path {
  const halfWidth: number = size[0] / 2
  const halfHeight: number = size[1] / 2
  let positions: Vec3[] = [
    [-halfWidth, -halfHeight, 1],
    [halfWidth, -halfHeight, 1],
    [halfWidth, halfHeight, 1],
    [-halfWidth, halfHeight, 1]
  ]
  const rotateRadian: number = degToRad(rotateDegree)
  const matrix: Mat3 = getTransformMatrix(size, position, rotateRadian, scale)
  positions = positions.map((pos) => transformByMat3(pos, matrix))
  const path = `M${positions[0][0].toFixed(2)} ${positions[0][1].toFixed(
    2
  )} L${positions[1][0].toFixed(2)} ${positions[1][1].toFixed(
    2
  )} L${positions[2][0].toFixed(2)} ${positions[2][1].toFixed(
    2
  )} L${positions[3][0].toFixed(2)} ${positions[3][1].toFixed(2)} Z`
  return {
    d: path
  }
}
