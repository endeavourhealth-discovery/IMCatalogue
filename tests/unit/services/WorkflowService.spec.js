import WorkflowService from "@/services/WorkflowService";
import axios from "axios";

describe("WorkflowService.ts ___ axios success", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockResolvedValue("axios get return");
  });

  it("can getWorkflows", async () => {
    const api = import.meta.env.VITE_API;
    const result = await WorkflowService.getWorkflows();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "workflow");
    expect(result).toBe("axios get return");
  });

  it("can getWorkflowTasks", async () => {
    const api = import.meta.env.VITE_API;
    const result = await WorkflowService.getWorkflowTasks();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "workflow/tasks");
    expect(result).toBe("axios get return");
  });
});

describe("WorkflowService.ts ___ axios fail", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockRejectedValue(false);
  });

  it("can getWorkflows", async () => {
    const api = import.meta.env.VITE_API;
    const result = await WorkflowService.getWorkflows();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "workflow");
    expect(result).toStrictEqual([]);
  });

  it("can getWorkflowTasks", async () => {
    const api = import.meta.env.VITE_API;
    const result = await WorkflowService.getWorkflowTasks();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "workflow/tasks");
    expect(result).toStrictEqual([]);
  });
});
