// services/reportService.js
import { AxiosInstance } from "./AxiosInstance";
import { ENDPOINT } from "./Endpoint";

/**
 * Fetch tasks completed in the last week
 * GET /report/last-week
 */
export const getWeeklyReport = () => {
  return AxiosInstance.get(`${ENDPOINT.DASHBOARDS}/report/last-week`);
};

/**
 * Fetch total days of pending work
 * GET /report/pending
 */
export const getPendingWork = () => {
  return AxiosInstance.get(`${ENDPOINT.DASHBOARDS}/report/pending`);
};

/**
 * Fetch number of closed tasks grouped by owners
 * GET /report/closed-tasks?groupBy=owners
 */
export const getTasksByOwners = () => {
  return AxiosInstance.get(
    `${ENDPOINT.DASHBOARDS}/report/closed-tasks?groupBy=owners`,
  );
};

/**
 * Fetch number of closed tasks grouped by teams
 * GET /report/closed-tasks?groupBy=team
 */
export const getTasksByTeams = () => {
  return AxiosInstance.get(
    `${ENDPOINT.DASHBOARDS}/report/closed-tasks?groupBy=team`,
  );
};

/**
 * Fetch number of closed tasks grouped by projects
 * GET /report/closed-tasks?groupBy=project
 */
export const getTasksByProjects = () => {
  return AxiosInstance.get(
    `${ENDPOINT.DASHBOARDS}/report/closed-tasks?groupBy=project`,
  );
};
