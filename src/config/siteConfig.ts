export type Service = { id: string; name: string; description: string; icon: string; image: string; priceLabel: string; durationLabel: string; benefits: string[]; enabled: boolean };
export const siteConfig = {
  business: {
    name: 'Northstar', descriptor: 'HOME SERVICES', tagline: 'Expert care. Exceptional comfort.',
    description: 'Thoughtful, dependable home comfort services from people who respect your time, your home, and your trust.',
    phone: '+91 98765 43210', whatsappNumber: '919876543210', email: 'hello@northstar.example', address: 'Your business address, Kerala, India',
    workingHours: 'Mon–Sat, 9:00 AM–7:00 PM', serviceAreas: ['Kochi', 'Ernakulam', 'Nearby areas'],
  },
  theme: { colors: { primary: '#102A43', secondary: '#173F5F', accent: '#D6AD60', background: '#F7F5F0', surface: '#FFFFFF', text: '#172B3A', muted: '#667788', border: '#E4E7EB', green: '#2C6E59' } },
  navigation: [{label:'Services',href:'#services'},{label:'Our approach',href:'#approach'},{label:'Standards',href:'#standards'},{label:'FAQs',href:'#faq'}],
  hero: { eyebrow: 'HOME COMFORT, MADE SIMPLE', headline: 'Comfort at home.\nCare in every detail.', body: 'From a quick AC repair to a complete installation, get considered service from a team that puts your home first.', primaryCta: 'Book a service', secondaryCta: 'Chat on WhatsApp', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1500&q=85', imageAlt: 'Technician carefully inspecting home equipment', note: 'Your comfort is in capable hands.' },
  services: [
    {id:'ac-repair',name:'AC repair',description:'Clear diagnosis and careful repairs to get your cooling back on track.',icon:'wrench',image:'https://static.vecteezy.com/system/resources/thumbnails/071/837/068/small/technician-repairing-white-wall-mounted-air-conditioner-in-modern-indoor-setting-free-photo.jpg',priceLabel:'Request a quote',durationLabel:'Depends on the issue',benefits:['Issue diagnosis','Repair options explained','Work begins with your approval'],enabled:true},
    {id:'ac-installation',name:'AC installation',description:'A considered installation for reliable performance and everyday comfort.',icon:'wind',image:'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80',priceLabel:'Request a quote',durationLabel:'Confirmed after assessment',benefits:['Installation planning','Careful setup','Operating guidance'],enabled:true},
    {id:'ac-maintenance',name:'AC maintenance',description:'Routine care that helps keep your system running at its best.',icon:'settings',image:'https://media.istockphoto.com/id/2154707821/photo/air-conditioner-service-the-air-conditioner-technician-is-using-a-gauge-to-measure-the.jpg?s=612x612&w=0&k=20&c=I-EvZdWGrPOTJcmFUYqCohZ3raVYnV-QFhS2CBiCI8Q=',priceLabel:'Request a quote',durationLabel:'Confirmed during booking',benefits:['System inspection','Cleaning where applicable','Performance checks'],enabled:true},
    {id:'appliance-service',name:'Appliance service',description:'Practical help with selected home appliances, subject to availability.',icon:'house-plug',image:'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',priceLabel:'Request a quote',durationLabel:'Depends on appliance',benefits:['Initial assessment','Clear next steps','Customer-approved work'],enabled:true}
  ] satisfies Service[],
  benefits: [
    {number:'01',title:'Clarity before work',body:'We explain the issue and the available options before proceeding.'},
    {number:'02',title:'Respect for your home',body:'Careful work practices and a tidy, considerate service experience.'},
    {number:'03',title:'Straightforward communication',body:'Know what happens next, from your first request to the service visit.'}
  ],
  process: [
    {number:'01',title:'Tell us what you need',body:'Choose a service and share a few details about the issue.'},
    {number:'02',title:'Choose a preferred time',body:'Select a date and time window that works for you.'},
    {number:'03',title:'We confirm with you',body:'Your request is reviewed and the team confirms availability.'},
    {number:'04',title:'Service with care',body:'We assess the issue, explain the work, and proceed with your approval.'}
  ],
  standards: { eyebrow:'A BETTER SERVICE EXPERIENCE', title:'Good work is more than a quick fix.', body:'A thoughtful service visit starts with listening, continues with clear explanations, and ends with you understanding what was done.', items:['Diagnosis before recommendations','Customer approval before additional work','Respectful communication throughout','Clear explanation of applicable charges'] },
  testimonials: { enabled:false, items:[] },
  faq: [
    {question:'Which areas do you serve?',answer:'We currently serve the locations listed in our service areas. Share your locality with us and we will confirm whether a visit is available.'},
    {question:'How much does a service cost?',answer:'The cost depends on the service and the issue. We will explain the applicable charges or quotation before proceeding with work.'},
    {question:'Does submitting this form confirm my appointment?',answer:'No. This form sends a service request. Your appointment is confirmed only after our team contacts you and confirms availability.'},
    {question:'Can I book through WhatsApp?',answer:'Yes. Fill in the WhatsApp booking form and we will open a chat with your details pre-filled. Review the message and press Send in WhatsApp.'},
    {question:'Can I change my preferred date?',answer:'Contact the team using the details on this website. Any change depends on availability and must be confirmed by the business.'}
  ],
  booking: { minAdvanceDays:0, maxAdvanceDays:30, timeSlots:['9:00 AM – 11:00 AM','11:00 AM – 1:00 PM','2:00 PM – 4:00 PM','4:00 PM – 6:00 PM'], messageTemplate:'Hello! I would like to request a service booking.' },
  features: { onlineBooking:true, whatsappBooking:true, testimonials:false, pricing:true, animations:true, mobileStickyCta:true },
  footer: { note:'Thoughtful home services, with comfort and care at the centre.', copyright:'© {year} Northstar Home Services. All rights reserved.', social:[] },
  seo: { title:'AC Repair & Home Services in Kochi | Northstar', description:'Northstar provides careful AC repair, installation and maintenance in Kochi and Ernakulam. Request a home service visit from our team.', canonicalUrl:'', ogImage:'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1500&q=85' },
  legal: {
    lastUpdated:'28 October 2026',
    terms:{title:'Terms & Conditions',intro:'These terms are a starter template and must be reviewed and adapted by the business before publication.',sections:[{heading:'Service requests and confirmation',body:'Submitting a form or WhatsApp message sends a request only. A visit is confirmed only after the business explicitly confirms availability.'},{heading:'Pricing and payment',body:'Any estimate, applicable taxes, payment timing and payment methods must be confirmed with the business before work begins.'},{heading:'Cancellations and access',body:'Please contact the business as early as possible to request a change. Customers should provide safe and reasonable access to the equipment and service location.'},{heading:'Scope of work',body:'The technician will explain the diagnosis and recommended work. Additional work should proceed only after customer approval.'},{heading:'Contact',body:'For questions about these terms, contact the business using the phone number or email shown on this website.'}]},
    privacy:{title:'Privacy Policy',intro:'This starter policy should be reviewed against the business’s actual data practices and applicable law before publication.',sections:[{heading:'Information we collect',body:'A service request may include your name, phone number, email address, service selection, preferred date and time, address, and the description you provide.'},{heading:'How information is used',body:'Information is used to review your request, contact you, assess service availability, and coordinate a requested service.'},{heading:'WhatsApp and third parties',body:'If you choose WhatsApp, your device opens WhatsApp with a pre-filled message. You decide whether to send it. WhatsApp processes information under its own terms and privacy policy.'},{heading:'Retention and security',body:'The business should define and document appropriate retention periods, access controls, and security practices for customer information.'},{heading:'Your choices and contact',body:'For privacy questions or requests concerning your information, contact the business using the contact details displayed on this website.'}]}
  }
};
