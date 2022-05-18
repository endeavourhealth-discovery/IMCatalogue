import axios from "axios";
import CatalogueService from "@/services/CatalogueService";
import { Env } from "im-library";

describe("CatalogueService.ts ___ axios success", () => {
  const api = Env.API;

  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockResolvedValue("axios get return");
  });

  it("can get search results", async () => {
    const cancelToken = axios.CancelToken.source().token;
    const result = await CatalogueService.getSearchResult("testTerm", ["testType"], cancelToken);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "instance/public/search", {
      params: { request: "testTerm", typesIris: ["testType"].join(",") },
      cancelToken: cancelToken
    });
    expect(result).toBe("axios get return");
  });

  it("can get partial instance", async () => {
    const result = await CatalogueService.getPartialInstance("testIri", ["testPredicate"]);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "instance/public/partial", {
      params: { iri: "testIri", predicate: ["testPredicate"] }
    });
    expect(result).toBe("axios get return");
  });

  it("can get types and counts", async () => {
    const result = await CatalogueService.getTypesCount();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "instance/public/typesCount");
    expect(result).toBe("axios get return");
  });
});

describe("CatalogueService.ts ___ axios fail", () => {
  const api = Env.API;

  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockRejectedValue(false);
  });

  it("can get search results", async () => {
    const cancelToken = axios.CancelToken.source().token;
    const result = await CatalogueService.getSearchResult("testTerm", ["testType"], cancelToken);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "instance/public/search", {
      params: { request: "testTerm", typesIris: ["testType"].join(",") },
      cancelToken: cancelToken
    });
    expect(result).toStrictEqual([]);
  });

  it("can get partial instance", async () => {
    const result = await CatalogueService.getPartialInstance("testIri", ["testPredicate"]);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "instance/public/partial", {
      params: { iri: "testIri", predicate: ["testPredicate"] }
    });
    expect(result).toStrictEqual({});
  });

  it("can get types and counts", async () => {
    const result = await CatalogueService.getTypesCount();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "instance/public/typesCount");
    expect(result).toStrictEqual([]);
  });
});
