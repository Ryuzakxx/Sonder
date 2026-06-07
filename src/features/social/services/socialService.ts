import type { FeedItem, TimelineItem } from "../types/social";

export async function getFeedItems(): Promise<FeedItem[]> {
  return [
    {
      id: "night-roads-review",
      actor: {
        name: "Marco",
        avatar: {
          src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
          alt: "Avatar Marco"
        }
      },
      action: "ha recensito un album",
      mediaTitle: "Night Roads",
      category: "music",
      rating: "5/5",
      text: "Un album che sembra guidare alle 2:17, con sintetizzatori morbidi e una malinconia lucidissima.",
      artwork: {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=82",
        alt: "Copertina di un album notturno"
      },
      reactions: ["24 reazioni", "Salva", "Consiglia"]
    },
    {
      id: "elden-vale-completed",
      actor: {
        name: "Nika",
        avatar: {
          src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=180&q=80",
          alt: "Avatar Nika"
        }
      },
      action: "ha completato un gioco",
      mediaTitle: "Elden Vale",
      category: "game",
      rating: "96",
      text: "Settantadue ore, quattro finali, una mappa piena di silenzi. Lo metto tra i giochi piu immersivi di sempre.",
      artwork: {
        src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=82",
        alt: "Videogioco fantasy immersivo"
      },
      reactions: ["Aggiunto a lista", "12 commenti"]
    }
  ];
}

export async function getTimelineItems(): Promise<TimelineItem[]> {
  return [
    { id: "solar-atlas", label: "Ha segnato Solar Atlas come completato", time: "ora" },
    { id: "open-windows", label: "Ha creato Canzoni per finestre aperte", time: "2h" },
    { id: "stats-collapse", label: "Ha compresso la sezione Statistiche", time: "4h" }
  ];
}
