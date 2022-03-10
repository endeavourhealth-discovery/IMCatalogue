import CatalogueFilters from "@/components/catalogue/catalogueSideBar/CatalogueFilters.vue";
import { shallowMount } from "@vue/test-utils";
import MultiSelect from "primevue/multiselect";

describe("CatalogueFilters.vue", () => {
  let wrapper;

  const TYPE_OPTIONS = [
    { iri: "http://endhealth.info/im#Address", label: "Address (record type)", count: 267904 },
    { iri: "http://endhealth.info/im#Organisation", label: "Organisation  (record type)", count: 267904 }
  ];

  beforeEach(() => {
    vi.resetAllMocks();

    const warn = console.warn;
    console.warn = vi.fn();
    wrapper = shallowMount(CatalogueFilters, {
      props: {
        typeOptions: TYPE_OPTIONS
      },
      global: { components: { MultiSelect } }
    });
    console.warn = warn;
  });

  it("mounts", () => {
    expect(wrapper.vm.typeOptions).toStrictEqual(TYPE_OPTIONS);
    expect(wrapper.vm.selected).toStrictEqual(TYPE_OPTIONS);
  });

  it("can updateSelectedTypes", async () => {
    wrapper.vm.updateSelectedTypes();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().typesSelected).toBeTruthy();
    expect(wrapper.emitted().typesSelected[0]).toStrictEqual([TYPE_OPTIONS]);
  });
});
