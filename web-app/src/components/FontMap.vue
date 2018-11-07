<template>
    <div id="font-map-home">
        <div class="font-map-home-wrapper">
            <div id="fontMapOption" class="font-map-option">
                <el-card>
                    <el-form ref="optionForm" :model="optionForm" label-width="120px">
                        <el-form-item label="Map Option">
                            <el-select v-model="optionForm.condition" placeholder="Select">
                                <el-option
                                    v-for="(param, index) in conditionList"
                                    :key="index"
                                    :label="param"
                                    :value="param">
                                </el-option>
                            </el-select>
                            <el-button icon="el-icon-refresh" circle @click="refresh"></el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
            <div id="fontDetail" class="font-detail">

            </div>
            <div id="fontMap" class="font-map">
              <svg></svg>
            </div>
            <div id="toolTip" class="tool-tip">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>ee</span>
                </div>
              </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/css/FontMap.css';
import FontMapD3 from '../assets/js/FontMapD3';

export default {
  name: 'FontMap',
  data() {
    return {
      optionForm: {
        condition: 'combined',
      },
      conditionList: ['slant', 'weight', 'combined'],
    };
  },
  methods: {
    // reset map to initial setting
    refresh() {
      this.optionForm.condition = 'combined';
      FontMapD3.refresh();
    },
  },
  mounted() {
    FontMapD3.init();
  },
  watch: {
    optionForm: {
      handler(newOption) {
        FontMapD3.clear();
        console.log(newOption.condition); // eslint-disable-line no-console
        FontMapD3.fetchData(newOption.condition).then((datapoints) => {
          FontMapD3.drawMap(datapoints);
        }).catch((err) => {
          throw (err);
        });
      },
      deep: true,
    },
  },
};

</script>
