<template>
  <svg
    class="renderer"
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
        <g v-for="num in xTicks" :key="`x-axis-${num}`">
          <line
            :x1="num"
            y1="0"
            :x2="num"
            y2="-10"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text
            :x="num"
            :y="-14"
            fill="rgba(0, 0, 0, 0.87)"
            stroke="none"
            :font-size="fontSize"
            dominant-baseline="baseline"
            text-anchor="middle"
          >{{ num.toFixed(0) }}</text>
        </g>
      </g>
      <g id="y-axis">
        <g v-for="num in yTicks" :key="`y-axis-${num}`">
          <line
            x1="0"
            :y1="num"
            x2="-10"
            :y2="num"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text
            :x="-16"
            :y="num"
            fill="rgba(0, 0, 0, 0.87)"
            stroke="none"
            :font-size="fontSize"
            dominant-baseline="middle"
            text-anchor="end"
          >{{ num.toFixed(0) }}</text>
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
      return Math.max(Math.round(Math.max(this.width, this.height) / 42), 12)
    },
    xTicks(): number[] {
      let unit = 5000
      if (this.width <= 500) {
        unit = 50
      } else if (this.width <= 1000) {
        unit = 100
      } else if (this.width <= 5000) {
        unit = 500
      } else if (this.width <= 10000) {
        unit = 1000
      }
      const len = Math.floor(this.width / unit) + 1
      const ticks = Array.from({ length: len }, (_, i) => i * unit)
      return ticks
    },
    yTicks(): number[] {
      let unit = 5000
      if (this.height <= 500) {
        unit = 50
      } else if (this.height <= 1000) {
        unit = 100
      } else if (this.height <= 5000) {
        unit = 500
      } else if (this.height <= 10000) {
        unit = 1000
      }
      const len = Math.floor(this.height / unit) + 1
      const ticks = Array.from({ length: len }, (_, i) => i * unit)
      return ticks
    }
  }
})
</script>

<style lang="scss" scoped>
svg.renderer {
  background-color: transparent;
}

.v-application.theme--dark svg.renderer {
  line {
    stroke: #eee !important;
  }

  text {
    fill: #eee !important;
  }

  #background {
    fill: #2f2f2f;
  }
}
</style>
