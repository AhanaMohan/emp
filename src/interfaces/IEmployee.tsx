export interface Employee {
  company?: (CompanyEntity)[] | null;
  title: string;
  data?: (IEmployee)[] | null;
  totalCount: number;
}
export interface CompanyEntity {
  id?: null;
  companyName: string;
  companyLocalName: string;
  customName?: null;
  address: string;
  address1: string;
  licenseNo?: null;
  phoneNo?: null;
  mobileNo?: null;
}
export interface IEmployee {
  id:string;
  employeeName: string;
  employeeLocalName: string;
  mobileNumber: string;
  email: string;
  address: string;
  address1: string;
  ledgerId: string;
  departmentId: string;
  additionalDetailsMappingId: string;
  payRollMappingId: string;
  isUser: boolean;
  isDeleted: boolean;
  isCanceled: boolean;
  isApproved: boolean;
  // branchId: string;
  // companyId: string;
  createdBy: string;
  createdDate: string;
  updatedBy?: null;
  updatedDate: string;
}


