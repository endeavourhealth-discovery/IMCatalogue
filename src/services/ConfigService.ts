import axios from "axios";
import { Env } from "im-library";

export default class ConfigService {
  static api = Env.API;

  public static async getXmlSchemaDataTypes(): Promise<any> {
    try {
      return await axios.get(this.api + "api/config/public/xmlSchemaDataTypes");
    } catch (error) {
      return [] as string[];
    }
  }
}
