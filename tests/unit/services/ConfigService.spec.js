import ConfigService from "@/services/ConfigService";
import axios from "axios";
import {Env} from "im-library";

describe("ConfigService.ts ___ axios success", () => {
  const api = Env.api;

  beforeEach(() => {
    axios.get = vi.fn().mockResolvedValue(["test config"]);
  });

  it("can getXmlSchemaDataTypes", async () => {
    const result = await ConfigService.getXmlSchemaDataTypes();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/public/xmlSchemaDataTypes");
    expect(result).toStrictEqual(["test config"]);
  });
});

describe("ConfigService.ts ___ axios fail", () => {
  const api = Env.api;

  beforeEach(() => {
    axios.get = vi.fn().mockRejectedValue(false);
  });

  it("can get xmlSchemaDataTypes", async () => {
    const result = await ConfigService.getXmlSchemaDataTypes();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/public/xmlSchemaDataTypes");
    expect(result).toStrictEqual([]);
  });
});
