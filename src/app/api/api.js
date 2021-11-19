import axios from "axios";
import qs from "qs";
import { exportedAccessToken } from "../../pages/Router";

const baseUrl = "https://app-new.radamsk.ru";

// https://app-new.radamsk.ru/report-company-group/edit-responsible
// https://app-new.radamsk.ru/report-company-group/index?fields=user_id,report_id

const host = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${
      exportedAccessToken
        ? exportedAccessToken
        : "7ukLdpvY3nQk3yy2U2IOdxAL1TTY2eQA"
    }`,
  },
});

export const getTabs = async () => {
  const { data } = await host.get("/report-category/index").catch((error) => {
    return { data: [] };
  });
  return data;
};

export const getSchema = async (currentTabId) => {
  const { data } = await host
    .get(`/report-company-group/schema?categoryId=${currentTabId}`)
    .catch((error) => {
      return { data: [] };
    });
  return data;
};

export const getData = async (currentTabId) => {
  const { data } = await host
    .get(`/report-company-group/index?categoryId=${currentTabId}`)
    .catch((error) => {
      return { data: [] };
    });
  return data;
};

export const getValidationArray = async (name) => {
  const { data } = await host.get(`/${name}/validation`);
  return data;
};

export const getValueArray = async (params) => {
  const { data } = await host.get(
    `/${params.entity}/view?id=${params.id}&categoryId=${params.categoryId}&companyId=${params.companyId}`
  );
  return data;
};

export const getValueArrayForMainForm = async (params) => {
  const { data } = await host.get(
    `/${params.entity}/view?categoryId=${params.categoryId}&companyId=${params.companyId}`
  );
  return data;
};

export const getValueArrayForSettingForm = async (params) => {
  const { data } = await host.get(`/${params.entity}/view?id=${params.id}`);
  return data;
};

export const getDropDownValues = async (name) => {
  const { data } = await host.get(`/${name}/index`);
  return data;
};

export const updateForm = async (entity, id, categoryId, companyId, form) => {
  const response = await host.post(
    `/${entity}/update?id=${id}&categoryId=${categoryId}&companyId=${companyId}`,
    qs.stringify(form)
  ).catch(error => error.response);
  return response;
};

export const updateMainForm = async (entity, categoryId, companyId, values) => {
  const response = await host.post(
    `/${entity}/update?categoryId=${categoryId}&companyId=${companyId}`,
    qs.stringify(values)
  );
  return response;
};

export const createForm = async (entity, formsValues) => {
  const response = await host
    .post(`/${entity}/create`, qs.stringify(formsValues))
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const deleteForm = async (name, id) => {
  const { data } = await host.get(`/${name}/delete?id=${id}`);
  return data;
};

export const getSettingSchema = async (tabName) => {
  const { data } = await host.get(`/${tabName}/schema`).catch((error) => {
    return { data: [] };
  });
  return data;
};

export const getSettingData = async (tabName) => {
  const { data } = await host.get(`/${tabName}/index`).catch((error) => {
    return { data: [] };
  });
  return data;
};

export const setNewResponsible = async (params) => {
  const { data } = await host
    .post("/report-company-group/edit-responsible", qs.stringify(params))
    .catch((error) => error.response);
  return data;
};

export const setNewFunctional = async (params) => {
  const { data } = await host
    .post("/report-company-group/edit-functional", qs.stringify(params))
    .catch((error) => error.response);
  return data;
};

export const getReportValueArray = async () => {
  const { data } = await host.get("/report/index");
  return data;
};
// https://app-new.radamsk.ru/report-company/index?company_id=6&fields=report_id,user_id
export const getUserIdArrayForAllReport = async (company_id) => {
  const { data } = await host.get(
    `/report-company/index?company_id=${company_id}&fields=report_id,user_id`
  );
  return data;
};

// report-company-group/update?companyId

export const setUserIdArrayForAllReport = async (companyId, values) => {
  const { data } = await host.post(
    `report-company-group/update?companyId=${companyId}`,
    qs.stringify(values)
  );
  return data;
};

//https://app-new.radamsk.ru/b24-user/index

export const getUserIdArray = async () => {
  const {data} = await host.get('b24-user/index')
  return data
} 

export const createNewUser = async (params) => {
  const proxyParams = {
    name: params.name,
    id: params.id.link,
    editable: 1,
  }
  const response = await host.post('report-user/create', qs.stringify(proxyParams)).catch(error => error.response)
  return response
}