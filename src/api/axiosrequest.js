import { axiosInstance } from "./axiosinstance.config";

const axiosRequest = async (method, url, data = null, token) => {
  try {
    const config = {
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...(data && { data }), // Include the data key only if data is not null
    };

    const response = await axiosInstance(config);

    // Return the response data for further use
    return response.data;
  } catch (err) {
    console.error(err.message);
    throw err; // Re-throw the error for caller functions to handle
  }
};

// Convenience wrappers for specific HTTP methods
export const axiospost = (url, data, token) =>
  axiosRequest("post", url, data, token);
export const axiosput = (url, data, token) =>
  axiosRequest("put", url, data, token);
export const axiosget = (url, token) => axiosRequest("get", url, null, token);

///////////////////////////
// LONG REDUNDANT METHOD //
///////////////////////////
// import { axiosInstance } from "./axiosinstance.config";
// // import { endpoints } from "./endpoints";

// export const axiospost = async (url, data, token) => {
//   try {
//     const response = await axiosInstance.post(url, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Return the response data for further use
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const axiosput = async (url, data, token) => {
//   try {
//     const response = await axiosInstance.put(url, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Return the response data for further use
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const axiosget = async (url, token) => {
//   try {
//     const response = await axiosInstance.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Return the response data for further use
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
