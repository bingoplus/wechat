<template>
  <div class="inner">
    <section class="holiday" v-show="status.holidayTag">
      <div class="holiday-title">{{vacation.name}}<span class="holiday-tip" v-show="status.tipTag">已登记</span></div>
      <section>
        <div class="holiday-sub-title">放假时间</div>
        <div class="holiday-sub-content">{{vacation.startTime}} 至 {{vacation.endTime}}</div>
      </section>
      <section>
        <div class="holiday-sub-title">注意事项</div>
        <div class="holiday-sub-content">
          {{vacation.message}}
      </div>
      </section>
      <div class="holiday-tip2" v-show="status.tipTag">
        您已登记，若需变动，请点击下方再次登记留校或离校
      </div>
      <sub>
        <mt-button type="primary" @click="registerStay" v-show="status.registerStayTag">登记留校</mt-button>
        <mt-button type="primary" @click="registerLeave">登记离校</mt-button>
      </sub>
    </section>
    <section v-show="status.leaveTag">
      <Leave></Leave>
    </section>
    <section v-show="status.stayTag">
      <Stay></Stay>
    </section>
    <section v-show="status.backTag">
      <Back></Back>
    </section>
  </div>
</template>

<script>
  import Leave from './leave'
  import Stay from './stay'
  import Back from './back'
  export default{
    name: 'Holiday',
    data () {
      return {
        status: {
          tipTag: false,
          holidayTag: false,
          leaveTag: false,
          stayTag: false,
          backTag: true,
          registerStayTag: false
        },
        vacation: {
          name: '清明节放假通知',
          startTime: '2017年4月2日',
          endTime: '2017年4月4日',
          message: '请同学们注意安全。'
        }
      }
    },
    components: {
      Leave,
      Stay,
      Back
    }
  }
</script>
