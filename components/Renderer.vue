<template>
  <svg
    width="100%"
    height="100%"
    :viewBox="`0 0 ${computedWidth} ${computedHeight}`"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid meet"
  >
    <!-- BEGIN AXES -->
    <g
      v-if="gridData"
      :transform="`translate(${margin.left}, ${margin.top})`"
      fill="none"
      stroke="rgba(0, 0, 0, 0.87)"
      stroke-width="1"
    >
      <rect
        id="background"
        :x="0"
        :y="0"
        :width="width"
        :height="height"
        fill="white"
        stroke="none"
      />
      <g id="x-axis">
        <g v-for="num in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="`x-axis-${num}`">
          <line
            :x1="(num * width) / 10"
            y1="0"
            :x2="(num * width) / 10"
            y2="-10"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text
            :x="(num * width) / 10"
            :y="-14"
            fill="rgba(0, 0, 0, 0.87)"
            stroke="none"
            :font-size="fontSize"
            dominant-baseline="baseline"
            text-anchor="middle"
          >{{ ((num * width) / 10).toFixed(0) }}</text>
        </g>
      </g>
      <g id="y-axis">
        <g v-for="num in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="`y-axis-${num}`">
          <line
            x1="0"
            :y1="(num * height) / 10"
            x2="-10"
            :y2="(num * height) / 10"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text
            :x="-16"
            :y="(num * height) / 10"
            fill="rgba(0, 0, 0, 0.87)"
            stroke="none"
            :font-size="fontSize"
            dominant-baseline="middle"
            text-anchor="end"
          >{{ ((num * height) / 10).toFixed(0) }}</text>
        </g>
      </g>
    </g>
    <!-- END AXES -->
    <!-- BEGIN MAIN IMAGE -->
    <g v-if="gridData" :transform="`translate(${margin.left}, ${margin.top})`">
      <Group :attributes="gridData" />
    </g>
    <!-- END MAIN IMAGE -->
  </svg>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Group from './svg/Group.vue'
import { GridData } from '@/types/Renderer'

export default Vue.extend({
  components: {
    Group
  },
  props: {
    width: {
      type: Number,
      default: 0
    } as PropOptions<number>,
    height: {
      type: Number,
      default: 0
    } as PropOptions<number>,
    gridData: {
      type: Object,
      default: null
    } as PropOptions<GridData | null>
  },
  data: () => ({
    margin: {
      top: 80,
      bottom: 60,
      left: 60,
      right: 60
    }
  }),
  computed: {
    computedWidth(): number {
      return this.width + this.margin.left + this.margin.right
    },
    computedHeight(): number {
      return this.height + this.margin.top + this.margin.bottom
    },
    fontSize(): number {
      return Math.round(Math.max(this.width, this.height) / 42)
    }
  }
})
</script>

<style lang="scss" scoped>
svg {
  background-color: transparent;
}
</style>
