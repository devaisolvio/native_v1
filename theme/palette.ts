
export const PALETTE = {
  
  "bg-mint-50": "#E9F3EE",       
  "bg-peach-200": "#F6D7CF",     

  // surfaces
  "surface-overlay": "rgba(255, 255, 255, 0.70)",

  // text
  "text-primary": "#404040",    
  "text-muted": "#737373",       

  // buttons
  "btn-primary-bg": "#FFFFFF",
  "btn-primary-text": "#404040",
  "btn-ghost-bg": "rgba(255, 255, 255, 0.70)",
  "btn-ghost-icon": "#404040",

  // optional accents
  "accent-indigo-500": "#5C7CFA",
  "danger-red-500": "#EF4444",
  "success-green-500": "#10B981",
    // screen background (sand / warm off-white)
  "bg-sand-50": "#F5EFE8",

  // card backgrounds
  "card-bg": "#FFFFFF",

  // promo banner dark navy
  "promo-navy": "#1F2A37",

  // borders / dividers
  "divider": "rgba(0,0,0,0.06)",

  // icon muted
  "icon-muted": "#6B7280",
} as const;

export type ColorToken = keyof typeof PALETTE;


export const color = (token: ColorToken) => PALETTE[token];
