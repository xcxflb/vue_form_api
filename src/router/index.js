import Vue from 'vue';
import Router from 'vue-router';
import Preview from '@/views/preview/preview';
import Editor from '@/views/editor';
import EditorFormAside from '@/views/editor/form/aside';
import EditorFormMain from '@/views/editor/form/main';
import EditorTableAside from '@/views/editor/table/aside';
import EditorTableMain from '@/views/editor/table/main';
import ModelManage from '@/views/editor/manage/modelmanage';
import AppManage from '@/views/editor/manage/appmanage';
import UserManage from '@/views/editor/manage/usermanage';
import ImgManage from '@/views/editor/manage/imgmanage';
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/editor',
      redirect: '/editor/form',
      component: Editor,
      children: [
        {
          path: 'form',
          components: {
            aside: EditorFormAside,
            main: EditorFormMain,
          },
        },
        {
          path: 'table',
          components: {
            aside: EditorTableAside,
            main: EditorTableMain,
          },
        },
      ],
    },
    {
      path: '/preview',
      component: Preview,
    },
    {
      path: '/app',
      component: AppManage,
    },
    {
      path: '/model',
      component:ModelManage,
    },
    {
      path: '/user',
      component:UserManage,
    },
    {
      path: '/imgmanage',
      component:ImgManage,
    },
    {
      path: '*',
      redirect: '/editor',
    },
  ],
});
