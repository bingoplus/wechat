<template>
	<div class="footer">
    	<ul class="nav-main">
      		<li><router-link to="/holiday">假期登记</router-link></li>
    	</ul>
    	<ul class="nav-main">
      		<li><router-link to="/vacation">请销假</router-link></li>
    	</ul>
    	<ul class="nav-main">
      		<li><router-link to="/user">我的</router-link></li>
    	</ul>
  	</div>
</template>

<script>
	export default{
	  name: 'Nav'
	}
</script>

