<template>
  <div class="inner">
    <div class="register" v-if=!stay>
      <section>
        <div v-show="threeTag" @click="stay=true;stayTag=true;">您最近提交的请假条未通过申请</div>
        <div class="register-title">请假是否需要离校</div>
        <div class="blue-content" @click="showPopup2 = true">
          <mt-cell
            title="是否离校"
            v-model="isLeave"
            is-link>
          </mt-cell>
        </div>
        <mt-popup
          v-model="showPopup2"
          modal=false
        position="bottom">
          <mt-picker :slots="slots2" :showToolbar="true" @change="onValuesChange2">
            <slot name="header" class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="showPopup2 = false">取消</span> <span @click="save2" class="mint-datetime-action mint-datetime-confirm">确定</span></slot>
          </mt-picker>
        </mt-popup>
      </section>
      <section>
        <div class="register-title">请假时间区间</div>
        <div class="register-content">
          <div class="blue-content" @click="openStartPicker">
            <mt-cell
              title="开始时间"
              v-model="startTime"
              is-link>
            </mt-cell>
          </div>
          <mt-datetime-picker
            ref="start"
            type="datetime"
            @confirm="startConfirm"
            v-model="startVisible">
          </mt-datetime-picker>
          <div class="blue-content" @click="openEndPicker">
            <mt-cell
              title="结束时间"
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
      <section v-show="isLeaveTag">
        <div class="register-title fl clearfix">离校目的地</div>
        <mt-radio
          v-model="leaveType"
          :options="['回家', '其他']">
        </mt-radio>
        <div class="register-content">
          <div class="blue-content" @click="setAddress()">
            <mt-cell
              title="省份"
              v-model="address.province.name"
              is-link>
            </mt-cell>
          </div>
          <div class="blue-content" @click="setAddress()">
            <mt-cell
              title="城市"
              v-model="address.city.name"
              is-link>
            </mt-cell>
          </div>
          <div class="blue-content" @click="setAddress()">
            <mt-cell
              title="区县"
              v-model="address.county.name"
              is-link>
            </mt-cell>
          </div>
          <div class="blue-content" @click="setAddress()">
            <mt-cell
              title="街道/乡镇"
              v-model="address.town.name"
              is-link>
            </mt-cell>
          </div>
          <div class="blue-content">
            <mt-field placeholder="请输入详细地址" type="textarea" v-model="street" rows="3"></mt-field>
          </div>
        </div>
        <mt-popup
          v-model="showAddress"
          modal=false
        position="bottom">
          <mt-picker :slots="slotsAddress" :showToolbar="true" @change="onAddressChange">
            <slot name="header" class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="showAddress = false">取消</span> <span @click="saveAddress()" class="mint-datetime-action mint-datetime-confirm">确定</span></slot>
          </mt-picker>
        </mt-popup>
      </section>
      <section v-show="isLeaveTag">
        <div class="register-title">离校交通工具</div>
        <div class="blue-content" @click="showTool()">
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
      <section>
        <div class="register-title">请假事由</div>
        <div class="register-content blue-content">
          <mt-field placeholder="请详细填写您请假申请原因，以便辅导员快速审核通过。" type="textarea" rows="3" v-model="leaveReason"></mt-field>
        </div>
      </section>
      <sub>
        <mt-button type="primary" @click="commitStay">提交假条</mt-button>
      </sub>
    </div>
    <div v-else-if=stayTag class="vacation">
      <ul>
        <li v-show="isLeaveTag">
          <div class="vacation-left"></div>
          <div class="vacation-right">
            <div>离校目的地</div>
            <div>{{vacation.address}}</div>
          </div>
        </li>
        <li v-show="isLeaveTag">
          <div class="vacation-left"></div>
          <div class="vacation-right">
            <div>离校交通工具</div>
            <div>{{vacation.vehicle}}</div>
          </div>
        </li>
        <li>
          <div class="vacation-left"></div>
          <div class="vacation-right">
            <div>请假时间区间</div>
            <div>{{vacation.startTime}}-{{vacation.endTime}}</div>
          </div>
        </li>
        <li>
          <div class="vacation-left"></div>
          <div class="vacation-right">
            <div>请假事由</div>
            <div class="vacation-exp">{{vacation.event}}</div>
          </div>
        </li>
        <li v-show="oneTag">
          <div class="vacation-left vacation-left2"></div>
          <div class="vacation-right vacation-right2">
            <div>待审核</div>
            <div></div>
          </div>
        </li>
        <li v-show="twoTag">
          <div class="vacation-left3"></div>
          <div class="vacation-right vacation-right3">
            <div>已通过审核</div>
            <div>{{passReason}}</div>
          </div>
        </li>
        <li v-show="threeTag">
          <div class="vacation-left4"></div>
          <div class="vacation-right vacation-right4">
            <div>未审核通过</div>
            <div class="vacation-exp">{{passReason}}</div>
          </div>
        </li>
      </ul>
      <sub v-show="oneTag">
        <mt-button type="primary" @click="cancel">撤销</mt-button>
      </sub>
      <sub v-show="twoTag">
        <mt-button type="primary" @click="destory">销假</mt-button>
      </sub>
      <sub v-show="threeTag">
        <mt-button type="primary" @click="stay=false;stayTag=false;">返回</mt-button>
      </sub>
    </div>
    <div class="stay" v-else-if=vacationTag2>
      <div v-show="oneTag" class="register-success">撤销成功!</div>
      <div v-show="twoTag" class="register-success">销假成功!</div>
      <sub>
        <mt-button type="primary" @click="back">返回</mt-button>
      </sub>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Vacation',
    data () {
      return {
        passReason: '',
        oneTag: false,
        twoTag: false,
        threeTag: false,
        stay: true,
        stayTag: true,
        temTool: {},
        temProvince: {},
        temCity: {},
        temCounty: {},
        temTown: {},
        tempProvince: '',
        tempCity: '',
        tempCounty: '',
        tempTown: '',
        loginTag: true,
        isLeaveTag: true,
        leaveTool: '请选择',
        isLeave: '请选择',
        tempTool: '请选择',
        tempLeave: '请选择',
        showPopup: false,
        showPopup2: false,
        leaveReason: '',
        startVisible: '',
        endVisible: '',
        street: '',
        startTime: '请选择',
        endTime: '请选择',
        vacationTag: false,
        vacationTag2: false,
        vacation: {
          id: '',
          startTime: '',
          endTime: '',
          event: '',
          vehicle: '',
          reason: '',
          address: ''
        },
        vacationRecord2: {

        },
        vacationRecord: {
          startTime: '请选择',
          endTime: '请选择',
          event: '',
          leaveSchool: 0,
          address: '',
          vehicleId: 0
        },
        address: {
          province: {name: '请选择'},
          city: {name: '请选择'},
          county: {name: '请选择'},
          town: {name: '请选择'}
        },
        showAddress: false,
        slots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }],
        slotsAddress: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }],
        slots2: [{
          flex: 1,
          values: [ '是', '否' ],
          className: 'slot1',
          textAlign: 'center'
        }]
      }
    }
  }
</script>
