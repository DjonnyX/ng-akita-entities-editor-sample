interface IQueryParams { [param: string]: string | string[] }

/**
 * Интерфейс параметров запроса
 */
export interface IRequestParams<F> {
  sortBy?: string;
  order?: 'DESC'|'ASC';
  filter?: Array<F>;
  slice?: {
    start: number;
    end: number;
    limit?: number;
  }
}

/**
 * Создает параметры для запроса к json-server'у
 */
export const createRequestParams = function<T>(options: IRequestParams<T>): IQueryParams {
  
  const result = {};

  // Добавление параметра сортировки
  if (options.sortBy) result["_sort"] = options.sortBy;

  // Добавление параметров фильтрации
  if (options.filter) appendFilterParams(result, options.filter);
  
  // Добавление параметров выборки секвенции
  if (options.slice && options.slice.start && options.slice.end) {
    result["_start"] = options.slice.start;
    result["_end"] = options.slice.end;
    if (options.slice.limit) result["_limit"] = options.slice.limit;
  }

  return result
}

/**
 * Добавляет к объекту src параметры фильтрации
 */
const appendFilterParams = function<T>(src: any, filter: Array<T>): IQueryParams {
    if (!src) src = {};

    if (!filter) return;

    filter.forEach((v: any) => {
      Object.keys(v).forEach(k => {
        const val = String(v[k]);
        if (src.hasOwnProperty(k)) src[k].push(val)
        else src[k] = [val];
      });
    });

    return src;
}