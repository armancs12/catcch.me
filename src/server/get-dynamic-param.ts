import { APIRequest } from "./api-router/@types";

const getDynamicParam = (req: APIRequest, param: string) => {
  const value = req.query[param];
  return typeof value === "string" ? value : value[0];
};

export default getDynamicParam;
