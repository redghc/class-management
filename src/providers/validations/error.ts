export interface IError {
  status: string;
  message: string;
  statusCode: number;
}

export const createError = (status: number, message: string): IError => {
  return {
    status: 'error',
    message,
    statusCode: status,
  };
};

export const error2Response = (error: IError) => {
  return Response.json(error, { status: error.statusCode });
};
