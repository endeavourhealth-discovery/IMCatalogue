import { flushPromises, shallowMount } from "@vue/test-utils";
import Catalogue from "@/views/Catalogue.vue";
import CatalogueService from "@/services/CatalogueService";
import { Vocabulary } from "im-library";
const { IM } = Vocabulary;

describe("Catalogue.vue ___ instanceIri", () => {
  let wrapper;
  let mockRouter;
  let mockStore;

  const INSTANCE = {
    entity: {
      "@id": "http://org.endhealth.info/im#FQK48",
      "http://endhealth.info/im#address": {
        "@id": "http://loc.endhealth.info/im#FQK48"
      },
      "http://endhealth.info/im#status": {
        "@id": "http://endhealth.info/im#Active",
        name: "Active"
      },
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
        "@id": "http://endhealth.info/im#Organisation",
        name: "Organisation  (record type)"
      },
      "http://www.w3.org/2000/01/rdf-schema#label": "EDWALTON PHARMACY"
    },
    predicates: [
      { name: "address", "@id": "http://endhealth.info/im#address" },
      { name: "status", "@id": "http://endhealth.info/im#status" },
      { name: "type", "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" },
      { name: "label", "@id": "http://www.w3.org/2000/01/rdf-schema#label" }
    ]
  };

  const TYPES = [
    { iri: "http://endhealth.info/im#Organisation", label: "Organisation (record type)", count: 267904 },
    { iri: "http://endhealth.info/im#Address", label: "Address (record type)", count: 267904 }
  ];

  beforeEach(async () => {
    mockRouter = {
      push: vi.fn()
    };

    mockStore = {
      state: {
        instanceIri: "http://org.endhealth.info/im#FQK48"
      },
      commit: vi.fn()
    };

    CatalogueService.getPartialInstance = vi.fn().mockResolvedValue(INSTANCE);

    CatalogueService.getTypesCount = vi.fn().mockResolvedValue(TYPES);

    wrapper = shallowMount(Catalogue, {
      global: {
        components: {},
        mocks: { $router: mockRouter, $store: mockStore },
        stubs: ["router-view"]
      }
    });

    await flushPromises();
    await wrapper.vm.$nextTick();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("mounts with correct data", async () => {
    expect(wrapper.vm.types).toStrictEqual(TYPES);
    expect(wrapper.vm.instance).toStrictEqual(INSTANCE);
    expect(wrapper.vm.history).toStrictEqual([]);
    expect(wrapper.vm.loading).toBe(false);
  });

  it("inits on iri change", async () => {
    wrapper.vm.init = vi.fn();
    wrapper.vm.$options.watch.instanceIri.call(wrapper.vm, "http://org.endhealth.info/im#FQK4");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.init).toHaveBeenCalledTimes(1);
  });

  it("can init ___ instanceIri", async () => {
    expect(wrapper.vm.loading).toBe(false);
    wrapper.vm.getTypesCount = vi.fn();
    wrapper.vm.getInstance = vi.fn();
    wrapper.vm.init();
    expect(wrapper.vm.loading).toBe(true);
    await flushPromises();
    expect(wrapper.vm.getTypesCount).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getInstance).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Individual", params: { selectedIri: "http://org.endhealth.info/im#FQK48" } });
    expect(wrapper.vm.loading).toBe(false);
  });

  it("can getTypesCount", async () => {
    wrapper.vm.getTypesCount();
    expect(CatalogueService.getTypesCount).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(wrapper.vm.types).toStrictEqual(TYPES);
  });

  it("can get instance", async () => {
    wrapper.vm.getInstance();
    expect(CatalogueService.getPartialInstance).toHaveBeenCalledTimes(1);
    expect(CatalogueService.getPartialInstance).toHaveBeenCalledWith("http://org.endhealth.info/im#FQK48");
    await flushPromises();
    expect(wrapper.vm.instance).toStrictEqual(INSTANCE);
  });

  it("can updateHistory ___ new item", () => {
    wrapper.vm.updateHistory({ "@id": "testIri", iriType: { "@id": "testType" }, name: "testName" });
    expect(wrapper.vm.history).toStrictEqual([{ "@id": "testIri", iriType: { "@id": "testType" }, name: "testName" }]);
  });

  it("can updateHistory ___ existing item", () => {
    wrapper.vm.history = [{ "@id": "testIri", iriType: { "@id": "testType" }, name: "testName" }];
    wrapper.vm.updateHistory({ "@id": "testIri", iriType: { "@id": "testType" }, name: "testName" });
    expect(wrapper.vm.history).toStrictEqual([{ "@id": "testIri", iriType: { "@id": "testType" }, name: "testName" }]);
  });
});

describe("Catalogue.vue ___ no instanceIri", () => {
  let wrapper;
  let mockRouter;
  let mockStore;

  const INSTANCE = {
    entity: {
      "@id": "http://org.endhealth.info/im#FQK48",
      "http://endhealth.info/im#address": {
        "@id": "http://loc.endhealth.info/im#FQK48"
      },
      "http://endhealth.info/im#status": {
        "@id": "http://endhealth.info/im#Active",
        name: "Active"
      },
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
        "@id": "http://endhealth.info/im#Organisation",
        name: "Organisation  (record type)"
      },
      "http://www.w3.org/2000/01/rdf-schema#label": "EDWALTON PHARMACY"
    },
    predicates: [
      { name: "address", "@id": "http://endhealth.info/im#address" },
      { name: "status", "@id": "http://endhealth.info/im#status" },
      { name: "type", "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" },
      { name: "label", "@id": "http://www.w3.org/2000/01/rdf-schema#label" }
    ]
  };

  const TYPES = [
    { iri: "http://endhealth.info/im#Organisation", label: "Organisation (record type)", count: 267904 },
    { iri: "http://endhealth.info/im#Address", label: "Address (record type)", count: 267904 }
  ];

  beforeEach(async () => {
    mockRouter = {
      push: vi.fn()
    };

    mockStore = {
      state: {
        instanceIri: ""
      },
      commit: vi.fn()
    };

    CatalogueService.getPartialInstance = vi.fn().mockResolvedValue(INSTANCE);

    CatalogueService.getTypesCount = vi.fn().mockResolvedValue(TYPES);

    wrapper = shallowMount(Catalogue, {
      global: {
        components: {},
        mocks: { $router: mockRouter, $store: mockStore },
        stubs: ["router-view"]
      }
    });

    await flushPromises();
    await wrapper.vm.$nextTick();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("can init ___ no instanceIri", async () => {
    expect(wrapper.vm.loading).toBe(false);
    wrapper.vm.getTypesCount = vi.fn();
    wrapper.vm.getInstance = vi.fn();
    wrapper.vm.init();
    expect(wrapper.vm.loading).toBe(true);
    await flushPromises();
    expect(wrapper.vm.getTypesCount).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getInstance).not.toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "CatalogueDashboard" });
    expect(wrapper.vm.loading).toBe(false);
  });
});
