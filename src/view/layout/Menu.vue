<template>
 <div>
  <!-- header -->
  <header id="header" class="navbar">
    <ul class="nav navbar-nav navbar-avatar pull-right">
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <span class="hidden-sm-only">Mika Sokeil</span>
          <span class="thumb-small avatar inline"><img src="../../assets/images/avatar.jpg" alt="Mika Sokeil" class="img-circle"></span>
          <b class="caret hidden-sm-only"></b>
        </a>
        <ul class="dropdown-menu">
          <li><a href="#">Settings</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#"><span class="badge bg-danger pull-right">3</span>Notifications</a></li>
          <li class="divider"></li>
          <li><a href="docs.html">Help</a></li>
          <li><a href="signin.html">Logout</a></li>
        </ul>
      </li>
    </ul>
    <a class="navbar-brand" href="#">Fuck</a>
    <button type="button" class="btn btn-link pull-left nav-toggle hidden-lg" data-toggle="class:slide-nav slide-nav-left" data-target="body">
      <i class="icon-reorder icon-xlarge text-default"></i>
    </button>
    <ul class="nav navbar-nav hidden-sm">
      <li>
        <div class="m-t m-b-small" id="panel-notifications">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-comment-alt icon-xlarge text-default"></i><b class="badge badge-notes bg-danger count-n">2</b></a>
          <section class="dropdown-menu m-l-small m-t-mini">
            <section class="panel panel-large arrow arrow-top">
              <header class="panel-heading bg-white"><span class="h5"><strong>You have <span class="count-n">2</span> notifications</strong></span></header>
              <div class="list-group list-group-flush m-t-n">
                <a href="#" class="media list-group-item">
                  <span class="pull-left thumb-small"><img src="../../assets/images/avatar.jpg" alt="John said" class="img-circle"></span>
                  <span class="media-body block m-b-none">
                    Moved to Bootstrap 3.0<br>
                    <small class="text-muted">23 June 13</small>
                  </span>
                </a>
                <a href="#" class="media list-group-item">
                  <span class="media-body block m-b-none">
                    first v.1 (Bootstrap 2.3 based) released<br>
                    <small class="text-muted">19 June 13</small>
                  </span>
                </a>
              </div>
              <footer class="panel-footer text-small">
                <a href="#" class="pull-right"><i class="icon-cog"></i></a>
                <a href="#">See all the notifications</a>
              </footer>
            </section>
          </section>
        </div>
      </li>
      <li><div class="m-t-small">
        <router-link to="/send_article" style="line-height: 30px;" @click="changeEditArtId"><i class="icon-plus"></i> POST</router-link>
        </div></li>
      <li class="dropdown shift" data-toggle="shift:appendTo" data-target=".nav-primary .nav">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-cog icon-xlarge visible-sm visible-sm-inline"></i>Settings <b class="caret hidden-sm-only"></b></a>
        <ul class="dropdown-menu">
          <li>
            <a href="#" data-toggle="class:navbar-fixed" data-target='body'>Navbar
              <span class="text-active">auto</span>
              <span class="text">fixed</span>
            </a>
          </li>
          <li class="visible-lg">
            <a href="#" data-toggle="class:nav-vertical" data-target="#nav">Nav
              <span class="text-active">vertical</span>
              <span class="text">horizontal</span>
            </a>
          </li>
          <li class="divider hidden-sm"></li>
          <li class="dropdown-header">Colors</li>
          <li>
            <a href="#" data-toggle="class:bg bg-black" data-target='.navbar'>Navbar
              <span class="text-active">white</span>
              <span class="text">inverse</span>
            </a>
          </li>
          <li>
            <a href="#" data-toggle="class:bg-light" data-target='#nav'>Nav
              <span class="text-active">inverse</span>
              <span class="text">light</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <form class="navbar-form pull-left shift" action="" data-toggle="shift:appendTo" data-target=".nav-primary">
      <i class="icon-search text-muted"></i>
      <input type="text" class="input-small form-control" placeholder="Search">
    </form>
  </header>
  <!-- / header -->
  <!-- nav -->
  <nav id="nav" class="nav-primary visible-lg nav-vertical">
    <ul class="nav" data-spy="affix" data-offset-top="50" id="left_menu">
      <li class="active"><router-link to="/"><i class="icon-dashboard icon-xlarge"></i>控制面板</router-link></li>
      <li class="dropdown-submenu">
        <router-link to="oss_index"><i class="icon-th icon-xlarge"></i>OSS</router-link>
      </li>
      <li class="dropdown-submenu">
        <router-link to="crawler_page">
          <i class="icon-list icon-xlarge"></i>Crawler
        </router-link>
      </li>
      <li>
        <router-link to="article_page"><i class="icon-edit icon-xlarge"></i>文章管理</router-link>
      </li>
       
    </ul>
  </nav>
   <section id="content">
     <section class="main padder">
       <keep-alive>
         <router-view></router-view>
       </keep-alive>
     </section>
   </section>
   <!-- footer -->
   <footer id="footer">
     <div class="text-center padder clearfix">
       <p>
         <small>&copy; fuck 2017, fuck your mother：<a href="http://www.mycodes.net/" target="_blank">www.lovehyh.top</a></small><br><br>
         <a href="javascript:" class="btn btn-mini btn-circle btn-twitter"><i class="icon-twitter"></i></a>
         <a href="javascript:" class="btn btn-mini btn-circle btn-facebook"><i class="icon-facebook"></i></a>
         <a href="javascript:" class="btn btn-mini btn-circle btn-gplus"><i class="icon-google-plus"></i></a>
       </p>
     </div>
   </footer>
   <a href="#" class="hide slide-nav-block" data-toggle="class:slide-nav slide-nav-left" data-target="body"></a>
   <!-- / footer -->

 </div>
</template>

<script>
    export default {
        name: 'menu',
        data(){
          return {}
        },
        created(){

        },
        mounted(){
          $('#left_menu').children('li').click(function(){
              $(this).addClass('active');
              $('#left_menu').children('li').not($(this)).removeClass('active');
           });
        },
        methods:{
            changeEditArtId(){
                this.$store.state.article.editArtId=null
           },
        }
    }
</script>

