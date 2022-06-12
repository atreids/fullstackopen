import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    if (response.status === 400) {
      update(response.body.personid, newObject).then(
        (response) => response.data
      );
    } else {
      return response.data;
    }
  });
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personServices = {
  getAll,
  create,
  update,
  deletePerson,
};

export default personServices;
