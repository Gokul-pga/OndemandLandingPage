type WhatsAppIconProps = {
  size?: number;
};

export default function WhatsAppIcon({ size = 18 }: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="16" r="15" fill="#25D366" />
      <path d="M8.2 23.5 9.5 19a10 10 0 1 1 3.5 3.4l-4.8 1.1Z" fill="#fff" />
      <path
        d="M13.1 11.4c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.3 2.5 4 6.1 5.4 3 .1 3.6 0 4.2-.3.7-.3 2.1-.9 2.4-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5l-2.4-1.2c-.3-.1-.6-.2-.8.2l-1.1 1.3c-.2.2-.4.3-.7.1a9.2 9.2 0 0 1-4.5-3.9c-.3-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7l-1.1-2.5Z"
        fill="#25D366"
      />
    </svg>
  );
}
