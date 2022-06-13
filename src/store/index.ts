import { createStore } from "vuex";
import AuthService from "@/services/AuthService";
import { HistoryItem } from "im-library/dist/types/interfaces/Interfaces";
import { Helpers, Models, Constants, LoggerService } from "im-library";
const {
  DataTypeCheckers: { isArrayHasLength, isObjectHasKeys }
} = Helpers;
const {
  Search: { SearchRequest },
  User,
  CustomAlert
} = Models;
const { Avatars } = Constants;
import vm from "@/main";

export default createStore({
  // update stateType.ts when adding new state!
  state: {
    history: [] as HistoryItem[],
    currentUser: {} as Models.User,
    isLoggedIn: false as boolean,
    snomedLicenseAccepted: localStorage.getItem("snomedLicenseAccepted") as string,
    snomedReturnUrl: "",
    authReturnUrl: "",
    blockedIris: [] as string[],
    instanceIri: "",
    catalogueSearchResults: [] as string[]
  },
  mutations: {
    updateBlockedIris(state, blockedIris) {
      state.blockedIris = blockedIris;
    },
    updateHistory(state, historyItem) {
      state.history = state.history.filter(function(el) {
        return el.conceptName !== historyItem.conceptName;
      });
      state.history.splice(0, 0, historyItem);
    },
    updateCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateIsLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    updateSnomedLicenseAccepted(state, status: string) {
      state.snomedLicenseAccepted = status;
      localStorage.setItem("snomedLicenseAccepted", status);
    },
    updateSnomedReturnUrl(state, url) {
      state.snomedReturnUrl = url;
    },
    updateAuthReturnUrl(state, url) {
      state.authReturnUrl = url;
    },
    updateInstanceIri(state, instanceIri) {
      state.instanceIri = instanceIri;
    },
    updateCatalogueSearchResults(state, results) {
      state.catalogueSearchResults = results;
    }
  },
  actions: {
    async fetchBlockedIris({ commit }) {
      const blockedIris = await vm.$configService.getXmlSchemaDataTypes();
      commit("updateBlockedIris", blockedIris);
    },

    async logoutCurrentUser({ commit }) {
      let result = new CustomAlert(500, "Logout (store) failed");
      await AuthService.signOut().then(res => {
        if (res.status === 200) {
          commit("updateCurrentUser", null);
          commit("updateIsLoggedIn", false);
          result = res;
        } else {
          result = res;
        }
      });
      return result;
    },
    async authenticateCurrentUser({ commit, dispatch }) {
      const result = { authenticated: false };
      await AuthService.getCurrentAuthenticatedUser().then(res => {
        if (res.status === 200 && res.user) {
          commit("updateIsLoggedIn", true);
          const loggedInUser = res.user;
          const foundAvatar = Avatars.find(avatar => avatar === loggedInUser.avatar);
          if (!foundAvatar) {
            loggedInUser.avatar = Avatars[0];
          }
          commit("updateCurrentUser", loggedInUser);
          result.authenticated = true;
        } else {
          dispatch("logoutCurrentUser").then(resLogout => {
            if (resLogout.status === 200) {
              LoggerService.info(undefined, "Force logout successful");
            } else {
              LoggerService.error(undefined, "Force logout failed");
            }
          });
        }
      });
      return result;
    }
  },
  modules: {}
});
