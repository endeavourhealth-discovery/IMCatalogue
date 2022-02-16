import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Datamodel from "../views/Concept.vue";
import Workflow from "../views/Workflow.vue";
import Catalogue from "../views/Catalogue.vue";
import UPRN from "../views/Uprn.vue";
import User from "../views/User.vue";
import Editor from "../views/Editor.vue";
import Login from "../components/user/Login.vue";
import Register from "../components/user/Register.vue";
import UserDetails from "../components/user/UserDetails.vue";
import UserEdit from "../components/user/UserEdit.vue";
import PasswordEdit from "../components/user/PasswordEdit.vue";
import ConfirmCode from "../components/user/ConfirmCode.vue";
import Logout from "../components/user/Logout.vue";
import ForgotPassword from "../components/user/ForgotPassword.vue";
import ForgotPasswordSubmit from "../components/user/ForgotPasswordSubmit.vue";
import CatalogueDashboard from "@/components/catalogue/CatalogueDashboard.vue";
import InstanceDetails from "@/components/catalogue/InstanceDetails.vue";
import SnomedLicense from "../views/SnomedLicense.vue";
import store from "@/store/index";
import { nextTick } from "vue";

const APP_TITLE = "Information Model";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "Dashboard" },
    meta: {
      requiresLicense: true
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        alias: ["/home", "/dashboard"],
        component: Dashboard,
        meta: {
          requiresLicense: true
        }
      },
      {
        path: "/concept/:selectedIri",
        name: "Concept",
        component: Datamodel,
        meta: {
          requiresLicense: true
        }
      }
    ]
  },
  {
    path: "/catalogue",
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

router.beforeEach((to, from, next) => {
  const iri = to.params.selectedIri as string;
  if (iri && store.state.blockedIris.includes(iri)) {
    return;
  }
  if (to.name?.toString() == "Concept") {
    store.commit("updateConceptIri", to.params.selectedIri as string);
  }
  if (to.name?.toString() == "Individual") {
    store.commit("updateInstanceIri", to.params.selectedIri as string);
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch("authenticateCurrentUser").then(res => {
      console.log("auth guard user authenticated:" + res.authenticated);
      if (!res.authenticated) {
        console.log("redirecting to login");
        next({
          path: "/user/login"
        });
      } else {
        next();
      }
    });
  } else if (to.matched.some(record => record.meta.requiresLicense)) {
    console.log("snomed license accepted:" + store.state.snomedLicenseAccepted);
    if (store.state.snomedLicenseAccepted !== "true") {
      next({
        path: "/snomedLicense"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(to => {
  nextTick(() => {
    document.title = (to.meta.title as string) || APP_TITLE;
  });
});

export default router;
