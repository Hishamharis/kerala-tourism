import html2canvas from 'html2canvas';

export async function exportItinerary(element) {
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: '#0A0F0A',
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const link = document.createElement('a');
  link.download = `kerala-itinerary-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function shareItinerary(itinerary) {
  const encoded = btoa(JSON.stringify(itinerary));
  const url = `${window.location.origin}?itinerary=${encoded}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    return true;
  }
  return false;
}
