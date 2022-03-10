import axios from "axios";

export default class WorkflowService {
  static api = import.meta.env.VITE_API;

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
