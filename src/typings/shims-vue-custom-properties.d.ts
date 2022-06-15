import { ConfigService, EntityService, Env, LoggerService, SetService } from "im-library/dist/types/services/Services";
import { ComponentCustomProperties } from "vue";
import * as sweetalert2 from "sweetalert2";
import { Store } from "@/vuex";
import { Store } from "@/store.index";
import State from "@/store/stateType";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $catalogueService: CatalogueService;
    $entityService: EntityService;
    $configService: ConfigService;
    $env: Env;
    $loggerService: LoggerService;
    $setService: SetService;
    $swal: sweetalert2;
    $store: Store<State>;
  }
}