<template>
  <div class="register">
    <section>
      <div class="register-title">离校目的地</div>
      <div class="register-content">
        <Cell>回家：四川省成都市郫都区德源镇</Cell>
      </div>
    </section>
    <section>
      <div class="register-title">离校交通工具</div>
      <div class="register-content">
        <Cell>飞机</Cell>
      </div>
    </section>
    <section>
      <div class="register-title">离校时间</div>
      <div class="register-content">
        <Cell>2017年4月2日</Cell>
      </div>
    </section>
    <section>
      <div class="register-title">返校时间</div>
      <div class="register-content">
        <Cell>2017年4月4日</Cell>
      </div>
    </section>
    <section>
      <div class="register-title">离校原因</div>
      <div class="register-content">
      <Cell>家里有事情，需要回家一趟。请54744646461874648745888888564764768979746479879449879874649879449498848</Cell>
    </div>
    </section>
    <section>
      <div class="register-title">本人联系电话</div>
      <div class="register-content">
        <Cell>18623890351</Cell>
      </div>
    </section>
    <section>
      <div class="register-title">家庭联系电话</div>
      <div class="register-content">
        <Cell>028-8444544878</Cell>
      </div>
    </section>
    <section>
      <div class="register-title">返校登记</div>
      <div class="register-content register-check">
        <mt-checklist
          v-model="value"
          :options="['我已经回到学校']">
        </mt-checklist>
      </div>
    </section>
    <section>
      <div class="register-title">返回到校时间</div>
      <div class="register-content">
        <div class="blue-content" @click="openEndPicker">
          <mt-cell
            title="返校时间"
            v-model="endTime"
            is-link>
          </mt-cell>
        </div>
        <mt-datetime-picker
          ref="end"
          type="datetime"
          @confirm="endConfirm"
          v-model="endVisible">
        </mt-datetime-picker>
      </div>
    </section>
    <section>
      <div class="register-title">返校交通工具</div>
      <div class="register-content blue-content" @click="showTool()">
        <mt-cell
          title="交通工具"
          v-model="leaveTool"
          is-link>
        </mt-cell>
      </div>
      <mt-popup
        v-model="showPopup"
        modal=false
        position="bottom">
        <mt-picker :slots="slots" :showToolbar="true" @change="onValuesChange">
          <slot name="header" class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="showPopup = false">取消</span> <span @click="save()" class="mint-datetime-action mint-datetime-confirm">确定</span></slot>
        </mt-picker>
      </mt-popup>
    </section>
    <sub>
      <mt-button type="primary" @click="commitStay()">提交返校登记</mt-button>
    </sub>
  </div>
</template>
<script>
  import Cell from './../modules/cell'
  export default{
    name: 'Back',
    data () {
      return {
        slots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }],
        value: '',
        endTime: '请选择',
        leaveTool: '请选择',
        tempTool: ''
      }
    },
    methods: {
      save () {
        this.leaveTool = this.tempTool
        this.showPopup = false
        /* this.vacationRecord.vehicleId = this.temTool[this.slots[0].values.indexOf(this.tempTool)].id */
      },
      onValuesChange (picker) {
        this.tempTool = picker.getValues()[0]
      },
      openEndPicker () {
        this.$refs.end.open()
      },
      endConfirm (value) {
        this.endTime = value
      }
    },
    components: {
      Cell
    }
  }
</script>
