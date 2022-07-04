export class APIResponseModel {
  ResponseStatus: boolean | undefined;
  ErrMsg: any | undefined;
  SuccessMsg: string | undefined;
  BusinessData: any;
  ResponseDateTime: string | undefined;
  RequestDateTime: string | undefined;
}
