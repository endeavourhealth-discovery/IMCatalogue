import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Catalogue from "../views/Catalogue.vue";
import CatalogueDashboard from "@/components/catalogue/CatalogueDashboard.vue";
import InstanceDetails from "@/components/catalogue/InstanceDetails.vue";
import { SnomedLicense, Env, Helpers, AccessDenied } from "im-library";
import store from "@/store/index";
import { nextTick } from "vue";

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
  },
  {
    path: "/401",
    name: "AccessDenied",
    component: AccessDenied
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  const iri = to.params.selectedIri as string;
  const currentUrl = Env.CATALOGUE_URL + to.path.slice(1);
  if (to.path !== "/snomedLicense") {
    store.commit("updateSnomedReturnUrl", currentUrl);
    store.commit("updateAuthReturnUrl", currentUrl);
  }
  if (iri && store.state.blockedIris.includes(iri)) {
    return false;
  }
  if (iri) {
    store.commit("updateInstanceIri", to.params.selectedIri as string);
  }
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    const res = await store.dispatch("authenticateCurrentUser");
    console.log("auth guard user authenticated: " + res.authenticated);
    if (!res.authenticated) {
      console.log("redirecting to login");
      window.location.href = Env.AUTH_URL + "login?returnUrl=" + currentUrl;
    }
  }
  if (to.matched.some((record: any) => record.meta.requiresLicense)) {
    console.log("snomed license accepted:" + store.state.snomedLicenseAccepted);
    if (store.state.snomedLicenseAccepted !== "true") {
      return {
        path: "/snomedLicense"
      };
    }
  }
});

router.afterEach(to => {
  nextTick(() => {
    document.title = (to.meta.title as string) || APP_TITLE;
  });
});

export default router;
