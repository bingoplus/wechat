<template>
  <div v-if="showTag" class="sub">
    <div class="title">{{vacation.name}}</div>
    <span class="registerTip2" v-if="vacationRecord">
      已登记
    </span>
    <section>
      <div class="sub-title">放假时间</div>
      <div class="sub-content">{{vacation.startTime | formatDate }}至{{vacation.endTime | formatDate }}</div>
    </section>
    <section>
      <div class="sub-title">注意事项</div>
      <div class="sub-content">
        {{vacation.message}}
      </div>
    </section>
    <div class="registerTip" v-if="vacationRecord">
      您已登记，若需变动，请点击下方再次登记留校或离校
    </div>
    <sub>
      <mt-button v-if="vacation.register" type="primary" @click="registerStay">登记留校</mt-button>
      <mt-button type="primary" @click="registerLeave">登记离校</mt-button>
    </sub>
  </div>
</template>

<script>
  export default{
    name: 'Holiday'
  }
</script>
