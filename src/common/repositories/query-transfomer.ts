import { plainToClass } from 'class-transformer';

function QueryTransformer(res: any, dataType?: any) {
  const { data: json } = res;
  if (json === undefined) {
    return res;
  }

  const newJson = res?.data
    ? {
        ...res,
        ...(res?.data
          ? {
              data: dataType ? plainToClass(dataType, res?.data) : res?.data,
            }
          : {}),
      }
    : {
        ...(dataType ? plainToClass(dataType, res) : res),
      };

  return {
    ...res,
    ...newJson,
  };
}
export default QueryTransformer;
