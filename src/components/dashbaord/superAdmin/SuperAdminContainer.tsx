"use client";
import Table from "@/components/common/table/Table";
import React, { useCallback, useEffect, useState } from "react";
import Card from "@/components/common/card/Card";
import { GrUserManager } from "react-icons/gr";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import HomeIcon from "../../../assets/svg/home-2.svg";
import Image from "next/image";
import SearchBar from "@/components/common/searchBar/SearchBar";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  authGetRequest,
  authPatchRequest,
  authPostRequest,
} from "@/lib/apiClient";
import Modal from "@/components/common/modal/Modal";
import CreateUser from "@/assets/svg/createUser.svg";
import { PiPencilSimple } from "react-icons/pi";
import Alert from "@/components/common/alert/Alert";
import TableCell from "@/components/common/tableCell/TableCell";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/common/form/Form";
import { adminInputFields } from "@/constants/formData/inputField";
import PageNavigation from "@/components/common/pageNavigation/PageNavigation";
import SuccessModal from "@/components/common/successModal/SuccessModal";
import {
  defaultEditState,
  defaultFormData,
  defaultSuccessModalsate,
  EditStateProps,
  FormData,
  SuccessModalState,
} from "@/interface/form";
import { superAdminTableHeader } from "@/constants/tableHeader/tableHeader";

function SuperAdminContainer() {
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [organizationCount, setOrganizationCount] = useState<number>(0);
  const [isErrorMsg, setIsErrorMsg] = useState<string>("");
  const [successModalState, setSuccessModalState] = useState<SuccessModalState>(
    defaultSuccessModalsate
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [organisationData, setOrganizationData] = useState([]);
  const [activeOrganizationCount, setActiveOrganizationCount] =
    useState<number>(0);
  const [allChecked, setAllChecked] = useState(false);
  const [editState, setEditState] = useState<EditStateProps>(defaultEditState);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<FormData>(defaultFormData);
  const pageSize = 10;
  const validateForm = () => {
    const newErrors: typeof errors = { ...errors };
    let isValid = true;

    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key as keyof typeof errors] = "This field is required";
        isValid = false;
      } else {
        newErrors[key as keyof typeof errors] = "";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCardClick = (cardNo: number) => {
    setSelectedCard(cardNo);
    setCheckedRows([]);
    setCurrentPage(0);
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // clear error message
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
    setIsErrorMsg("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editState?.isEditMode) {
        const editedData = {
          id: editState?.orgId,
          orgName: formData?.orgName,
          industry: formData?.industry,
          registerDTO: {
            ...formData,
            id: editState?.adminId,
          },
        };
        await authPatchRequest("org/update-organization", editedData);
        setSuccessModalState({
          title: "Admin is updated",
          message: "Admin has been updated successfully",
          additionalInfo: "You can now chaeck this in your organization list. ",
        });
      } else {
        await authPostRequest("auth/register-admins", formData);
        setSuccessModalState({
          ...successModalState,
          title: "Admin is added",
          message: "Admin has been added successfully",
          additionalInfo: "You can now chaeck this in your organization list. ",
        });
      }
      handleCancel();
      setIsAddedModalOpen(true);
      await getOrganizationDetails();
      setFormData(defaultFormData);
    } catch (error: any) {
      setIsErrorMsg(error?.response?.data?.message || "Somthing went wrong!");
      console.error("Error while register admin:", error);
    }
  };

  const handleHeaderCheckboxChange = (checked: boolean) => {
    setAllChecked(checked);
    setCheckedRows(checked ? organisationData.map((item: any) => item.id) : []);
  };

  const handleRowCheckboxChange = (id: number) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((checkedId) => checkedId !== id)
        : [...prevCheckedRows, id]
    );
  };

  const handleTotalPageCount = (): number => {
    if (selectedCard == 1) {
      return Math.ceil(organizationCount / pageSize) || 0;
    } else if (selectedCard == 2) {
      return Math.ceil(activeOrganizationCount / pageSize) || 0;
    }
    return 0;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleActiveDeactiveStatus = async (status: boolean) => {
    setSuccessModalState(defaultSuccessModalsate);
    try {
      const res = await authPostRequest(
        `org/deactivate-organization?status=${status}`,
        checkedRows
      );
      setSuccessModalState({
        ...successModalState,
        title: "The status has been successfully updated.",
      });
      setIsAddedModalOpen(true);
      setCheckedRows([]);
      await getOrganizationDetails();
    } catch (error) {
      console.error("Error while update active deactive status:", error);
    }
  };

  const handleOrgDetailsEdit = (item: any) => {
    setEditState((prevState) => ({
      ...prevState,
      isEditMode: true,
    }));
    setIsCreatingModalOpen(true);
    setFormData({
      firstName: item?.registerDTO?.firstName || "",
      middleName: item?.registerDTO?.middleName || "",
      lastName: item?.registerDTO?.lastName || "",
      mobile: item?.registerDTO?.mobile || "",
      empId: item?.registerDTO?.empId || "",
      email: item?.registerDTO?.email || "",
      roleName: item?.registerDTO?.roleName || "",
      designation: item?.registerDTO?.designation || "",
      orgName: item?.orgName || "",
      industry: item?.industry || "",
    });
    setEditState((prevState) => ({
      ...prevState,
      orgId: item?.id,
      adminId: item?.registerDTO?.id,
    }));
  };

  const handleCancel = () => {
    setEditState(defaultEditState);
    setIsCreatingModalOpen(false);
    setFormData(defaultFormData);
    setErrors(defaultFormData);
    setIsErrorMsg("");
  };

  const getOrganizationDetails = useCallback(async () => {
    try {
      let url = `org/get-organization-details?page=${currentPage}&size=${pageSize}`;
      if (selectedCard === 2) {
        url += "&isActive=true";
      }
      const res = await authGetRequest(url);
      setOrganizationCount(res?.data?.organizationCount);
      setActiveOrganizationCount(res?.data?.orgActiveCount);
      setOrganizationData(res?.data?.organizations);
    } catch (error) {
      console.error("Error organization details:", error);
    }
  }, [currentPage, selectedCard]);

  useEffect(() => {
    getOrganizationDetails();
  }, [getOrganizationDetails]);

  useEffect(() => {
    if (organisationData.length > 0) {
      setAllChecked(checkedRows.length === organisationData.length);
    }
  }, [checkedRows, organisationData.length]);

  const cardData = [
    {
      id: 1,
      title: "Total no of Organizations",
      count: organizationCount || 0,
      icon: <GrUserManager />,
    },
    {
      id: 2,
      title: "Active Organization",
      count: activeOrganizationCount || 0,
      icon: <FaUsersGear />,
    },
  ];

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col gap-6 mx-8 pt-6">
        <div>
          <Image src={HomeIcon} alt="Home" className="h-5 w-5" />
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-[#1E293B] text-[28px] font-semibold">Home</p>
          </div>
          <div
            className="flex flex-row gap-3"
            onClick={() => setIsCreatingModalOpen(true)}
          >
            <Button className="bg-transparent border flex flex-row gap-2 hover:bg-[#1C3268] bg-[#1C3268] text-[#FFF] font-semibold">
              <IoMdAdd />
              <span>Create</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 my-5 bg-[#FCFCFC] p-8">
        {cardData?.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              count={item.count}
              iconName={item.icon}
              selected={selectedCard === item.id}
              onClick={() => handleCardClick(item.id)}
            />
          );
        })}
      </div>
      {/* table container */}
      <div className="flex flex-col gap-6 px-6 ">
        <div>
          <p className="text-[28px] font-semibold text-[#1C3268]">
            {selectedCard == 1
              ? "Organizations"
              : selectedCard === 2
              ? "Active Organization"
              : "Users"}
          </p>
        </div>

        {/* sort filter */}
        <div className="flex flex-row justify-between items-center">
          <div>
            <SearchBar
              placeholder="Search"
              icon={<CiSearch />}
              className="w-[360px] text-[#475569]"
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Button
              className={`bg-[#FFF] text-[#E14942] flex items-center gap-2 border hover:bg-[#FFF] font-medium text-sm ${
                checkedRows.length === 0 && "cursor-not-allowed opacity-50"
              }`}
              onClick={() => handleActiveDeactiveStatus(false)}
            >
              Deactivate
            </Button>
            <Button
              className={`bg-[#FFF] text-[#00900B] flex items-center gap-2 border hover:bg-[#FFF] font-medium text-sm ${
                checkedRows.length === 0 && "cursor-not-allowed opacity-50"
              }`}
              onClick={() => handleActiveDeactiveStatus(true)}
            >
              Activate
            </Button>
          </div>
        </div>
        {/* Table */}
        <div>
          <Table
            tableHeader={superAdminTableHeader}
            isCheckBox
            onHeaderCheckboxChange={handleHeaderCheckboxChange}
            allChecked={allChecked}
          >
            {organisationData?.map((item: any, index) => {
              return (
                <tr key={item.id} className="border border-b">
                  <TableCell className="flex flex-row gap-3">
                    <Checkbox
                      checked={checkedRows.includes(item.id)}
                      onCheckedChange={() => handleRowCheckboxChange(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.orgName}</TableCell>
                  <TableCell>{item.industry}</TableCell>
                  <TableCell>
                    {item.isActive ? (
                      <div className="bg-[#AEE5B2] py-[2px] px-2 rounded-3xl w-[40%] m-auto">
                        <span className="text-[#00900B] text-xs font-medium leading-[18px]">
                          Active
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[rgba(255, 96, 88, 0.10)] py-[2px] px-2 rounded-3xl w-[40%] m-auto">
                        <span className="text-[#FF6058] text-xs font-medium leading-[18px]">
                          Deactive
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex justify-center cursor-pointer"
                      onClick={() => handleOrgDetailsEdit(item)}
                    >
                      <PiPencilSimple className="h-5 w-5" />
                    </div>
                  </TableCell>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
      <div className="pt-3 mx-6">
        <PageNavigation
          totalPages={handleTotalPageCount()}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* create modal container */}
      <Modal
        isOpen={isCreatingModalOpen}
        onClose={handleCancel}
        bgColor="#F9F9F9"
      >
        <div className="w-[800px]">
          {/* logo */}
          <div className="bg-[#FFF] rounded-full h-[60px] w-[60px] m-auto p-4 mb-6">
            <Image src={CreateUser} alt="create user logo" />
          </div>

          {/* content */}
          <div className="flex flex-col gap-7 w-[720px] m-auto">
            <p className="text-[#1C3268] text-[28px] font-semibold leading-[34px] text-center">
              {`${editState?.isEditMode ? "Edit" : "Add"} Organization Admin`}
            </p>

            {isErrorMsg && (
              <div className="w-[90%] m-auto">
                <Alert
                  errorMessage={isErrorMsg}
                  onClose={() => console.log("close")}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-md">
              {adminInputFields.map((item) => (
                <div className={`col-span-${item.colSpan}`} key={`${item.id}`}>
                  <Form
                    id={item?.id}
                    lable={item?.label}
                    type={item?.type}
                    value={formData[item?.id as keyof FormData] || ""}
                    onChange={handleAdminInputChange}
                    placeholder={item?.placeholder}
                    prefix={item?.prefix}
                    prefixIcon={item?.prefixIcon}
                    error={errors[item?.id as keyof FormData]}
                    disabled={
                      editState?.isEditMode &&
                      (item.id === "email" || item.id === "empId")
                    }
                  />
                </div>
              ))}
            </div>

            {/* form action buttons */}
            <div className="flex justify-end gap-4">
              <Button
                className="bg-white hover:bg-white border"
                onClick={handleCancel}
              >
                <span className="text-[#344054] font-semibold text-base leading-6">
                  Cancel
                </span>
              </Button>
              <Button onClick={handleSubmit}>
                <span className="text-[#FFF] font-semibold text-base leading-6">
                  {editState?.isEditMode ? "Save" : "Create"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* success modal */}
      <SuccessModal
        isOpen={isAddedModalOpen}
        onClose={() => setIsAddedModalOpen(false)}
        title={successModalState?.title}
        message={successModalState?.message}
        additionalInfo={successModalState?.additionalInfo}
      />
    </>
  );
}

export default SuperAdminContainer;
