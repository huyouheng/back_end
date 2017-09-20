<template>
  <div class="panel">
    <div class="panel-heading">{{ title }} <a href="#" data-loading-text="loading..." class="pull-right"><i class="icon-retweet"></i></a></div>
    <div class="panel-body">
      <table class="table table-bordered table-responsive table-hover" width="100%">
        <tbody>
        <tr>
          <th>uptime</th>
          <td>{{ refresh }}</td>
        </tr>
        <tr>
          <th>free -h</th>
          <td>1</td>
        </tr>
        <tr>
          <th>df -h</th>
          <td>1</td>
        </tr>
        <tr>
          <th>service</th>
          <td>1</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'server_panel',
    props:{
      title:{
          type:String,
          required:true
      },
      refresh:{
        type:Number,
        required:true
      }
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
