import { validateOrReject } from "class-validator";
export const createAndValidateDto = async (
  DtoClass: any,
  data: Partial<any>
): Promise<any> => {
  if (!(DtoClass.prototype instanceof Object)) {
    throw new Error("DtoClass must be a valid class");
  }

  const dto = Object.assign(new DtoClass(), data);

  await validateOrReject(dto);

  return dto;
};
