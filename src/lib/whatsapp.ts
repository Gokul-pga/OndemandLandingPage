import { siteConfig } from '../config/siteConfig';
export type BookingDetails = { name:string; phone:string; email:string; service:string; date:string; day:string; time:string; address:string; description:string };
export function buildWhatsAppUrl(data: BookingDetails) {
  const serviceName = siteConfig.services.find(s => s.id === data.service)?.name ?? data.service;
  const message = `${siteConfig.booking.messageTemplate}\n\nName: ${data.name}\nPhone: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ''}\nService: ${serviceName}\nPreferred Date: ${data.date}\nDay: ${data.day}\nPreferred Time: ${data.time}\nAddress: ${data.address}\nIssue Description: ${data.description || 'Not provided'}\n\nPlease confirm availability and applicable charges.\n\nThank you!`;
  const number = siteConfig.business.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function getDay(date:string) { if (!date) return ''; return new Intl.DateTimeFormat('en-IN',{weekday:'long',timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`)); }
export function getDateLimits() { const today = new Date(); const toIso = (d:Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; const min = new Date(today); min.setDate(min.getDate()+siteConfig.booking.minAdvanceDays); const max = new Date(today); max.setDate(max.getDate()+siteConfig.booking.maxAdvanceDays); return {min:toIso(min),max:toIso(max)}; }
