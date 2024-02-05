const Endpoint = {
  LoginApi: "auth/admin-login/",
  AllProviders: "admin/allProviders/",
  providerDeactive: "admin/providerActivation/",
  ProviderUpdate: "admin/updateProvider/",
  AllSaloons: "admin/getSalons",
  EditSalon: "admin/editSalon/",
  SalonActive: "admin/salonActivation/",
  Alljobs: "admin/getJobs/",
  jobStatus: "admin/editJob/",
  letters: "admin/getNewsLetters/",
  servicesGet: "service/allService/",
  editServices: "service/update/",
  DelServices: "service/delete/",
  AddServices: "service/add/",
  makeAnnouncement: "admin/announcement",
  stats: "admin/stats",
  GetfedBack: "admin/getFeedbacks/",
  salonDeactive: "admin/salonActivation/",
  GetLicense: "admin/license",
  actionOnLicense: "admin/verifyLicense/",
  registrationApi: "admin/createUser/",
  paymentsApi: "admin/getSubscriptions",
  totalEarningsApi: "admin/getEarnings",
};

const Endpoint_registrationApi = {};
// const Endpointa = {
//   updateUser: "admin/update-user/",
// };
const Endpoint_Product = {
  updateProduct: "admin/update-product/",
};
const Endpoint_Report = {
  updateReport: "admin/update-parent-category/",
};
const Endpoint_FeedbackApi = {
  FeedbackApi: "report/all",
};
const Endpoint_category = {
  newCategory: "admin/create-parent-category/",
};
const Endpoint_AddProduct = {
  AddProduct: "products/create-product",
};
const Endpoint_brand = {
  newBrand: "admin/create-sub-category/",
};
const Endpoint_ChildAddNew = {
  newChild: "admin/create-child-category/",
};
const Endpoint_Childupdate = {
  updateChild: "admin/update-child-category/",
};
const Endpoint_Childelete = {
  deleteChild: "admin/delete-child-category/",
};
const Endpoint_Childrecover = {
  recoverChild: "admin/recover-child-category/",
};
// ------------

const Endpoint_SubChildAll = {
  SubChildApi: "admin/get-sub-child-categories-byId/",
  SubChildAapiAll: "admin/get-sub-child-categories/",
  newSubChild: "admin/create-sub-child-category/",
  updateSubChild: "admin/update-sub-child-category/",
  deleteSubChild: "admin/delete-sub-child-category/",
  recoverSubChild: "admin/recover-sub-child-category/",
};

const Endpoint_Userapi = {
  userApi: "admin/get-users/",
};
const Endpoint_reportapi = {
  reportApi: "admin/get-parent-categories/",
};
const Endpoint_brandsAapi = {
  brandsAapi: "admin/get-sub-categories-byId/",
};
const Endpoint_brandsAapiAll = {
  brandsAapiAll: "admin/get-sub-categories/",
};
const Endpoint_ChildApiiAll = {
  ChildApiiAll: "admin/get-child-categories/",
};
const Endpoint_ChildApii = {
  ChildApii: "admin/get-child-categories-byId/",
};
const Endpoint_brands_del = {
  brandsDel: "admin/delete-sub-category/",
};
const Endpoint_brands_recover = {
  brandsRec: "admin/recover-sub-category/",
};
const Endpoint_brands_update = {
  brandsUpdate: "admin/update-sub-category/",
};
const Endpoint_Productapi = {
  productApi: "admin/get-products/",
};
const Endpoint_ProductapiFilter = {
  productApiFilter: "admin/get-productsByCategory/",
};
const Endpoint_Productapi_block = {
  product_blockApi: "admin/delete-product/",
};
const Endpoint_Productapi_unblock = {
  product_unblockApi: "admin/recover-product/",
};
const Endpoint_Reportapi_block = {
  Report_blockApi: "admin/delete-parent-category/",
};
const Endpoint_Reportapi_unblock = {
  Report_unblockApi: "admin/recover-parent-category/",
};
const Endpoint_userApi_Block = {
  userApi_Block: "admin/block-user/",
};
const Endpoint_userApi_UnBlock = {
  userApi_unBlock: "admin/unblock-user/",
};
const Endpoint_userApi_delete = {
  userApi_delete: "admin/delete-user/",
};
const Endpoint_userApi_Add = {
  userApi_Add: "admin/recover-user/",
};
export {
  Endpoint,
  Endpoint_Product,
  Endpoint_Report,
  Endpoint_Userapi,
  Endpoint_Productapi,
  Endpoint_reportapi,
  Endpoint_Productapi_block,
  Endpoint_Productapi_unblock,
  Endpoint_Reportapi_block,
  Endpoint_Reportapi_unblock,
  // Endpoint_LoginApi,
  Endpoint_registrationApi,
  Endpoint_userApi_Block,
  Endpoint_userApi_UnBlock,
  Endpoint_userApi_delete,
  Endpoint_userApi_Add,
  Endpoint_category,
  Endpoint_brandsAapi,
  Endpoint_brands_del,
  Endpoint_brands_recover,
  Endpoint_brands_update,
  Endpoint_brand,
  Endpoint_AddProduct,
  Endpoint_brandsAapiAll,
  Endpoint_ProductapiFilter,
  Endpoint_FeedbackApi,
  Endpoint_ChildApiiAll,
  Endpoint_ChildApii,
  Endpoint_ChildAddNew,
  Endpoint_Childupdate,
  Endpoint_Childelete,
  Endpoint_Childrecover,
  Endpoint_SubChildAll,
};
