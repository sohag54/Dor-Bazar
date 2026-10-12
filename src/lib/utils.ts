export function toBnNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

export function formatBnPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) return '০';
  const formatted = new Intl.NumberFormat('en-IN').format(price);
  return toBnNumber(formatted);
}

export function formatBnUnit(unit: string): string {
  if (!unit) return 'প্রতি একক';
  const lower = unit.toLowerCase().trim();
  switch (lower) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
    case 'liter':
    case 'l':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
    case 'pc':
      return 'প্রতি পিস';
    case 'gm':
    case '100gm':
    case '100g':
      return 'প্রতি ১০০ গ্রাম';
    case 'packet':
      return 'প্রতি প্যাকেট';
    case 'hali':
      return 'প্রতি হালি';
    default:
      return `প্রতি ${unit}`;
  }
}

export function getBanglaDate(date = new Date()): string {
  const days = [
    'রবিবার',
    'সোমবার',
    'মঙ্গলবার',
    'বুধবার',
    'বৃহস্পতিবার',
    'শুক্রবার',
    'শনিবার',
  ];

  const months = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  const dayName = days[date.getDay()];
  const dayNum = toBnNumber(date.getDate());
  const monthName = months[date.getMonth()];
  const yearNum = toBnNumber(date.getFullYear());

  return `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;
}
