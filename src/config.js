export const WHATSAPP_NUMBER = '5538993083859'

export const CONTACT = {
  phone: '(38) 99308-3859',
  email: 'contato@lopesemoura.com.br',
  address: 'Av. das Nações, 1234 - Centro, São Paulo - SP',
  hours: 'Seg a Sex: 9h às 18h | Sáb: 9h às 13h',
}

// Endereço usado no mapa (altere para o seu endereço real)
export const MAPS_QUERY = CONTACT.address

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildMapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`
}