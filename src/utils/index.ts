import { ResponseDTO, statusCode } from "../types";

export const createStartAndEndIndex = (
  page?: number,
  pageSize?: number
): { startIndex: number; endIndex: number } => {
  if (!page || !pageSize) {
    return { startIndex: 0, endIndex: 10 };
  }
  const startIndex = page * pageSize - pageSize;
  return { startIndex: startIndex, endIndex: pageSize };
};

export const getCustomValidationResponse = (): ResponseDTO<null> => {
  return new ResponseDTO(statusCode.BAD_REQUEST, false, null, null);
};

export const getCurrentDate = (d?: Date) => {
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  const date = ("0" + t.getUTCDate()).slice(-2);
  const month = ("0" + (t.getUTCMonth() + 1)).slice(-2);
  const year = t.getUTCFullYear();
  return `${year}-${month}-${date}`;
};

export const getCurrentDateWithTime = (d?: Date) => {
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  const date = ("0" + t.getUTCDate()).slice(-2);
  const month = ("0" + (t.getUTCMonth() + 1)).slice(-2);
  const year = t.getUTCFullYear();
  const hours = ("0" + t.getUTCHours()).slice(-2)
  const mins = ("0" + t.getUTCMinutes()).slice(-2)
  return `${year}-${month}-${date} ${hours}:${mins}:00`;
};