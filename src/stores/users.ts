// import { customFetch, fetchData } from "@/utils/fetchData";

// export const fnGetListUsers = async (params: Record<string, string>) => {
//   const queryString = new URLSearchParams(params).toString();
//   return await customFetch(`/users?${queryString}`);
// };

// export const fnGetDetailHouse = async (houseId: string) => {
//     return await fetchData(`/project/${houseId}`);
// };

// export const fnGetRoomByHouseId = async (params: Record<string, string>) => {
//     const queryString = new URLSearchParams(params).toString();
//     return await fetchData(`/project/roomFree?${queryString}`);
// };

// //get room select for house
// export const fnGetSelectRoomByHouseId = async (params: Record<string, any>) => {
//     const queryString = new URLSearchParams(params).toString();
//     return await fetchData(`/project/roomSelect?${queryString}`);
// };

// //get room select bi houseIds
// export const fnGetSelectRoomByHouseIds = async (params: string) => {
//     return await fetchData(
//         `/project/roomSelectByProjects?projectsId=${params}`,
//     );
// };

// // Import file
// export const fnImportFile = async (data: any) => {
//     const response = await fetchData('/project/import', {
//         method: 'POST',
//         body: data,
//     });

//     return response;
// };

// export const fnAddNews = async (payload: any) => {
//     const response = await fetchData('/news', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//     });

//     return response;
// };
