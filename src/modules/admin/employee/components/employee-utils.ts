import { AdminModel } from 'api-hooks/admin/model';

export function employeeNameGenerator(employee: AdminModel) {
  return [employee.namaDepan, employee.namaTengah, employee.namaBelakang]
    .filter(Boolean)
    .join(' ');
}
