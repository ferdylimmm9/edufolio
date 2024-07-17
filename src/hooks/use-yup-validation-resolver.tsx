import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

const useYupValidationResolver = (validationSchema: AnyObjectSchema) =>
  yupResolver(validationSchema);

export default useYupValidationResolver;
