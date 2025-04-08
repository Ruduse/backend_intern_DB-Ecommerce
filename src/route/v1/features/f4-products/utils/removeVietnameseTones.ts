export default function removeVietnameseTones(str: string): string {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
