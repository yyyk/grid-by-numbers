<template>
  <rect
    :id="attributes.id"
    :x="computedTag.x"
    :y="computedTag.y"
    :width="computedTag.width"
    :height="computedTag.height"
    :transform="computedTag.transform"
    fill="none"
    stroke="#000"
    stroke-width="1"
    vector-effect="non-scaling-stroke"
  />
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { getRect } from '../../lib/renderer/svg'
import { Vec2 } from '../../lib/maths/vec2'
import { RectTagAttr } from '@/types/svg/Rectangle'

export default Vue.extend({
  name: 'Rectangle',
  props: {
    attributes: {
      type: Object,
      required: true
    } as PropOptions<RectTagAttr>
  },
  computed: {
    computedTag() {
      const attr = this.attributes
      const size: Vec2 = [attr.width || 0, attr.height || 0]
      const position: Vec2 = [attr.positionX || 0, attr.positionY || 0]
      const scale: Vec2 = [
        attr.scaleX == null ? 1 : attr.scaleX,
        attr.scaleY == null ? 1 : attr.scaleY
      ]
      return getRect(size, position, attr.rotate || 0, scale)
    }
  }
})
</script>
