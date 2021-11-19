/* eslint-disable no-undef */
import React, { useEffect } from "react";
import GridPage from "./grid_page/index";
import { useDispatch } from "react-redux";
import { setAccessToken, setIsAdmin, setStateParams } from "../app/store/params";
import FormPage from "./form_page/index";
import { useSelector } from "react-redux";

export const development = false;
// закомментровать accessToken если production
// let accessToken = "rR6C96LnXIVuXsDYnF9eCqhmDmFkzeN6";

// let params = {
//   placement: "DEFAULT",
//   placementOptions: {
//     params: {
//       id: "0",
//       method: "create",
//       page: "form",
//       entity: "report-category",
//     },
//   },
// };

export const exportedAccessToken = accessToken;

export default function Router() {
  const { stateParams } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (development) {
      const devParams = {
        placement: "DEFAULT",
      };
      const location = window.location.pathname.replace("/", "");
      if (location.length > 0) {
        location.split("&").forEach((item) => {
          const arr = item.split("=");
          devParams[arr[0]] = arr[1];
        });
      }
      dispatch(setStateParams(devParams));
    } else {
      if (typeof params !== "undefined") {
        let proxyParams = {
          ...params,
          ...params.placementOptions,
          ...params.placementOptions?.params
        };
        delete proxyParams.placementOptions
        delete proxyParams.params
        dispatch(setStateParams(proxyParams));
      }
    }
    if (typeof accessToken !== "undefined") {
      dispatch(setAccessToken(accessToken));
    }
    if (typeof isAdmin !== "undefined"){
      dispatch(setIsAdmin(isAdmin))
    }
  }, [dispatch]);

  switch (stateParams.page) {
    case "main-form":
      return <FormPage format="main" />;
    case "setting-form":
      return <FormPage format="setting" />;
    case "all-report-form":
      return <FormPage format="all-report" />;
    default:
      return <GridPage />;
  }
}
