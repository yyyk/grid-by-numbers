import { ProductObject } from '@/lib/gbnscript/src/product'

export interface GridData {
  id: string
  tag: string
  children: ProductObject[]
}
