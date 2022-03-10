import UprnService from "@/services/UprnService";
import axios from "axios";

describe("UprnService.ts ___ axios success", () => {
  const api = import.meta.env.VITE_UPRN_API;
  const username = import.meta.env.VITE_UPRN_USERNAME || "";
  const password = import.meta.env.VITE_UPRN_PASSWORD || "";
  const userId = import.meta.env.VITE_UPRN_USERID || "";

  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockResolvedValue("axios get return");
    axios.post = vi.fn().mockResolvedValue("axios post return");
  });

  it("can find uprn", async () => {
    const result = await UprnService.findUprn("test address", "test area");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/getinfo", {
      params: { adrec: "test address", qpost: "test area" },
      auth: { username: username, password: password }
    });
    expect(result).toBe("axios get return");
  });

  it("can find uprn ___ no area", async () => {
    const result = await UprnService.findUprn("test address");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/getinfo", { params: { adrec: "test address" }, auth: { username: username, password: password } });
    expect(result).toBe("axios get return");
  });

  it("can get uprn", async () => {
    const result = await UprnService.getUprn("123456");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/getuprn", { params: { uprn: "123456" }, auth: { username: username, password: password } });
    expect(result).toBe("axios get return");
  });

  it("can get activity", async () => {
    const result = await UprnService.getActivity();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/activity", { params: { u: userId }, auth: { username: username, password: password } });
    expect(result).toBe("axios get return");
  });

  it("can download", async () => {
    const result = await UprnService.download("test filename");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/filedownload2", {
      params: { userid: userId, filename: "test filename" },
      responseType: "blob",
      auth: { username: username, password: password }
    });
    expect(result).toBe("axios get return");
  });

  it("can upload", async () => {
    const formData = new FormData();
    const blob = new Blob(["test data"]);
    formData.append("file", blob, undefined);
    formData.append("userid", userId);
    const result = await UprnService.upload(blob);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(api + "/fileUpload2", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: { username: username, password: password }
    });
    expect(result).toBe("axios post return");
  });
});

describe("UprnService.ts ___ axios fail", () => {
  const api = import.meta.env.VITE_UPRN_API;
  const username = import.meta.env.VITE_UPRN_USERNAME || "";
  const password = import.meta.env.VITE_UPRN_PASSWORD || "";
  const userId = import.meta.env.VITE_UPRN_USERID || "";

  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockRejectedValue(false);
    axios.post = vi.fn().mockRejectedValue(false);
  });

  it("can find uprn", async () => {
    const result = await UprnService.findUprn("test address", "test area");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/getinfo", {
      params: { adrec: "test address", qpost: "test area" },
      auth: { username: username, password: password }
    });
    expect(result).toStrictEqual({});
  });

  it("can find uprn ___ no area", async () => {
    const result = await UprnService.findUprn("test address");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/getinfo", { params: { adrec: "test address" }, auth: { username: username, password: password } });
    expect(result).toStrictEqual({});
  });

  it("can get uprn", async () => {
    const result = await UprnService.getUprn("123456");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/getuprn", { params: { uprn: "123456" }, auth: { username: username, password: password } });
    expect(result).toStrictEqual({});
  });

  it("can get activity", async () => {
    const result = await UprnService.getActivity();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/activity", { params: { u: userId }, auth: { username: username, password: password } });
    expect(result).toStrictEqual([]);
  });

  it("can download", async () => {
    const result = await UprnService.download("test filename");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "/filedownload2", {
      params: { userid: userId, filename: "test filename" },
      responseType: "blob",
      auth: { username: username, password: password }
    });
    expect(result).toStrictEqual({});
  });

  it("can upload", async () => {
    const formData = new FormData();
    const blob = new Blob(["test data"]);
    formData.append("file", blob, undefined);
    formData.append("userid", userId);
    const result = await UprnService.upload(blob);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(api + "/fileUpload2", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: { username: username, password: password }
    });
    expect(result).toStrictEqual({});
  });
});
