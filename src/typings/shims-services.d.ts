import CatalogueService from "@/services/CatalogueService";
import { ConfigService, EntityService, SetService } from "im-library";
import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $catalogueService: CatalogueService;
    $entityService: EntityService;
    $configService: ConfigService;
    $setService: SetService;
  }
}
