import axios from "axios";
import { Services } from "im-library";
const { Env } = Services;

export default class WorkflowService {
  static api = Env.API;

  public static async getWorkflows(): Promise<any[]> {
    try {
      return await axios.get(this.api + "workflow");
    } catch (error) {
      return [];
    }
  }

  public static async getWorkflowTasks(): Promise<any[]> {
    try {
      return await axios.get(this.api + "workflow/tasks");
    } catch (error) {
      return [];
    }
  }
}
