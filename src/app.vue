<template>
<div id="ap">
  <div id="cover"></div>
  <Header></Header>
  <Todo></Todo>
  <Footer></Footer>
  
  
</div>
  
</template>

<script>
    // 引入header.vue组件
    import Header from './todo/header.vue';
    import Footer from './todo/footer.jsx';
    import Todo from './todo/todo.vue'
   

    export default {
        // 声明组件，之后便可以使用组件标签
        components: {
            Header,
            Footer,
            Todo
            
          
        }
    }
</script>

<!-- 设置scoped 表示当前组件下的id只在当前组件起作用，不会跟其他组件引起冲突 -->

<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
    }

</style>

