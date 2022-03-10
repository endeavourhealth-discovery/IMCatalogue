import CatalogueHistory from "@/components/catalogue/catalogueSideBar/CatalogueHistory.vue";
import { shallowMount } from "@vue/test-utils";
import Listbox from "primevue/listbox";

describe("CatalogueHistory.vue", () => {
  let wrapper;
  let mockRouter;

  beforeEach(() => {
    vi.resetAllMocks();

    mockRouter = {
      push: vi.fn()
    };

    wrapper = shallowMount(CatalogueHistory, {
      global: {
        components: { Listbox },
        mocks: { $router: mockRouter }
      },
      props: { history: [] }
    });
  });

  it("can mount", () => {
    expect(wrapper.vm.selected).toStrictEqual({});
    expect(wrapper.vm.history).toStrictEqual([]);
  });

  it("can navigate ___ selected", () => {
    wrapper.vm.selected = { "@id": "testIri", iriType: { "@id": "testType" }, name: "testName" };
    wrapper.vm.navigate();
    expect(mockRouter.push).toBeCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Individual", params: { selectedIri: "testIri" } });
  });

  it("can navigate ___ not selected", () => {
    wrapper.vm.navigate();
    expect(mockRouter.push).not.toBeCalledTimes(1);
  });
});
