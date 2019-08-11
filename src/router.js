import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "user",
      component: () =>
        import(/* webpackChunkName: "user" */ "@/layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "login" */ "@/views/User/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(
              /* webpackChunkName: "register" */ "@/views/User/Register.vue"
            )
        }
      ]
    },
    {
      path: "/",
      redirect: "/dashboard/analysis",
      component: () =>
        import(/* webpackChunkName:"layout" */ "@/layouts/BasicLayout.vue"),
      children: [
        // dashboard
        {
          path: "/dashboard",
          name: "dashboard",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "@/views/Dashbord/Analysis.vue"
                )
            }
          ]
        },
        // forms
        {
          path: "/forms",
          name: "forms",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/forms/basic-form",
              name: "basicform",
              component: () =>
                import(
                  /* webpackChunkName: "forms"*/ "@/views/Forms/BasicForm.vue"
                )
            },
            {
              path: "/forms/step-form",
              name: "stepform",
              redirect: "/forms/step-form/info",
              component: () =>
                import(
                  /* webpackChunkName : "forms"*/ "@/views/Forms/StepForm/index.vue"
                ),
              children: [
                {
                  path: "/forms/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "forms" */ "@/views/Forms/StepForm/Step1.vue"
                    )
                },
                {
                  path: "/froms/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /*webpackChunkName: "forms" */ "@/views/Forms/StepForm/Step2.vue"
                    )
                },
                {
                  path: "/forms/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName : "forms" */ "@/views/Forms/StepForm/Step3.vue"
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: () => import(/* webpackChunkName : "404" */ "@/views/404.vue")
    }
  ]
});
router.beforeEach((to, form, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
