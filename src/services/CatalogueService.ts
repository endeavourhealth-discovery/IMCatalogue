import { CancelToken } from "axios";
import { SimpleCount, TTBundle } from "im-library/dist/types/interfaces/Interfaces";
import { Services } from "im-library";
const { Env } = Services;

export default class CatalogueService {
  private api = Env.API;

  axios: any;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async getSearchResult(request: string, typesIris: string[], cancelToken: CancelToken): Promise<any[]> {
    try {
      return await this.axios.get(this.api + "instance/public/search", {
        params: { request: request, typesIris: typesIris.join(",") },
        cancelToken: cancelToken
      });
    } catch (error) {
      return [] as any[];
    }
  }

  public async getPartialInstance(iri: string, predicates?: string[]): Promise<TTBundle> {
    try {
      return await this.axios.get(this.api + "instance/public/partial", {
        params: { iri: iri, predicate: predicates }
      });
    } catch (error) {
      return {} as TTBundle;
    }
  }

  public async getTypesCount(): Promise<SimpleCount[]> {
    try {
      return await this.axios.get(this.api + "instance/public/typesCount");
    } catch (error) {
      return [] as SimpleCount[];
    }
  }
}
