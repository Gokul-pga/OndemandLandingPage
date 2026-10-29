import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2, X } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import {
  BookingDetails,
  buildWhatsAppUrl,
  getDateLimits,
  getDay,
} from "../lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

type Props = {
  open: boolean;
  onClose: () => void;
  initialService?: string;
  mode: "whatsapp" | "request";
};
const empty: BookingDetails = {
  name: "",
  phone: "",
  email: "",
  service: "ac-repair",
  date: "",
  day: "",
  time: "",
  address: "",
  description: "",
};
export default function BookingModal({
  open,
  onClose,
  initialService,
  mode,
}: Props) {
  const [form, setForm] = useState<BookingDetails>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (open) {
      setForm({
        ...empty,
        service:
          initialService ||
          siteConfig.services.find((s) => s.enabled)?.id ||
          "",
      });
      setErrors({});
      setStatus("");
    }
  }, [open, initialService]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", key);
    };
  }, [open, onClose]);
  if (!open) return null;
  const set = (key: keyof BookingDetails, value: string) =>
    setForm((p) => ({
      ...p,
      [key]: value,
      ...(key === "date" ? { day: getDay(value) } : {}),
    }));
  const limits = getDateLimits();
  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[+\d][\d\s()+-]{7,18}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number.";
    if (!form.service) e.service = "Choose a service.";
    if (!form.date) e.date = "Choose a preferred date.";
    else if (form.date < limits.min || form.date > limits.max)
      e.date = "Choose a date within the available booking window.";
    if (!form.time) e.time = "Choose a time slot.";
    if (!form.address.trim())
      e.address = "Enter the service address or locality.";
    if (
      !document.getElementById("privacy-consent") ||
      !(document.getElementById("privacy-consent") as HTMLInputElement).checked
    )
      e.consent = "Please confirm the privacy notice.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (mode === "whatsapp") {
      window.open(buildWhatsAppUrl(form), "_blank", "noopener,noreferrer");
      setStatus(
        "WhatsApp opened with your request pre-filled. Review it and press Send in WhatsApp.",
      );
    } else {
      setStatus(
        "Your request is ready, but this demo has no booking backend connected. No request has been sent or saved. Connect an API to enable submission.",
      );
    }
  }
  const activeServices = siteConfig.services.filter((s) => s.enabled);
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <div className="modal-top">
          <div>
            <span className="eyebrow">LET’S GET YOU COMFORTABLE</span>
            <h2 id="booking-title">Request a service</h2>
            <p>
              Tell us a little about what you need. We’ll confirm availability
              with you.
            </p>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close booking form"
          >
            <X size={21} />
          </button>
        </div>
        {status ? (
          <div className="status-panel">
            <CheckCircle2 size={28} />
            <p>{status}</p>
            {mode === "whatsapp" && (
              <a
                className="button button-dark"
                href={buildWhatsAppUrl(form)}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp again <ArrowUpRight size={17} />
              </a>
            )}
            <button className="button button-outline" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <label className="field">
                Full name *
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label className="field">
                Mobile number *
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <small>{errors.phone}</small>}
              </label>
              <label className="field">
                Email address <span>(optional)</span>
                <input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className="field">
                Service needed *
                <select
                  value={form.service}
                  onChange={(e) => set("service", e.target.value)}
                  aria-invalid={!!errors.service}
                >
                  <option value="">Choose a service</option>
                  {activeServices.map((s) => (
                    <option value={s.id} key={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {errors.service && <small>{errors.service}</small>}
              </label>
              <label className="field">
                Preferred date *
                <input
                  type="date"
                  min={limits.min}
                  max={limits.max}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <small>{errors.date}</small>}
              </label>
              <label className="field">
                Day of the week
                <div className="day-display">
                  <CalendarDays size={17} />
                  {form.day || "Selected day appears here"}
                </div>
              </label>
              <label className="field">
                Preferred time *
                <select
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  aria-invalid={!!errors.time}
                >
                  <option value="">Choose a time window</option>
                  {siteConfig.booking.timeSlots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {errors.time && <small>{errors.time}</small>}
              </label>
              <label className="field">
                Service address / locality *
                <input
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  autoComplete="street-address"
                  placeholder="Area, street, landmark"
                  aria-invalid={!!errors.address}
                />
                {errors.address && <small>{errors.address}</small>}
              </label>
              <label className="field field-wide">
                Tell us about the issue{" "}
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="What is happening? Any details that could help…"
                />
              </label>
            </div>
            <label className="consent">
              <input id="privacy-consent" type="checkbox" />{" "}
              <span>
                I agree that my details may be used to respond to this service
                request. Read our{" "}
                <a href="/privacy-policy" target="_blank">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.consent && (
              <small className="error-line">{errors.consent}</small>
            )}
            <div className="form-actions">
              <p>
                <strong>Note:</strong> This is a request, not a confirmed
                appointment.
              </p>
              <button className="button button-dark" type="submit">
                {mode === "whatsapp"
                  ? "Continue to WhatsApp"
                  : "Submit request"}{" "}
                {mode === "whatsapp" ? (
                  <WhatsAppIcon size={18} />
                ) : (
                  <ArrowUpRight size={17} />
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
