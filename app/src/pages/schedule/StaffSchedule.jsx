import React from "react";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import {
  useStaffSchedule,
  useUpdateStaffSchedule,
} from "../../hooks/apiHooks/useCenterSchedule";
import Schedule from "./Schedule";
import { useParams } from "react-router-dom";

const StaffSchedule = () => {
  const { staffId } = useParams();
  const { data, isLoading, isError, refetch } = useStaffSchedule(staffId);
  const { mutate, isLoading: updateLoading } = useUpdateStaffSchedule(staffId);

  if (isLoading || updateLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent refetch={refetch} />;
  }

  return <Schedule data={data} updateSchedule={mutate} />;
};

export default StaffSchedule;
