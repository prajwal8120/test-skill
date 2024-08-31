export interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  mobile: string;
  empId: string;
  email: string;
  roleName: string;
  designation: string;
  orgName: string;
  industry: string;
}
export const defaultFormData: FormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  mobile: "",
  empId: "",
  email: "",
  roleName: "",
  designation: "",
  orgName: "",
  industry: "",
};
export type FormProps = {
  id: string;
  lable: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  prefix?: string;
  prefixIcon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
};

export interface SuccessModalState {
  title: string;
  message: string;
  additionalInfo: string;
}

export const defaultSuccessModalsate = {
  title: "",
  message: "",
  additionalInfo: "",
};

export interface EditStateProps {
  isEditMode: boolean;
  orgId: string;
  adminId: string;
}

export const defaultEditState = {
  isEditMode: false,
  orgId: "",
  adminId: "",
};
