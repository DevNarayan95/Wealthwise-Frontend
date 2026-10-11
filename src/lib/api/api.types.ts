export interface ApiSuccessResponse<TData, TMeta = Record<string, unknown>> {
  success: true;
  data: TData;
  meta: TMeta;
}
