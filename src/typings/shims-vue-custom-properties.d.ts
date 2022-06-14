import { ConfigService, EntityService, SetService } from "im-library";
import { ComponentCustomProperties } from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import { Store } from "@/vuex";
import { Store } from "@/store.index";
import State from "@/store/stateType";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $catalogueService: CatalogueService;
    $entityService: EntityService;
    $configService: ConfigService;
    $setService: SetService;
    $swal: VueSweetalert2;
    $store: Store<State>;
  }
}
