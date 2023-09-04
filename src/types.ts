export interface IResetPassword {
  password: string;
  confirmPassword: string;
  username: string;
  _id?: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  employeeId: string;
  mobileNo: string;
  createdAt: Date;
  type: UserType;
  name: string;
  updatedAt: Date;
  address: string;
  contactPerson: {
    name: string;
    mobileNo: string;
    //email: string;
  };
  photo?:Buffer;
  joiningDate?: Date;
  lastLoggedToken?:String;
}

export interface IUserExcel {
  email: string;
  username: string;
  password: string;
  employeeId: string;
  mobileNo: string;
  type: UserType;
  name: string;
  address: string;
  contactPerson: {
    contactPersonName: string;
    contactPersonMobileNo: string;
    contactPersonEmail: string;
  };
}

export interface IArticle {
  _id: string;
  //articleTypes: string;
  article: string,
  pages: number,
  inputType: InputType,
  complexity: Complexity,
  processType: ProcessType,
  mathCount: string,
  imagesCount: string,
  client: string,
  batch: string,
  assignedTo?: string,
  status: Status,
  closedDate?: Date,
  completedDate?: Date,
  IsCreatedByMe?: boolean,
  createdBy?: string,
  datefield: Date,
  createdAt: Date,
  updatedAt: Date,
  AdminCommand: string,
  userstatus:UserStatus,
  userCompletedDate?:Date,
  targetDate?:Date,
}

export interface ITransaction {
  _id: string;
  invoice: string;
  description: string;
  date: Date;
  for: string;
  paid: number;
  recieved: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  ASSIGNED = "ASSIGNED",
  UNASSIGNED = "UNASSIGNED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
}
export enum UserStatus {
  STARTED = "STARTED",
  "NOT STARTED" = "NOT STARTED",
  COMPLETED = "COMPLETED"
}

export enum UserType {
  ADMIN = "ADMIN",
  EMP = "EMP",
  CLIENT = "CLIENT",
  SUP = "SUP",
}

export enum ModelType {
  USER = "USER",
  TRANSACTION = "TRANSACTION",
  ARTICLE = "ARTICLE",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  email: string;
  type: tokens;
}

export enum tokens {
  access = "access",
  refresh = "refresh",
}

export class ResponseDTO<T> {
  statusCode: number;
  success: boolean;
  data: T | null;
  error: string | [] | null;

  constructor(
    statusCode: number,
    success: boolean,
    data: T | null,
    error: string | [] | null
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}

export enum statusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHENTICATED = 401,
  REFRESH_TOKEN_EXPIRED = 403,
}

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      user?: IUser;
    }
  }
}


export enum FilterStatus {
  ASSIGNED = "ASSIGNED",
  UNASSIGNED = "UNASSIGNED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
  ALL = "ALL"
}
export enum InputType {
  "PDF PRINTED" = "PDF PRINTED",
  "PDF SCANNED" = "PDF SCANNED"
}
export enum Complexity {
  SIMPLE = "SIMPLE",
  MEDIUM = "MEDIUM",
  COMPLEX = "COMPLEX",
  HCOMPLEX = "HCOMPLEX"
}
export enum ProcessType {
  OCR = "OCR",
  CODING = "CODING",
  IMAGES = "IMAGES",
  REF = "REF",
  QA = "QA",
  E2E = "E2E"
}
export interface PagedData<T> {
  data: T[],
  totalRows: number
}
export interface IAdminCommand {
  _id: string;
  admincommand: string;
  active: boolean;
}
export interface IAnnouncement {
  _id: string;
  announcement: string;
  active: boolean;
}

export interface ILeave {
  appliedBy: string;
  _id: string;
  dateOfLeave?: Date;
  reason: string;
  approval?: boolean;
  approvedDate?: Date;
  notesOfApproval?: string;
}