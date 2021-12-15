import React from "react";
import Loading from "../../components/global/loading/Loading";
import MainForm from "./containers/MainForm";
import SettingForm from "./containers/SettingForm";
import AllReportForm from "./containers/AllReportForm";

export default function FormPage({ format }) {
  switch (format) {
    case "main":
      return <MainForm />;
    case "setting":
      return <SettingForm />;
    case "all-report":
      return <AllReportForm />;
    default:
      return <Loading />;
  }
  // switch (entity) {
  //   case 'report-company':
  //   case 'report-user':
  //     return <MainForm />;
  //   case "admin-create-report":
  //   case "admin-create-user":
  //   case "admin-create-report":
  //     return <SettingForm />;
  //   case "company":
  //     return <AllReportForm />;
  //   case 'report-company-group':
  //     return <NewForm/>
  //   default:
  //     break;
  // }
}
