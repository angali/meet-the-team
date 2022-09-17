import axios from "axios";
import { API } from "../config";

//This class is responsible to communicate with server side API endpoints
export class UserService {
  public static getUsers(
    page: number = 0,
    results: number = 50,
    inc: string = "name, picture, location, email, phone, cell",

  ) {
    const dataURL: string = `${API}/users`;
    return axios.post(dataURL, { inc, page, results });
  }
}
