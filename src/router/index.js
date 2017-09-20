import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../view/layout/Layout.vue'
import Content from '../view/layout/Content.vue'
import OssServerIndex from '../view/oss/OssServerOne.vue'
import SqlPage from '../view/sql/SqlPage.vue'
import Crawler from '../view/crawler/CrawlerPage.vue'
import Login from '../view/login/Index'
import Article from '../view/articles/Article.vue'
import SendArticle from '../view/articles/SendArticle.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
        children:[
            {
                path:'/',
                component:Content
            },
            {
                path:'oss_index',
                component:OssServerIndex
            },
            {
                path:'sql_page',
                component:SqlPage
            },
            {
                path:'crawler_page',
                component:Crawler
            },
            {
                path:'article_page',
                component:Article
            },
            {
                path:'send_article',
                component:SendArticle
            },
        ]
    },
    {   
            path:'/login',
            component:Login
    },
  ]
})
