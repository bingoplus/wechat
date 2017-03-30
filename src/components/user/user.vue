<template>
	<div>
	  <div class="user-info">
	    <section class="info-item info-item-border">
	      <span>姓名</span>
	      <span>{{user.name}}</span>
	    </section>
	    <section class="info-item info-item-border">
	      <span>学号</span>
	      <span>{{user.sn}}</span>
	    </section>
	    <section class="info-item info-item-border">
	      <span>手机号</span>
	      <span>{{user.phone}}</span>
	    </section>
	    <section class="info-item">
	      <span>邮箱</span>
	      <span>{{user.email}}</span>
	    </section>
	  </div>
	  <!--<div class="user-history">
	    <section class="user-history-title">历史假条</section>
	  </div>
	  <div class="history-inner">
	    <section class="history-inner-part info-item-border" @click="turnTo('2016.11.01 09:00:00','2016.11.01 12:00:00','one')">
	      <div class="info-item-left">
	        <div class="history-inner-title">请假时间</div>
	        <div class="history-inner-time">2016.11.01 09:00:00</div>
	        <div class="history-inner-time">2016.11.01 12:00:00</div>
	      </div>
	      <div class="info-item-right">
	        <span class="arrow" style="color: #58b957">已通过审核</span>
	      </div>
	    </section>
	    <section class="history-inner-part info-item-border" @click="turnTo('2016.09.27 09:00:00','2016.09.30 24:00:00','two')">
	      <div class="info-item-left">
	        <div class="history-inner-title">请假时间</div>
	        <div class="history-inner-time">2016.09.27 09:00:00</div>
	        <div class="history-inner-time">2016.09.30 24:00:00</div>
	      </div>
	      <div class="info-item-right">
	        <span class="arrow" style="color: #ff6941">未通过审核</span>
	      </div>
	    </section>
	    <section class="history-inner-part" @click="turnTo('2016.05.06 09:00:00','2016.05.07 24:00:00','three')">
	      <div class="info-item-left">
	        <div class="history-inner-title">请假时间</div>
	        <div class="history-inner-time">2016.05.06 09:00:00</div>
	        <div class="history-inner-time">2016.05.07 24:00:00</div>
	      </div>
	      <div class="info-item-right">
	        <span class="arrow" style="color: #58b957">已销假</span>
	      </div>
	    </section>
	  </div>-->
	</div>
</template>

<script>
	export default{
	  name: 'User',
	  data () {
	    return {
	      user: {
	        name: '',
	        sn: '',
	        phone: '',
	        email: ''
	      }
	    }
	  },
	  methods: {
	    getUser () {
	      this.$http.get('/user/info')
          .then(
            res => {
              this.user.name = res.data.data.name
              this.user.sn = res.data.data.sn
              this.user.phone = res.data.data.phone
              this.user.email = res.data.data.email
            }
          )
	    }
	  },
  created: function () {
    this.getUser()
  }
	}
</script>
