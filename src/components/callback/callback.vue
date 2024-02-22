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
        var url = window.location.href
        var dz_url = url.split('#')[1]
        var cs = dz_url.split('?')[1]
        if(cs)
        {
            var cs_arr = cs.split('&')
            var cs = {}
            for (let index = 0; index < cs_arr.length; index++) {
                cs[cs_arr[index].split('=')[0]] = cs_arr[index].split('=')[1]
            }
            let redirect = cs['redirect']
            if (redirect == 1) {
                setTimeout(() => {
                    this.$router.push('/index')
                }, 100);
            } else {
                window.parent.postMessage(
                    {
                        cmd: 'jump',
                        params: {
                            val: 1
                        }
                    }, '*'
                )
            }
        }else {
            window.parent.postMessage(
                    {
                        cmd: 'jump',
                        params: {
                            val: 1
                        }
                    }, '*'
                )
        }
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
  