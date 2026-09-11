import { buildWhatsAppLink } from '../config'
import './WhatsAppButton.css'

const WhatsAppIcon = (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.49 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35zM12.05 21.79h-.01a9.8 9.8 0 0 1-5-1.36l-.36-.21-3.7.97.99-3.6-.23-.38a9.76 9.76 0 1 1 8.31 4.58z"/>
    <path d="M12.05 0A12.05 12.05 0 0 0 2.5 18.14L0 24l6-1.57A12.05 12.05 0 1 0 12.05 0zm0 22.07c-2.77 0-5.35-.94-7.42-2.53l-.53-.37-3.56.93.95-3.47-.35-.54A10.04 10.04 0 1 1 12.05 22.07z"/>
  </svg>
)

export default function WhatsAppButton() {
  return (
    <a
      className="wa-float"
      href={buildWhatsAppLink('Olá! Vim pelo site da Lopes & Moura e gostaria de atendimento.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale com a gente no WhatsApp"
      title="Fale com a gente no WhatsApp"
    >
      {WhatsAppIcon}
    </a>
  )
}