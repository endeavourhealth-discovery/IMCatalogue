import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Catalogue from "../views/Catalogue.vue";
import CatalogueDashboard from "@/components/catalogue/CatalogueDashboard.vue";
import InstanceDetails from "@/components/catalogue/InstanceDetails.vue";
import { SnomedLicense, Env, Helpers } from "im-library";
import store from "@/store/index";
import { nextTick } from "vue";
const {
  RouterGuards: { checkAuth, checkLicense }
} = Helpers;

const APP_TITLE = "Information Model";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Catalogue",
    component: Catalogue,
    redirect: { name: "CatalogueDashboard" },
    meta: {
      requiresLicense: true
    },
    children: [
      {
        path: "dashboard",
        name: "CatalogueDashboard",
        component: CatalogueDashboard,
        meta: {
          requiresLicense: true
        }
      },
      {
        path: "individual/:selectedIri",
        name: "Individual",
        component: InstanceDetails,
        meta: {
          requiresLicense: true
        }
      }
    ]
  },
  {
    path: "/snomedLicense",
    name: "License",
    component: SnomedLicense
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  let hasCalledNext = false;
  const iri = to.params.selectedIri as string;
  const currentUrl = Env.catalogueUrl + "/#" + to.path;
  if (to.path !== "/snomedLicense") {
    store.commit("updateSnomedReturnUrl", currentUrl);
    store.commit("updateAuthReturnUrl", currentUrl);
  }
  if (iri && store.state.blockedIris.includes(iri)) {
    return;
  }
  if (iri) {
    store.commit("updateInstanceIri", to.params.selectedIri as string);
  }
  hasCalledNext = await checkAuth(to, next, store, hasCalledNext, currentUrl);
  hasCalledNext = checkLicense(to, next, store, hasCalledNext);
  if (!hasCalledNext) next();
});

router.afterEach(to => {
  nextTick(() => {
    document.title = (to.meta.title as string) || APP_TITLE;
  });
});

export default router;
