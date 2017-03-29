<template>
  <div class="register" v-if=leaveTag>
    <div class="register-success">登记成功!</div>
    <sub>
      <mt-button type="primary" @click="back">返回</mt-button>
    </sub>
  </div>
  <div class="register" v-else>
    <section>
      <div class="register-title fl clearfix">在校居住地址</div>
      <mt-radio
        v-model="stayType"
        :options="['宿舍', '其他']">
      </mt-radio>
      <div class="register-content">
        <transition-group name="fade">
          <div v-show="stayTypeTag" :key="1" class="blue-content" @click="setAddress">
              <mt-cell
                title="省份"
                v-model="address.province.name"
                is-link>
              </mt-cell>
            </div>
          <div v-show="stayTypeTag" :key="2" class="blue-content" @click="setAddress">
              <mt-cell
                title="城市"
                v-model="address.city.name"
                is-link>
              </mt-cell>
            </div>
          <div v-show="stayTypeTag" :key="3" class="blue-content" @click="setAddress">
              <mt-cell
                title="区县"
                v-model="address.county.name"
                is-link>
              </mt-cell>
            </div>
          <div v-show="stayTypeTag" :key="4" class="blue-content" @click="setAddress">
              <mt-cell
                title="街道/乡镇"
                v-model="address.town.name"
                is-link>
              </mt-cell>
            </div>
        </transition-group>
        <div class="blue-content">
          <mt-field placeholder="请输入详细地址或宿舍信息" type="textarea" v-model="vacationRecord.address" rows="3"></mt-field>
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
    <!--<section>
      <div class="register-title">离校交通工具</div>
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
    </section>-->
    <section>
      <div class="register-title">在校时间段</div>
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
    <section>
      <div class="register-title">留校原因</div>
      <div class="register-content blue-content">
        <mt-field placeholder="请输入留校原因" type="textarea" rows="3" v-model="vacationRecord.reason"></mt-field>
      </div>
    </section>
    <section>
      <div class="register-title">本人联系电话</div>
      <div class="register-content blue-content">
        <mt-field placeholder="请输入本人联系电话" type="tel" v-model="vacationRecord.phone"></mt-field>
      </div>
    </section>
    <section>
      <div class="register-title">家庭联系电话</div>
      <div class="register-content blue-content">
        <mt-field placeholder="请输入家庭联系电话" type="tel" v-model="vacationRecord.homePhone"></mt-field>
      </div>
    </section>
    <sub>
      <mt-button type="primary" @click="commitStay()">提交登记</mt-button>
    </sub>
  </div>
</template>

<script>
  export default{
    name: 'Stay',
    data () {
      return {
        stayType: '宿舍',
        stayTypeTag: false,
        temTool: {},
        temProvince: {},
        temCity: {},
        temCounty: {},
        temTown: {},
        /* leaveTool: '请选择',
        tempTool: '请选择', */
        tempProvince: '',
        tempCity: '',
        tempCounty: '',
        tempTown: '',
        /* showPopup: false, */
        leaveTag: false,
        stayReason: '',
        mobile: '',
        familyMobile: '',
        startVisible: '',
        endVisible: '',
        startTime: '请选择',
        endTime: '请选择',
        vacationRecordId: '',
        vacationRecord: {
          address: '',
          cityId: -1,
          countyId: -1,
          endTime: '请选择',
          homePhone: '',
          id: '',
          phone: '',
          provinceId: -1,
          reason: '',
          startTime: '请选择',
          townId: -1,
          type: 1,
          vacationId: 0,
          vehicleId: -1
        },
        address: {
          province: {name: '请选择'},
          city: {name: '请选择'},
          county: {name: '请选择'},
          town: {name: '请选择'}
        },
        showAddress: false,
        /* slots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }], */
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
        }]
      }
    },
    watch: {
      stayType: function () {
        if (this.stayType === '宿舍') {
          this.stayTypeTag = false
        } else {
          this.stayTypeTag = true
        }
      },
      startTime: function (val, oldVal) {
        if (this.startTime) {
          if (this.startTime <= this.endTime) {
            this.startTime = val
          } else {
            this.startTime = oldVal
          }
        } else {
          this.startTime = val
        }
      },
      endTime: function (val, oldVal) {
        if (this.startTime) {
          if (this.startTime <= this.endTime) {
            this.endTime = val
          } else {
            this.endTime = oldVal
          }
        } else {
          this.endTime = val
        }
      }
    },
    created: function () {
      this.getVacationRecord()
    },
    methods: {
      getVacationRecord: function () {
        this.$http.get('/wechat/vacation/lastVacation')
          .then(function (response) {
            if (response.body.status) {
              this.vacationRecord.vacationId = response.body.data.vacation.id
              console.log(response)
              if (response.body.data.vacationRecord) {
                this.vacationRecordId = response.body.data.vacationRecord
                this.vacationRecord.id = this.vacationRecordId
                this.$http.get('/vacationRecord/' + this.vacationRecordId)
                  .then(function (res) {
                    if (res.body.status) {
                      var temRes = res.body.data
                      if (temRes.type) {
                        this.vacationRecord.provinceId = temRes.province.id
                        this.address.province.name = temRes.province.name
                        this.vacationRecord.cityId = temRes.city.id
                        this.address.city.name = temRes.city.name
                        this.vacationRecord.countyId = temRes.county.id
                        this.address.county.name = temRes.county.name
                        this.vacationRecord.townId = temRes.town.id
                        this.address.town.name = temRes.town.name
                        this.vacationRecord.address = temRes.address
                        this.vacationRecord.vehicleId = temRes.vehicle.id
                        this.leaveTool = temRes.vehicle.name
                        this.vacationRecord.startTime = temRes.startTime
                        this.startTime = this.formatter(temRes.startTime)
                        this.vacationRecord.endTime = temRes.endTime
                        this.endTime = this.formatter(temRes.endTime)
                        this.vacationRecord.reason = temRes.reason
                        this.vacationRecord.phone = temRes.studentUser.phone
                        this.vacationRecord.homePhone = temRes.studentUser.homePhone
                      }
                    }
                  })
              }
            }
          })
      },
      setAddress () {
        this.$http.get('/location/provinces')
          .then(function (response) {
            if (response.body.status) {
              this.temProvince = response.body.data
              this.slotsAddress[0].values = this.temProvince.map(function (obj) {
                return obj.name
              })
              this.tempProvince = this.temProvince[0].name
              this.vacationRecord.provinceId = this.temProvince[0].id
              this.$http.get('/location/cities/' + this.vacationRecord.provinceId)
                .then(function (response) {
                  if (response.body.status) {
                    this.temCity = response.body.data
                    this.slotsAddress[1].values = this.temCity.map(function (obj) {
                      return obj.name
                    })
                    this.vacationRecord.cityId = this.temCity[0].id
                    this.tempCity = this.temCity[0].name
                    this.$http.get('/location/counties/' + this.vacationRecord.cityId)
                      .then(function (response) {
                        if (response.body.status) {
                          this.temCounty = response.body.data
                          this.slotsAddress[2].values = this.temCounty.map(function (obj) {
                            return obj.name
                          })
                          this.vacationRecord.countyId = this.temCounty[0].id
                          this.tempCounty = this.temCounty[0].name
                          this.$http.get('/location/towns/' + this.vacationRecord.countyId)
                            .then(function (response) {
                              if (response.body.status) {
                                this.temTown = response.body.data
                                this.slotsAddress[3].values = this.temTown.map(function (obj) {
                                  return obj.name
                                })
                                this.vacationRecord.townId = this.temTown[0].id
                                this.tempTown = this.temTown[0].name
                              }
                            })
                        }
                      })
                  }
                })
            }
          })
        this.showAddress = true
      },
      showTool () {
        this.$http.get('/vehicle/list')
          .then(function (response) {
            if (response.body.status) {
              this.temTool = response.body.data
              this.slots[0].values = this.temTool.map(function (obj) {
                return obj.name
              })
              this.showPopup = true
            } else {
              window.location.href = 'http://192.168.2.219:8080'
            }
          })
          .catch(function (response) {
            /* window.location.href = 'http://192.168.2.219:8080' */
          })
      },
      onValuesChange (picker) {
        this.tempTool = picker.getValues()[0]
      },
      save () {
        this.leaveTool = this.tempTool
        this.showPopup = false
        this.vacationRecord.vehicleId = this.temTool[this.slots[0].values.indexOf(this.tempTool)].id
      },
      onAddressChange (picker) {
        if (this.tempProvince !== picker.getValues()[0] && this.tempCity === picker.getValues()[1] && this.tempCounty === picker.getValues()[2] && this.tempTown === picker.getValues()[3]) {
          this.tempProvince = picker.getValues()[0]
          this.vacationRecord.provinceId = this.temProvince[this.slotsAddress[0].values.indexOf(this.tempProvince)].id
          this.$http.get('/location/cities/' + this.vacationRecord.provinceId)
            .then(function (response) {
              if (response.body.status) {
                this.temCity = response.body.data
                this.slotsAddress[1].values = this.temCity.map(function (obj) {
                  return obj.name
                })
                this.vacationRecord.cityId = this.temCity[0].id
                this.tempCity = this.temCity[0].name
                this.$http.get('/location/counties/' + this.vacationRecord.cityId)
                  .then(function (response) {
                    if (response.body.status) {
                      this.temCounty = response.body.data
                      this.slotsAddress[2].values = this.temCounty.map(function (obj) {
                        return obj.name
                      })
                      this.vacationRecord.countyId = this.temCounty[0].id
                      this.tempCounty = this.temCounty[0].name
                      this.$http.get('/location/towns/' + this.vacationRecord.countyId)
                        .then(function (response) {
                          if (response.body.status) {
                            this.temTown = response.body.data
                            this.slotsAddress[3].values = this.temTown.map(function (obj) {
                              return obj.name
                            })
                            this.vacationRecord.townId = this.temTown[0].id
                            this.tempTown = this.temTown[0].name
                          }
                        })
                    }
                  })
              }
            })
        } else if (this.tempProvince === picker.getValues()[0] && this.tempCity !== picker.getValues()[1] && this.tempCounty === picker.getValues()[2] && this.tempTown === picker.getValues()[3]) {
          this.tempCity = picker.getValues()[1]
          this.vacationRecord.cityId = this.temCity[this.slotsAddress[1].values.indexOf(this.tempCity)].id
          this.$http.get('/location/counties/' + this.vacationRecord.cityId)
            .then(function (response) {
              if (response.body.status) {
                this.temCounty = response.body.data
                this.slotsAddress[2].values = this.temCounty.map(function (obj) {
                  return obj.name
                })
                this.vacationRecord.countyId = this.temCounty[0].id
                this.tempCounty = this.temCounty[0].name
                this.$http.get('/location/towns/' + this.vacationRecord.countyId)
                  .then(function (response) {
                    if (response.body.status) {
                      this.temTown = response.body.data
                      this.slotsAddress[3].values = this.temTown.map(function (obj) {
                        return obj.name
                      })
                      this.vacationRecord.townId = this.temTown[0].id
                      this.tempTown = this.temTown[0].name
                    }
                  })
              }
            })
        } else if (this.tempProvince === picker.getValues()[0] && this.tempCity === picker.getValues()[1] && this.tempCounty !== picker.getValues()[2] && this.tempTown === picker.getValues()[3]) {
          this.tempCounty = picker.getValues()[2]
          this.vacationRecord.countyId = this.temCounty[this.slotsAddress[2].values.indexOf(this.tempCounty)].id
          this.$http.get('/location/towns/' + this.vacationRecord.countyId)
            .then(function (response) {
              if (response.body.status) {
                this.temTown = response.body.data
                this.slotsAddress[3].values = this.temTown.map(function (obj) {
                  return obj.name
                })
                this.vacationRecord.townId = this.temTown[0].id
                this.tempTown = this.temTown[0].name
              }
            })
        } else if (this.tempProvince === picker.getValues()[0] && this.tempCity === picker.getValues()[1] && this.tempCounty === picker.getValues()[2] && this.tempTown !== picker.getValues()[3]) {
          this.tempTown = picker.getValues()[3]
          this.vacationRecord.townId = this.temTown[this.slotsAddress[3].values.indexOf(this.tempTown)].id
        }
      },
      saveAddress () {
        this.address.province.name = this.tempProvince
        this.address.city.name = this.tempCity
        this.address.county.name = this.tempCounty
        this.address.town.name = this.tempTown
        this.showAddress = false
      },
      formatter (value) {
        let year = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        let date = new Date(value).getDate()
        let hour = new Date(value).getHours()
        if (hour.toString().length === 1) {
          hour = '0' + hour
        }
        let minute = new Date(value).getMinutes()
        if (minute.toString().length === 1) {
          minute = '0' + minute
        }
        let second = '00'
        return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second
      },
      commitStay () {
        if (this.address.province.name !== '请选择' && this.startTime !== '请选择' && this.endTime !== '请选择' && this.vacationRecord.vehicleId && this.vacationRecord.phone && this.vacationRecord.homePhone && this.vacationRecord.reason) {
          this.$store.state.user.stay = true
          console.log(this.vacationRecord)
          this.$http.post('/wechat/vacation/addVacationRecord', this.vacationRecord)
            .then(function (response) {
              if (response.body.status) {
                this.leaveTag = true
              }
            })
        }
      },
      openStartPicker () {
        this.$refs.start.open()
      },
      openEndPicker () {
        this.$refs.end.open()
      },
      startConfirm (value) {
        this.vacationRecord.startTime = value
        this.startTime = this.formatter(value)
      },
      endConfirm (value) {
        this.vacationRecord.endTime = value
        this.endTime = this.formatter(value)
      },
      back () {
        this.$router.replace({ path: '/register' })
      }
    }
  }
</script>

