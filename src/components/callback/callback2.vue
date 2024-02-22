<template>
    <div class="main-page">
    </div>
</template>
  
<script>
export default {
    name: 'callback',
    data() {
        return {
        }
    },
    computed: {
    },
    mounted() {
        setTimeout(() => {
                    this.$router.push('/index')
                }, 50);
    },
    methods: {
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-page {
    height: 100%;
    width: 100%;
}
</style>
  