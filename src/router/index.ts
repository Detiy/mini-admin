import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import("@/views/Dashboard/index.vue"),
    meta: {
      hidden: true
    },
    children: [
        {
            path: 'home',
            name: 'home',
            component: () => import('@/views/Dashboard/Home/index.vue')
        },
        {
            path: 'goodsList',
            name: 'goodsList',
            component: () => import('@/views/Dashboard/Goods/GoodsList/index.vue')
        },
        {
            path: 'goods/add',
            name: 'goodsAdd',
            component: () => import('@/views/Dashboard/Goods/GoodsAdd/index.vue')
        },
        {
            path: 'category',
            name: 'category',
            component: () => import('@/views/Dashboard/Goods/Category/index.vue')
        },
        {
            path: 'category/add',
            name: 'categoryAdd',
            component: () => import('@/views/Dashboard/Goods/CategoryAdd/index.vue')
        },
        // {
        //     path: 'specification/detail',
        //     name: 'specification_detail',
        //     component: require('@/components/Specification/SpecificationAddPage')
        // },
        // {
        //     path: 'category',
        //     name: 'category',
        //     component: require('@/components/Category/CategoryPage')
        // },
        // {
        //     path: 'order',
        //     name: 'order',
        //     component: require('@/components/Order/OrderPage')
        // },
        // {
        //     path: 'order/detail',
        //     name: 'order_detail',
        //     component: require('@/components/Order/OrderDetailPage')
        // },
        // {
        //     path: 'user',
        //     name: 'user',
        //     component: require('@/components/User/UserPage')
        // },
        // {
        //     path: 'user/add',
        //     name: 'user_add',
        //     component: require('@/components/User/UserAddPage')
        // },
        // {
        //     path: 'shipper',
        //     name: 'shipper',
        //     component: require('@/components/Shipper/ShipperPage')
        // },
        // {
        //     path: 'shipper/list',
        //     name: 'shipper_list',
        //     component: require('@/components/Shipper/ShipperListPage')
        // },
        // {
        //     path: 'shipper/add',
        //     name: 'shipper_add',
        //     component: require('@/components/Shipper/ShipperAddPage')
        // },
        // {
        //     path: 'freight',
        //     name: 'freight',
        //     component: require('@/components/Freight/FreightPage')
        // },
        // {
        //     path: 'except_area',
        //     name: 'except_area',
        //     component: require('@/components/Freight/ExceptAreaPage')
        // },
        // {
        //     path: 'except_area/add',
        //     name: 'except_area_add',
        //     component: require('@/components/Freight/ExceptAreaAddPage')
        // },
        // {
        //     path: 'freight/add',
        //     name: 'freight_add',
        //     component: require('@/components/Freight/FreightAddPage')
        // },
        // {
        //     path: 'notice',
        //     name: 'notice',
        //     component: require('@/components/Settings/NoticePage')
        // },
        // {
        //     path: 'ad',
        //     name: 'ad',
        //     component: require('@/components/Ad/AdPage')
        // },
        // {
        //     path: 'ad/add',
        //     name: 'ad_add',
        //     component: require('@/components/Ad/AdAddPage')
        // },
        // {
        //     path: 'shopcart',
        //     name: 'shopcart',
        //     component: require('@/components/ShopCart/ShopCartPage')
        // },
        // {
        //     path: 'keywords',
        //     name: 'keywords',
        //     component: require('@/components/Keywords/KeywordsPage')
        // },
        // {
        //     path: 'keywords/add',
        //     name: 'keywords_add',
        //     component: require('@/components/Keywords/KeywordsAddPage')
        // },
        // {
        //     path: 'goodsgalleryedit',
        //     name: 'goodsgalleryedit',
        //     component: require('@/components/GoodsGallery/GoodsGalleryEditPage')
        // },
        // {
        //     path: 'admin',
        //     name: 'admin',
        //     component: require('@/components/Admin/AdminPage')
        // },
        // {
        //     path: 'admin/add',
        //     name: 'admin_add',
        //     component: require('@/components/Admin/AdminAddPage')
        // },
        // {
        //     path: 'settings/showset',
        //     name: 'showset',
        //     component: require('@/components/Showset/ShowSetPage')
        // }
    ]
  },
  // {
  //     path: '/wap',
  //     name: 'wap',
  //     component: require('@/components/WapPage'),
  //     children: [
  //         {
  //             path: '/',
  //             name: 'goods',
  //             component: require('@/components/Wap/GoodsPage')
  //         },
  //         {
  //             path: 'order',
  //             name: 'order',
  //             component: require('@/components/Wap/OrderPage')
  //         },

  //     ]
  // },
  {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
  },
  {
      path: '/:catchAll(.*)',
      redirect: '/login'
  },
  // {
  //   path: "/403",
  //   component: () => import("@/views/error-page/403.vue"),
  //   meta: {
  //     hidden: true
  //   }
  // },
  // {
  //   path: "/404",
  //   component: () => import("@/views/error-page/404.vue"),
  //   meta: {
  //     hidden: true
  //   },
  //   alias: "/:pathMatch(.*)*"
  // }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/permission",
  //   component: Layout,
  //   redirect: "/permission/page",
  //   name: "Permission",
  //   meta: {
  //     title: "权限管理",
  //     svgIcon: "lock",
  //     roles: ["admin", "editor"], // 可以在根路由中设置角色
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "page",
  //       component: () => import("@/views/permission/page.vue"),
  //       name: "PagePermission",
  //       meta: {
  //         title: "页面权限",
  //         roles: ["admin"] // 或者在子导航中设置角色
  //       }
  //     },
  //     {
  //       path: "directive",
  //       component: () => import("@/views/permission/directive.vue"),
  //       name: "DirectivePermission",
  //       meta: {
  //         title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
  //       }
  //     }
  //   ]
  // },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
