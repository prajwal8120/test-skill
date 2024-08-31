interface AdminInputField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  prefix?: string;
  prefixIcon?: string;
  colSpan?: string | number;
}

export const adminInputFields: AdminInputField[] = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    colSpan: 3,
  },
  {
    id: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Enter middle name",
    colSpan: 3,
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    colSpan: 2,
  },
  {
    id: "mobile",
    label: "Mobile Number",
    type: "number",
    placeholder: "Enter mobile number",
    prefix: "+91",
    colSpan: 2,
  },
  {
    id: "empId",
    label: "Employee ID",
    type: "text",
    placeholder: "Enter employee ID",
    colSpan: 2,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email address",
    prefixIcon: "",
    colSpan: 2,
  },
  {
    id: "orgName",
    label: "Organization Name",
    type: "text",
    placeholder: "Enter your organization name",
    colSpan: 2,
  },
  {
    id: "roleName",
    label: "Role Name",
    type: "text",
    placeholder: "Enter role name",
    colSpan: 2,
  },
  {
    id: "designation",
    label: "Designation",
    type: "text",
    placeholder: "Enter designation",
    colSpan: 3,
  },
  {
    id: "industry",
    label: "Industry Name",
    type: "text",
    placeholder: "Enter industry name",
    colSpan: 3,
  },
];
