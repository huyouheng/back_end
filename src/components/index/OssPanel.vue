<template>
  <div class="panel">
    <div class="panel-heading">oss 一  <a href="javascript:" data-loading-text="loading..." class="pull-right"><i class="icon-retweet"></i></a></div>
    <div class="panel-body">
      <table class="table table-bordered table-responsive table-hover" width="100%">
        <thead>
        <tr>
          <th>bucket</th>
          <th>object</th>
          <th>file</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ title }}</td>
          <td>{{ title }}</td>
          <td>{{ title }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'oss_panel',
    props:{
      title:{
          type:String,
          required:true
      },

    },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table{
    padding:0px;
    margin:0px;
  }
  th{
    max-width:50px;
  }
</style>
