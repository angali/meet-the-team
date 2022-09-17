import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { RANDOM_USER_API_URL } from "../../config";
import { IUsers } from "../../models/user";

type Data = {
  usersData?: IUsers;
  error?: string;
};

// API endpoint to handle getting list users.
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { inc, page, results } = req.body;

  // url of Random user API endpoint to get list of users
  const url = `${RANDOM_USER_API_URL}?page=${page}&results=${results}&inc=${inc}`;

  //retrive users
  return axios
    .get(url)
    .then(response => {
      return res.status(200).json({ usersData: response.data });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({ error: "Can not read list of users" });
    });
}
