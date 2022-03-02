import axios from "axios";
import { UPRN } from "im-library/dist/types/interfaces/Interfaces";
import { Models } from "im-library";
const {
  Search: { SearchResponse }
} = Models;

export default class UprnService {
  static api = import.meta.env.VITE_UPRN_API;
  static username = (import.meta.env.VITE_UPRN_USERNAME as string) || "";
  static password = (import.meta.env.VITE_UPRN_PASSWORD as string) || "";
  static userId = (import.meta.env.VITE_UPRN_USERID as string) || "";

  public static async findUprn(address: string, area?: string): Promise<Models.Search.SearchResponse> {
    const config = {
      params: { adrec: address },
      auth: {
        username: this.username,
        password: this.password
      }
    } as any;
    if (area) config.params.qpost = area;

    try {
      return await axios.get(this.api + "/getinfo", config);
    } catch (error) {
      return {} as Models.Search.SearchResponse;
    }
  }

  public static async getUprn(uprn: string): Promise<UPRN> {
    try {
      return await axios.get(this.api + "/getuprn", {
        params: { uprn: uprn },
        auth: {
          username: this.username,
          password: this.password
        }
      });
    } catch (error) {
      return {} as UPRN;
    }
  }

  public static async getActivity(): Promise<{ DT: string; A: string }[]> {
    try {
      return await axios.get(this.api + "/activity", {
        params: { u: this.userId },
        auth: {
          username: this.username,
          password: this.password
        }
      });
    } catch (error) {
      return [] as { DT: string; A: string }[];
    }
  }

  public static async download(filename: string): Promise<any> {
    try {
      return await axios.get(this.api + "/filedownload2", {
        params: {
          userid: this.userId,
          filename: filename
        },
        responseType: "blob",
        auth: {
          username: this.username,
          password: this.password
        }
      });
    } catch (error) {
      return {};
    }
  }

  public static async upload(fileData: any): Promise<any> {
    const formData = new FormData();
    formData.append("file", fileData, fileData.name);
    formData.append("userid", this.userId);
    try {
      return await axios.post(this.api + "/fileUpload2", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        auth: {
          username: this.username,
          password: this.password
        }
      });
    } catch (error) {
      return {};
    }
  }
}
