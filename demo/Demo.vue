<template>
  <main>
    <chart id="logo" :options="logo" auto-resize></chart>
    <h1><a href="http://talap.org">OpenBudget by Talap</a></h1>
    <p class="desc"> OpenBudget - Смотрите не проглядите</p>

    <h2>Доходы по Республиканскому бюджету</h2>
    <figure><chart :options="line" ref="line" auto-resize></chart></figure>
    <h2>Расходы по Республиканскому бюджету</h2>
    <figure><chart :options="rashodi" ref="rashodi" auto-resize></chart></figure>
    <!-- <figure><chart :options="graph" ref="graph" auto-resize></chart></figure> -->

    <footer>
      <a href="//github.com/Justineo">@Justineo</a>|<a href="//github.com/Justineo/vue-echarts/blob/master/LICENSE">MIT License</a>|<a href="//github.com/Justineo/vue-echarts">View on GitHub</a>
    </footer>
  </main>
</template>

<style lang="stylus">
*,
*::before,
*::after
  box-sizing border-box

body
  margin 0
  padding 3em 0 0
  font-family "Source Sans Pro", "Helvetica Neue", Arial, sans-serif
  color #666
  text-align center

a
  color inherit
  text-decoration none

h1
  margin-bottom 1em
  font-family Dosis, "Source Sans Pro", "Helvetica Neue", Arial, sans-serif

h1,
h2
  color #2c3e50
  font-weight 300

h2
  margin-top 3em
  font-size 1.2em

.desc
  margin-bottom 4em
  color #7f8c8d

h2 small
  opacity .7

p small
  font-size .8em
  color #7f8c8d

p
  line-height 1.5

pre
  display inline-block
  padding .8em
  background-color #f9f9f9
  box-shadow 0 1px 2px rgba(0,0,0,.125)
  line-height 1.1
  color #2973b7

pre,
code
  font-family "Roboto Mono", Monaco, courier, monospace

pre code
  font-size .8em

.attr
  color #e96900

.val
  color #42b983

footer
  margin 5em 0 3em
  font-size .5em
  vertical-align middle

  a
    display inline-block
    margin 0 5px
    padding 3px 0 6px
    color #7f8c8d
    font-size 2em
    text-decoration none

  a:hover
    padding-bottom 3px
    border-bottom 3px solid #42b983

button
  border 1px solid #4fc08d
  border-radius 2em
  background-color #fff
  color #42b983
  cursor pointer
  font inherit
  transition opacity .3s

  &:focus
    outline none
    box-shadow 0 0 1px #4fc08d

  &:active
    background rgba(79, 192, 141, .2)

  &[disabled]
    opacity .5
    cursor not-allowed

button,
label
  font-size .75em

figure
  display inline-block
  margin 2em auto
  border 1px solid rgba(0, 0, 0, .1)
  border-radius 4px
  box-shadow 0 0 45px rgba(0, 0, 0, .2)
  padding 1em 1em

  .echarts
    width 60vw
    min-width 1200px
    height 500px

#logo
  display inline-block
  width 128px
  height 128px
  pointer-events none

@media (min-width 980px)
  figure.half
    padding 1em 1.5em

    .echarts
      width 28vw
      min-width 240px
      height 180px

    &:not(:last-child)
      margin-right 15px

@media (max-width 980px)
  p
    display flex
    justify-content center

    select
      text-indent calc(50% - 1em)

    select,
    label
      border 1px solid #4fc08d
      border-radius 2em
      background-color #fff
      color #42b983
      cursor pointer
      transition opacity .3s

    button,
    input,
    select,
    label
      flex 1 0
      margin 0 .5em
      padding 0
      line-height 2.4em
      max-width 40vw
      border-radius 2px
      font-size .8em

    select
      -webkit-appearance none

    input[type="checkbox"]
      display none

      &:checked + label
        background #42b983
        color #fff

  figure
    width 100vw
    margin 1em auto
    padding 0 1em
    border none
    border-radius 0
    box-shadow none

    .echarts
      width 100%
      min-width 0
      height 75vw
</style>

<script>
import ECharts from '../src/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/graph'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

import 'echarts-liquidfill'
import logo from './data/logo'
import line from './data/line'
import rashodi from './data/rashodi'

export default {
  components: {
    chart: ECharts
  },
  store(){

  },
  data () {
    return {
      logo,
      line,
      rashodi
    }
  },
  computed: {
    scoreRadar () {
      return this.$store.getters.scoreRadar
    },
    metrics () {
      return this.$store.state.scores.map(({name}) => name)
    },
    isMax () {
      let {value, max} = this.$store.state.scores[this.metricIndex]
      return value === max
    },
    isMin () {
      return this.$store.state.scores[this.metricIndex].value === 0
    }
  },
  methods: {

  },
  watch: {
    connected: {
      handler (value) {
        ECharts[value ? 'connect' : 'disconnect']('radiance')
      }
    }
  },
  mounted () {
    let dataIndex = -1
    let pie = this.$refs.pie
    let dataLen = pie.options.series[0].data.length
    setInterval(() => {
      pie.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex
      })
      dataIndex = (dataIndex + 1) % dataLen
      pie.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
      // 显示 tooltip
      pie.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      })
    }, 1000)
    this.connected = true
  }
}
</script>
