<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <section class="toolbar clearfix m-t-large m-b text-center">
                    <a href="#" class="btn btn-white btn-circle"><i class="icon-envelope-alt"></i>消息 <b class="badge bg-white">5</b></a>
                    <a href="#" class="btn btn-primary btn-circle active"><i class="icon-lightbulb"></i>bucket</a>
                    <a href="#" class="btn btn-success btn-circle"><i class="icon-check"></i>object</a>
                    <a href="#" class="btn btn-info btn-circle active"><i class="icon-time"></i>Timeline<b class="badge bg-info"><i class="icon-plus"></i></b></a>
                    <a href="#" class="btn btn-inverse btn-circle"><i class="icon-bar-chart"></i>Stats</a>
                    <a href="#" class="btn btn-warning btn-circle"><i class="icon-calendar-empty"></i>Calendar</a>
                    <a href="#" class="btn btn-danger btn-circle"><i class="icon-group"></i>Groups</a>
                    <a href="#" class="btn btn-circle"><i class="icon-plus"></i>More</a>
                </section>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <server-panel title="服务器一" :refresh="isRefresh"></server-panel>
            </div>
            <div class="col-lg-6">
                <server-panel-two title="服务器二" :refresh="isRefreshTwo"></server-panel-two>
            </div>
        </div>
        <!--end server-->

        <div class="row">
            <div class="col-md-12 col-lg-12">
                <oss-panel title="oss 一"></oss-panel>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 col-lg-12">
                <oss-panel-two title="oss 二"></oss-panel-two>
            </div>
        </div>

    </div>
</template>

<script>
import ServerPanel from '../../components/index/ServerPanel.vue'
import ServerPanelTwo from '../../components/index/ServerPanel.vue'
import OssPanel from '../../components/index/OssPanel.vue'
import OssPanelTwo from '../../components/index/OssPanel.vue'
export default {
    name: 'content',
    data(){
        return {
            isRefresh:2,
            isRefreshTwo:1,
        }
    },
    components:{
        ServerPanel,ServerPanelTwo,OssPanel,OssPanelTwo
    }
}
</script>

<style scoped>

</style>
