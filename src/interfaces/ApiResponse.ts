type ResponseError = {
  success: false;
  message: string;
};

type ResponseSuccess<T = unknown> = {
  success: true;
  message?: string;
  data: T;
  pagination?: {
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
  };
};

export type ApiResponse<T = unknown> = ResponseError | ResponseSuccess<T>;
