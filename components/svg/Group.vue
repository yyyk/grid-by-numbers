<template>
  <g :id="attributes.id" :transform="computedTag.transform">
    <template v-if="attributes.children && attributes.children.length > 0">
      <template v-for="child in attributes.children">
        <Group
          v-if="child.tag === 'group'"
          :key="child.id"
          :attributes="child"
        />
        <Rectangle
          v-else-if="child.tag === 'rectangle'"
          :key="child.id"
          :attributes="child"
        />
      </template>
    </template>
  </g>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { getGroup } from '../../lib/renderer/svg'
import { Vec2 } from '../../lib/maths/vec2'
import Rectangle from './Rectangle.vue'
import { GTagAttr } from '@/types/svg/Group'

export default Vue.extend({
  name: 'Group',
  components: {
    Rectangle
  },
  props: {
    attributes: {
      type: Object,
      required: true
    } as PropOptions<GTagAttr>
  },
  computed: {
    computedTag() {
      const attr = this.attributes
      const position: Vec2 = [attr.positionX || 0, attr.positionY || 0]
      const scale: Vec2 = [
        attr.scaleX == null ? 1 : attr.scaleX,
        attr.scaleY == null ? 1 : attr.scaleY
      ]
      return getGroup(position, attr.rotate || 0, scale)
    }
  }
})
</script>
