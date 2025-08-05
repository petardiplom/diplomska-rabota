import React from "react";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import {
  useCenterSchedule,
  useUpdateCenterSchedule,
} from "../../hooks/apiHooks/useCenterSchedule";
import Schedule from "./Schedule";

const CenterSchedule = () => {
  const { data, isLoading, isError, refetch } = useCenterSchedule();
  const { mutate, isLoading: updateLoading } = useUpdateCenterSchedule();

  if (isLoading || updateLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent refetch={refetch} />;
  }

  return <Schedule data={data} updateSchedule={mutate} />;
};

export default CenterSchedule;
