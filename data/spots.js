// ─── CHANGE THE PASSWORD HERE ────────────────────────
const APP_PASSWORD = "jungle";
// ─────────────────────────────────────────────────────

/**
 * Konfiguration für die Telegram-Integration
 */
const TELEGRAM_BOT_TOKEN = "8844480922:AAE1L8E3-SvFxquCIcNUrI-KNGqefACBP88";
const TELEGRAM_CHAT_ID = "-1004439585716";

/**
 * Zentrale Funktion zum Senden von Nachrichten an die Telegram-Gruppe
 */
async function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: TELEGRAM_CHAT_ID, 
                text: message 
            })
        });
    } catch (error) {
        console.error("Fehler beim Senden der Telegram-Nachricht:", error);
    }
}

/**
 * Zentrale Funktion zum Senden von Fotos an die Telegram-Gruppe
 */
async function sendTelegramPhoto(photoUrl, caption) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: TELEGRAM_CHAT_ID, 
                photo: photoUrl, 
                caption: caption 
            })
        });
    } catch (error) {
        console.error("Fehler beim Senden des Telegram-Fotos:", error);
    }
}

// ─── ROUTE OPTIONS PER REGION ─────────────────────────
const ROUTE_OPTIONS = {
  haadRin: [
    { key: "starter", label: "Starter"  },
    { key: "halfDay", label: "Half Day" },
    { key: "fullDay", label: "Full Day" }
  ],
  haadYao: [
    { key: "starter", label: "Starter"  },
    { key: "halfDay", label: "Half Day" },
    { key: "fullDay", label: "Full Day" }
  ],
  mixedTour: [
    { key: "fullDay", label: "Full Day" }
  ]
};
// ─────────────────────────────────────────────────────

const spotsData = {

  // ───────────────────────────────────────────────────
  // REGION: HAAD RIN
  // ───────────────────────────────────────────────────
  haadRin: {
    bonusMessage: "",

    routes: {

      starter: [
        {
          name:     "Scooter Parking",
          time:     "15:00 – 17:00",
          comment:  "Park your scooter here and walk towards Tommy Resort.",
          mapsLink: "https://maps.app.goo.gl/PjVkpJ5FdLeDRvC3A",
          isBreak:  false
        },
        {
          name:     "Tommy Resort",
          time:     "15:00 – 17:00",
          comment:  "Start at: \"Tommy Resort\". Walk the beach until \"Emma Bar\". From here you can reach the restaurants. Split up if you are in a team. One person can cover the beach bars while the other visits the beach guests. Meet again on the way to Emma Bar.",
          mapsLink: "https://maps.app.goo.gl/VZiv8A1qYHNhoNbw8",
          isBreak:  false
        },
        {
          name:     "Emma Bar",
          time:     "15:00 – 17:00",
          comment:  "Emma Bar and Mama Schnitzel are in the same road. Street Restaurants starting from here.",
          mapsLink: "https://maps.app.goo.gl/uKdkR32dWLRvGtNt6",
          isBreak:  false
        },
        {
          name:     "Mama Schnitzel",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/p2SpWQLM9RfngAtu5",
          isBreak:  false
        },
        {
          name:     "Paprika",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/8Lwk5AELgsAYtDX49",
          isBreak:  false
        },
        {
          name:     "MoonSpoon Restaurant",
          time:     "15:00 – 17:00",
          comment:  "Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/MoonSpoon+Restaurant/@9.6767971,100.0567827,15z/data=!3m1!4b1!4m6!3m5!1s0x3054fdf775167c59:0x631a526817ca704f!8m2!3d9.6767761!4d100.067061!16s%2Fg%2F11xg5t5kgc",
          isBreak:  false
        },
        {
          name:     "Pranee Thai Food",
          time:     "15:00 – 17:00",
          comment:  "On your way to get the bike.",
          mapsLink: "https://maps.app.goo.gl/8JAsqyouZ1bbsk2W8",
          isBreak:  false
        },
        {
          name:     "Echo Hostel",
          time:     "15:00 – 17:00",
          comment:  "All tables & Bikes, walk to the beach front.",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak:  false
        },
        {
          name:     "Food Court",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak:  false
        },
        {
          name:     "Phantip Market",
          time:     "15:00 – 17:00",
          comment:  "All tables here. You may have a short break at Phantip Market. Need to leave around 17:30 to be in time for Amsterdam Bar.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  false
        },
        {
          name:     "Break",
          time:     "17:00 – 17:30",
          comment:  "Break.",
          mapsLink: "",
          isBreak:  true
        },
        {
          name:     "Amsterdam Bar",
          time:     "18:00 – 18:20",
          comment:  "Sunset Time. Upstairs & all bikes. Important: don't arrive too early or too late.",
          mapsLink: "https://maps.app.goo.gl/ev4AZmvN8mu8ZnVVA",
          isBreak:  false
        },
        {
          name:     "Break",
          time:     "18:30 – 19:00",
          comment:  "Break. You may have your break at Phantip Market.",
          mapsLink: "",
          isBreak:  true
        },
        {
          name:     "Phantip Market (Evening)",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  false
        },
        {
          name:     "Food Court (Evening)",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak:  false
        },
        {
          name:     "Nine Restaurant & Bar",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/n1QovpPWoezTqgwr5",
          isBreak:  false
        },
        {
          name:     "Kohmunity Hostel",
          time:     "19:00 – 20:00",
          comment:  "All tables, bars and bikes here.",
          mapsLink: "https://www.google.com/maps/place/Kohmunity+Hostel/@9.708192,99.9901216,15z/data=!3m1!4b1!4m9!3m8!1s0x3054fdd7d1d42587:0x43fd3556022aca8f!5m2!4m1!1i2!8m2!3d9.708171!4d100.0003999!16s%2Fg%2F11yrp_qqnn",
          isBreak:  false
        },
        {
          name:     "Wanderlust Hostel",
          time:     "19:00 – 20:00",
          comment:  "All tables and bikes.",
          mapsLink: "https://www.google.com/maps/place/The+Wanderlust+Hostel/@9.7085546,100.0023943,17z/data=!4m10!3m9!1s0x3054fd44f32e9505:0x607b0ef9c36388ca!5m3!1s2026-07-12!4m1!1i2!8m2!3d9.7085493!4d100.0049639!16s%2Fg%2F11s5brh65n?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Echo Hostel (Evening)",
          time:     "19:00 – 20:00",
          comment:  "All tables and bikes.",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak:  false
        },
        {
          name:     "Vintage Nightmarket",
          time:     "19:00 – 20:00",
          comment:  "All bikes here.",
          mapsLink: "https://www.google.com/maps/place/Night+Market,+Cafe+'Vintage/@9.6998962,100.0143571,15z/data=!3m1!4b1!4m6!3m5!1s0x3054fd3857e125bb:0x35b519b5e934bd85!8m2!3d9.6998752!4d100.0246354!16s%2Fg%2F11nfv90p6d",
          isBreak:  false
        }
      ],

      halfDay: [
        {
          name:     "Scooter Parking",
          time:     "15:00 – 17:00",
          comment:  "Park your scooter here and walk towards Tommy Resort.",
          mapsLink: "https://maps.app.goo.gl/PjVkpJ5FdLeDRvC3A",
          isBreak:  false
        },
        {
          name:     "Tommy Resort",
          time:     "15:00 – 17:00",
          comment:  "Start at: \"Tommy Resort\". Walk the beach until \"Emma Bar\". Split up if you are in a team. One person can cover the beach bars while the other visits the beach guests. Meet again on the way to Emma Bar.",
          mapsLink: "https://maps.app.goo.gl/VZiv8A1qYHNhoNbw8",
          isBreak:  false
        },
        {
          name:     "Emma Bar",
          time:     "15:00 – 17:00",
          comment:  "Emma Bar and Mama Schnitzel are in the same road.",
          mapsLink: "https://maps.app.goo.gl/uKdkR32dWLRvGtNt6",
          isBreak:  false
        },
        {
          name:     "Mama Schnitzel",
          time:     "15:00 – 17:00",
          comment:  "Street Restaurants starting from here. All tables here.",
          mapsLink: "https://maps.app.goo.gl/p2SpWQLM9RfngAtu5",
          isBreak:  false
        },
        {
          name:     "Paprika",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/8Lwk5AELgsAYtDX49",
          isBreak:  false
        },
        {
          name:     "MoonSpoon Restaurant",
          time:     "15:00 – 17:00",
          comment:  "Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/MoonSpoon+Restaurant/@9.6767761,100.067061,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fdf775167c59:0x631a526817ca704f!8m2!3d9.6767761!4d100.067061!16s%2Fg%2F11xg5t5kgc",
          isBreak:  false
        },
        {
          name:     "Pranee Thai Food",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/8JAsqyouZ1bbsk2W8",
          isBreak:  false
        },
        {
          name:     "Pick up Scooter",
          time:     "15:00 – 17:00",
          comment:  "Go and get the bike.",
          mapsLink: "",
          isBreak:  false
        },
        {
          name:     "Leela Beach",
          time:     "15:00 – 17:00",
          comment:  "Enter the beach from Cocohut Resort.",
          mapsLink: "https://maps.app.goo.gl/CdgbXxoTD9GQD8Lm7",
          isBreak:  false
        },
        {
          name:     "MBar Hostel",
          time:     "15:00 – 17:00",
          comment:  "Say hello at the reception.",
          mapsLink: "https://maps.app.goo.gl/M1fSKh5ftqcWjaKU8",
          isBreak:  false
        },
        {
          name:     "Best Restaurant",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/LwEeMK7oCNk8KtfHA",
          isBreak:  false
        },
        {
          name:     "Bt. Restaurant Koh Phangan",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/nS64DnJNYcqojBPx7",
          isBreak:  false
        },
        {
          name:     "Echo Hostel",
          time:     "15:00 – 17:00",
          comment:  "All tables & Bikes, walk to the beach front.",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak:  false
        },
        {
          name:     "Lifestyle Restaurant",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/bEvvoiahYoVi5bdDA",
          isBreak:  false
        },
        {
          name:     "Mama Restaurant",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://www.google.com/maps/place/Mama+Thai+food+%26+Drink/@9.7037051,100.0099583,18z/data=!4m10!1m2!2m1!1sMama+Restaurant!3m6!1s0x3054fd54ee3757a9:0x608704daed4f3e8!8m2!3d9.7047011!4d100.0109968!15sCg9NYW1hIFJlc3RhdXJhbnRaESIPbWFtYSByZXN0YXVyYW50kgEQYXNpYW5fcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVSbmNTMHlPRTkzRUFF4AEA-gEECAAQSQ!16s%2Fg%2F11tp2bhgrl",
          isBreak:  false
        },
        {
          name:     "Food Court",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak:  false
        },
        {
          name:     "Phantip Market",
          time:     "15:00 – 17:00",
          comment:  "All tables here. You may have a short break at Phantip Market. Need to leave around 17:30 to be in time for Amsterdam Bar.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  false
        },
        {
          name:     "Break",
          time:     "17:00 – 17:30",
          comment:  "Break.",
          mapsLink: "",
          isBreak:  true
        },
        {
          name:     "Amsterdam Bar",
          time:     "18:00 – 18:20",
          comment:  "Sunset Time. Upstairs & all Bikes. Important: don't arrive too early or too late.",
          mapsLink: "https://maps.app.goo.gl/wY8RdkKYiU8EA8mv7",
          isBreak:  false
        },
        {
          name:     "Break at Phantip Market",
          time:     "18:30 – 19:00",
          comment:  "Break at Phantip Market. Don't start the restaurants before 19:00.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  true
        },
        {
          name:     "Phantip Market (Evening)",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  false
        },
        {
          name:     "Food Court (Evening)",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak:  false
        },
        {
          name:     "No Name Restaurant",
          time:     "19:00 – 20:00",
          comment:  "Only give to customers and bikes here, no tables.",
          mapsLink: "https://www.google.com/maps/place/No+name+kitchen+Phangan/@9.7081686,99.9952509,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fcbad5a153b5:0xa1eb477e4eae1a38!8m2!3d9.7081686!4d99.9952509!16s%2Fg%2F11bw51w0kb",
          isBreak:  false
        },
        {
          name:     "Nine Restaurant & Bar",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/n1QovpPWoezTqgwr5",
          isBreak:  false
        },
        {
          name:     "Kohmunity Hostel",
          time:     "19:00 – 20:00",
          comment:  "All tables, bars and bikes here.",
          mapsLink: "https://maps.app.goo.gl/GBrxfk36gWUTm9F16",
          isBreak:  false
        },
        {
          name:     "Farida Helal Restaurant",
          time:     "19:00 – 20:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/iMy7EW7FqZB3ak3m7",
          isBreak:  false
        },
        {
          name:     "Wanderlust Hostel",
          time:     "19:00 – 20:00",
          comment:  "All tables, bars and bikes here.",
          mapsLink: "https://www.google.com/maps/place/The+Wanderlust+Hostel/@9.7085546,100.0023943,17z/data=!4m10!3m9!1s0x3054fd44f32e9505:0x607b0ef9c36388ca!5m3!1s2026-07-12!4m1!1i2!8m2!3d9.7085493!4d100.0049639!16s%2Fg%2F11s5brh65n?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Echo Hostel (Evening)",
          time:     "19:00 – 20:00",
          comment:  "All tables, bars and bikes here.",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak:  false
        },
        {
          name:     "Vintage Nightmarket",
          time:     "19:00 – 20:00",
          comment:  "Only give to customers and bikes here. Before you continue, check with the other team how far they are — if they are already at Vintage Nightmarket or close, go to Phantip Market & Food Court one more time.",
          mapsLink: "https://maps.app.goo.gl/h4d8wigEWxaGnEkw6",
          isBreak:  false
        }
      ],

      fullDay: [
        {
          name:     "Scooter Parking",
          time:     "13:00 – 15:00",
          comment:  "Park your scooter here and walk towards Tommy Resort.",
          mapsLink: "https://maps.app.goo.gl/PjVkpJ5FdLeDRvC3A",
          isBreak:  false
        },
        {
          name:     "Tommy Resort",
          time:     "13:00 – 15:00",
          comment:  "Start at: \"Tommy Resort\". Walk the beach until \"Emma Bar\". Split up if you are in a team. One person can cover the beach bars while the other visits the beach guests. Meet again on the way to Emma Bar.",
          mapsLink: "https://maps.app.goo.gl/VZiv8A1qYHNhoNbw8",
          isBreak:  false
        },
        {
          name:     "Emma Bar",
          time:     "13:00 – 15:00",
          comment:  "Check beach front zone.",
          mapsLink: "https://maps.app.goo.gl/uKdkR32dWLRvGtNt6",
          isBreak:  false
        },
        {
          name:     "Mama Schnitzel",
          time:     "13:00 – 15:00",
          comment:  "Street Restaurants starting from here. All tables here.",
          mapsLink: "https://maps.app.goo.gl/p2SpWQLM9RfngAtu5",
          isBreak:  false
        },
        {
          name:     "Paprika Restaurant",
          time:     "13:00 – 15:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/8Lwk5AELgsAYtDX49",
          isBreak:  false
        },
        {
          name:     "MoonSpoon Restaurant",
          time:     "13:00 – 15:00",
          comment:  "Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/MoonSpoon+Restaurant/@9.6767761,100.067061,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fdf775167c59:0x631a526817ca704f!8m2!3d9.6767761!4d100.067061!16s%2Fg%2F11xg5t5kgc",
          isBreak:  false
        },
        {
          name:     "Pranee Thai Food",
          time:     "13:00 – 15:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/8JAsqyouZ1bbsk2W8",
          isBreak:  false
        },
        {
          name:     "Pick up Scooter",
          time:     "13:00 – 15:00",
          comment:  "Go back to the scooter and continue with it.",
          mapsLink: "",
          isBreak:  false
        },
        {
          name:     "Israeli Bait",
          time:     "13:00 – 15:00",
          comment:  "Introduce yourself at the bar first.",
          mapsLink: "https://maps.app.goo.gl/YLUF597XP5hzu6SD6",
          isBreak:  false
        },
        {
          name:     "WET Hostel",
          time:     "13:00 – 15:00",
          comment:  "Go here only in a Full Moon week.",
          mapsLink: "https://www.google.com/maps/place/Wet!+a+Pool+Party+Hostel+by+Wild+%26+Wandering/@9.6765215,100.0623047,17z/data=!3m1!4b1!4m9!3m8!1s0x3054fcbb43862ee3:0xd1d6ba35540f2b0b!5m2!4m1!1i2!8m2!3d9.6765162!4d100.0648796!16s%2Fg%2F11b63vphq8?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Bt. Restaurant Koh Phangan",
          time:     "13:00 – 15:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/nS64DnJNYcqojBPx7",
          isBreak:  false
        },
        {
          name:     "Best Restaurant",
          time:     "13:00 – 15:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/LwEeMK7oCNk8KtfHA",
          isBreak:  false
        },
        {
          name:     "MBar Hostel",
          time:     "13:00 – 15:00",
          comment:  "Say hello at the reception.",
          mapsLink: "https://maps.app.goo.gl/M1fSKh5ftqcWjaKU8",
          isBreak:  false
        },
        {
          name:     "Leela Beach",
          time:     "13:00 – 15:00",
          comment:  "Enter the beach from Cocohut Resort.",
          mapsLink: "https://maps.app.goo.gl/CdgbXxoTD9GQD8Lm7",
          isBreak:  false
        },
        {
          name:     "Tom's Kitchen",
          time:     "15:00 – 17:00",
          comment:  "Great spot to have lunch!",
          mapsLink: "https://maps.app.goo.gl/4bRdYdK7n3Mjgz2dA",
          isBreak:  false
        },
        {
          name:     "CheeVa Beach Resort",
          time:     "15:00 – 17:00",
          comment:  "Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/CheeVa+Beach+Resort/@9.6968185,100.0289811,20.06z/data=!4m9!3m8!1s0x3054fd9555555555:0xd361fe246bc9fc5f!5m2!4m1!1i2!8m2!3d9.6969584!4d100.0292078!16s%2Fg%2F11kbt5j0f3",
          isBreak:  false
        },
        {
          name:     "Cheeva Resort (Beach Zone)",
          time:     "15:00 – 17:00",
          comment:  "Walk the beach left and right to the neighbour resorts.",
          mapsLink: "https://www.google.com/maps/place/CheeVa+Beach+Resort/@9.6969597,100.0285654,19z/data=!4m10!3m9!1s0x3054fd9555555555:0xd361fe246bc9fc5f!5m3!1s2026-07-12!4m1!1i2!8m2!3d9.6969584!4d100.0292078!16s%2Fg%2F11kbt5j0f3?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Thai Restaurants (One-Way Road)",
          time:     "15:00 – 17:00",
          comment:  "Check the small thai restaurants in the one way road.",
          mapsLink: "https://www.google.com/maps/place/One+Way+Noodle+%26+Thai+Food+Restaurant/@9.699562,100.022719,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhAoJKOgbYwKhV08o-Oeof2U!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGJ4JAGay480x7D2FOKi4srtFowXoTs1fQa6ofZ8ee6SOqJwQHgZCesgSDnjZhHRnHoo6ExNPIja9YetsJ1cLMv29SsTkAsH1sHjFd3TdykP9PDuz9v7_6BBfhaVtAF08sJarKaDHnSo8kO%3Dw203-h270-k-no!7i4284!8i5712!4m11!1m2!2m1!1sRestaurants!3m7!1s0x3054fd40a272b4ed:0xedbd65ee8a9e9c27!8m2!3d9.6994548!4d100.022735!10e5!15sCgtSZXN0YXVyYW50c1oNIgtyZXN0YXVyYW50c5IBEWZhbWlseV9yZXN0YXVyYW50mgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ4S1NtTnJVWHBqYlUwd1VtcFdabEZzVG5oVU1UbE1VakkxVTFOSVl4QULgAQD6AQQIMxBD!16s%2Fg%2F11s840722f?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Echo Hostel",
          time:     "15:00 – 17:00",
          comment:  "All tables & Bikes, walk to the beach front.",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak:  false
        },
        {
          name:     "Lifestyle Restaurant",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/bEvvoiahYoVi5bdDA",
          isBreak:  false
        },
        {
          name:     "Mama Restaurant",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://www.google.com/maps/place/Mama+Thai+food+%26+Drink/@9.7037051,100.0099583,18z/data=!4m10!1m2!2m1!1sMama+Restaurant!3m6!1s0x3054fd54ee3757a9:0x608704daed4f3e8!8m2!3d9.7047011!4d100.0109968!15sCg9NYW1hIFJlc3RhdXJhbnRaESIPbWFtYSByZXN0YXVyYW50kgEQYXNpYW5fcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVSbmNTMHlPRTkzRUFF4AEA-gEECAAQSQ!16s%2Fg%2F11tp2bhgrl",
          isBreak:  false
        },
        {
          name:     "Tiki Beach",
          time:     "15:00 – 17:00",
          comment:  "Go inside until the beach & restaurant.",
          mapsLink: "https://www.google.com/maps/place/Tiki+Beach+-+Resort,+Beach+Bar,+Restaurant,+Co-working/@9.7042264,100.0067278,17z/data=!4m10!3m9!1s0x3054fe804e1fe0cf:0xeff1c4d76e0679fe!5m3!1s2026-07-12!4m1!1i2!8m2!3d9.7042211!4d100.0067278!16s%2Fg%2F11h77pzfxq?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Wanderlust Hostel",
          time:     "15:00 – 17:00",
          comment:  "All tables, bars and bikes here.",
          mapsLink: "https://www.google.com/maps/place/The+Wanderlust+Hostel/@9.7085546,100.0023943,17z/data=!4m10!3m9!1s0x3054fd44f32e9505:0x607b0ef9c36388ca!5m3!1s2026-07-12!4m1!1i2!8m2!3d9.7085493!4d100.0049639!16s%2Fg%2F11s5brh65n?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Puks Palace",
          time:     "15:00 – 17:00",
          comment:  "Only the parking bikes outside.",
          mapsLink: "https://maps.app.goo.gl/PiSWUdXfhzSAA9Sd7",
          isBreak:  false
        },
        {
          name:     "Kohmunity Hostel",
          time:     "15:00 – 17:00",
          comment:  "All tables, bars and bikes here.",
          mapsLink: "https://maps.app.goo.gl/GBrxfk36gWUTm9F16",
          isBreak:  false
        },
        {
          name:     "Uppercut Thai Restaurant",
          time:     "15:00 – 17:00",
          comment:  "Check out the restaurant next door too.",
          mapsLink: "https://www.google.com/maps/place/Uppercut+-+Authentic+%5BMuay%5D+Thai+Food/@9.7078341,99.9966516,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fdc4ca95f3af:0xc553a1f97c731563!8m2!3d9.7078288!4d99.9966516!16s%2Fg%2F11h_k3t007?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "The Cosy",
          time:     "15:00 – 17:00",
          comment:  "Go until the beach and check the restaurant.",
          mapsLink: "https://maps.app.goo.gl/KrbCBGjuZVvJBV6GA",
          isBreak:  false
        },
        {
          name:     "Island Life Bungalows",
          time:     "15:00 – 17:00",
          comment:  "Go until the beach and check the restaurant.",
          mapsLink: "https://www.google.com/maps/place/ISLAND+LIFE+BUNGALOWS/@9.7066392,99.9955355,17z/data=!4m10!3m9!1s0x3054fd45b2b3291d:0xfd47839c81a121d5!5m3!1s2026-07-12!4m1!1i2!8m2!3d9.7066392!4d99.9955355!16s%2Fg%2F11rfr71fzj?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Food Court",
          time:     "15:00 – 17:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak:  false
        },
        {
          name:     "Phantip Market",
          time:     "15:00 – 17:00",
          comment:  "All tables here. You may have a short break at Phantip Market. Need to leave around 17:45 to be in time for Amsterdam Bar.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  false
        },
        {
          name:     "Break at Phantip Market",
          time:     "17:00 – 17:30",
          comment:  "Break at Phantip Market.",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak:  true
        },
        {
          name:     "Amsterdam Bar",
          time:     "18:00 – 18:20",
          comment:  "Sunset Time. Upstairs & Bikes. Important: don't arrive too early or too late.",
          mapsLink: "https://maps.app.goo.gl/wY8RdkKYiU8EA8mv7",
          isBreak:  false
        },
        {
          name:     "Break",
          time:     "18:30 – 19:00",
          comment:  "Break. Don't start the restaurants before 19:00.",
          mapsLink: "",
          isBreak:  true
        },
        {
          name:     "Pranee Thai Food (Evening)",
          time:     "19:00 – 21:00",
          comment:  "Leave the scooter here and walk the route from here.",
          mapsLink: "https://maps.app.goo.gl/8JAsqyouZ1bbsk2W8",
          isBreak:  false
        },
        {
          name:     "Israeli Bait (Evening)",
          time:     "19:00 – 21:00",
          comment:  "Station check.",
          mapsLink: "https://maps.app.goo.gl/YLUF597XP5hzu6SD6",
          isBreak:  false
        },
        {
          name:     "WET Hostel (Evening)",
          time:     "19:00 – 21:00",
          comment:  "Go here only in a Full Moon week. Go past the WET Hostel on the left, between the two small lakes.",
          mapsLink: "https://www.google.com/maps/place/Wet!+a+Pool+Party+Hostel+by+Wild+%26+Wandering/@9.6765215,100.0623047,17z/data=!3m1!4b1!4m9!3m8!1s0x3054fcbb43862ee3:0xd1d6ba35540f2b0b!5m2!4m1!1i2!8m2!3d9.6765162!4d100.0648796!16s%2Fg%2F11b63vphq8?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "M Bar Hostel (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables + bikes here.",
          mapsLink: "https://www.google.com/maps/place/MBAR/@9.6756359,100.0629266,17z/data=!4m10!1m2!2m1!1sMBAR!3m6!1s0x3054fd0042c6573b:0xa136b5888c3e2fa5!8m2!3d9.6756214!4d100.0654861!15sCgRNQkFSWgYiBG1iYXKSAQxjb2NrdGFpbF9iYXLgAQA!16s%2Fg%2F11lckjh6g0?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Best Restaurant (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/LwEeMK7oCNk8KtfHA",
          isBreak:  false
        },
        {
          name:     "Monnalisa",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/XXnyDqrrWzCmKgEH8",
          isBreak:  false
        },
        {
          name:     "Lucky Crab",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://www.google.com/maps/place/Lucky+crab+restaurant/@9.6748341,100.0620539,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fca4afe04c7d:0x286b2ce91148e7be!8m2!3d9.6748288!4d100.0646235!16s%2Fg%2F11hf3wgg9m?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "Bt. Restaurant koh phangan (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://www.google.com/maps/place/Bt.+Restaurant+koh+phangan/@9.674772,100.0619353,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fd8dfebdf6e3:0x2d1e9b74630bb018!8m2!3d9.6747667!4d100.0645049!16s%2Fg%2F11t9c_npbj?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D",
          isBreak:  false
        },
        {
          name:     "One Love Bar",
          time:     "19:00 – 21:00",
          comment:  "Station check.",
          mapsLink: "https://www.google.com/maps/place/One+Love+Bar/@9.6754406,100.0634337,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fcbb30d8a147:0xfafd1225f06258df!8m2!3d9.6754353!4d100.0660086!16s%2Fg%2F11df8120gq",
          isBreak:  false
        },
        {
          name:     "Mama Schnitzel (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/p2SpWQLM9RfngAtu5",
          isBreak:  false
        },
        {
          name:     "Paprika (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/8Lwk5AELgsAYtDX49",
          isBreak:  false
        },
        {
          name:     "MoonSpoon Restaurant (Evening)",
          time:     "19:00 – 21:00",
          comment:  "New stop! Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/MoonSpoon+Restaurant/@9.6767761,100.067061,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fdf775167c59:0x631a526817ca704f!8m2!3d9.6767761!4d100.067061!16s%2Fg%2F11xg5t5kgc",
          isBreak:  false
        },
        {
          name:     "Moon House bis Drop In Bar",
          time:     "19:00 – 21:00",
          comment:  "Walk down the beach and hit all the open bars.",
          mapsLink: "https://www.google.com/maps/place/Moon+House+Beach+Bar+%26+Restaurant/@9.6761217,100.0652053,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fd5018820b15:0xbd6b844e9e187593!8m2!3d9.6761164!4d100.0677802!16s%2Fg%2F11frl627s8",
          isBreak:  false
        },
        {
          name:     "Return to Scooter",
          time:     "19:00 – 21:00",
          comment:  "Go back to the scooter to continue the route.",
          mapsLink: "https://maps.app.goo.gl/8JAsqyouZ1bbsk2W8",
          isBreak:  false
        },
        {
          name:     "Tom's Kitchen (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables here.",
          mapsLink: "https://maps.app.goo.gl/4bRdYdK7n3Mjgz2dA",
          isBreak:  false
        },
        {
          name:     "Vintage Nightmarket",
          time:     "19:00 – 21:00",
          comment:  "All tables + bikes here.",
          mapsLink: "https://maps.app.goo.gl/h4d8wigEWxaGnEkw6",
          isBreak:  false
        },
        {
          name:     "Echo Hostel (Evening)",
          time:     "19:00 – 21:00",
          comment:  "All tables and bikes. Talk to the other team where they are. If 30 minutes left you can return to Haad Rin one more time for the restaurants or go and help them with their schedule.",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak:  false
        }
      ]
    }
  },

  // ───────────────────────────────────────────────────
  // REGION: HAAD YAO
  // ───────────────────────────────────────────────────
  haadYao: {
    bonusMessage: "",
    routes: {
      starter: [
        {
          name: "Wanderlust Hostel",
          time: "3:00 – 5:00 PM",
          comment: "All tables, bars and bikes here",
          mapsLink: "https://maps.app.goo.gl/zVC753YnrwDh1wfG8",
          isBreak: false
        },
        {
          name: "KohMunity Hostel",
          time: "3:00 – 5:00 PM",
          comment: "All tables, bars and bikes here",
          mapsLink: "https://maps.app.goo.gl/GBrxfk36gWUTm9F16",
          isBreak: false
        },
        {
          name: "Slumber Party Beach Hostel",
          time: "3:00 – 5:00 PM",
          comment: "Go here until during Full Moon Week",
          mapsLink: "https://maps.app.goo.gl/Yjywts639V3rAmSd7",
          isBreak: false
        },
        {
          name: "Food Court",
          time: "3:00 – 5:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak: false
        },
        {
          name: "Phantip Market",
          time: "3:00 – 5:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak: false
        },
        {
          name: "MamaKOP Restaurant",
          time: "3:00 – 5:00 PM",
          comment: "All tables here",
          mapsLink: "https://www.google.com/maps/place/MamaKOP+Restaurant/@9.7498209,99.9782256,17z/data=!3m1!4b1!4m6!3m5!1s0x305501ddd5505f4b:0x99007068c8d37f5b!8m2!3d9.7498209!4d99.9782256!16s%2Fg%2F11gb410xv8?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Shiralea Hostel",
          time: "3:00 – 5:00 PM",
          comment: "All tables and bikes",
          mapsLink: "https://maps.app.goo.gl/dWG3rAuu18VjrNUH8",
          isBreak: false
        },
        {
          name: "Break",
          time: "5:00 – 5:30 PM",
          comment: "You might have your break at 420 Bar. You need to leave around 5:30 to be in time for Zen Beach",
          mapsLink: "",
          isBreak: true
        },
        {
          name: "Zen Beach",
          time: "6:00 – 6:20 PM Sunset Time",
          comment: "Walk along the beach, dont flyer bikes here",
          mapsLink: "https://www.google.com/maps/place/Zen+Beach/@9.7577607,99.961105,17z/data=!3m1!4b1!4m6!3m5!1s0x30550113cd78e5a7:0x80ffe9ef68c02cb7!8m2!3d9.7577607!4d99.961105!16s%2Fg%2F11tsnpp6ns?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Break",
          time: "6:30 – 7:00 PM",
          comment: "Please dont start the restaurants before 7PM",
          mapsLink: "",
          isBreak: true
        },
        {
          name: "Mama Market Srithanu",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/ENJYdbBPrhtoZWx28",
          isBreak: false
        },
        {
          name: "MamaKOP Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://www.google.com/maps/place/MamaKOP+Restaurant/@9.7498209,99.9782256,17z/data=!3m1!4b1!4m6!3m5!1s0x305501ddd5505f4b:0x99007068c8d37f5b!8m2!3d9.7498209!4d99.9782256!16s%2Fg%2F11gb410xv8?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Phantip Market",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak: false
        },
        {
          name: "Food Court",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak: false
        },
        {
          name: "Farida Halal Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/iMy7EW7FqZB3ak3m7",
          isBreak: false
        },
        {
          name: "Mama Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/S5cudyg1cyLbQLCm6",
          isBreak: false
        },
        {
          name: "Lifestyle Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables all bikes",
          mapsLink: "https://maps.app.goo.gl/kc8ZhcNahkFF31PVA",
          isBreak: false
        },
        {
          name: "Vintage Nightmarket",
          time: "7:00 – 8:00 PM",
          comment: "only give to customers and bikes here no tables",
          mapsLink: "https://maps.app.goo.gl/vFJeptyeMHuRTmS39",
          isBreak: false
        }
      ],

      halfDay: [
        {
          name: "Wanderlust Hostel",
          time: "3:00 – 5:00 PM",
          comment: "All tables, bars and bikes here",
          mapsLink: "https://maps.app.goo.gl/zVC753YnrwDh1wfG8",
          isBreak: false
        },
        {
          name: "KohMunity Hostel",
          time: "3:00 – 5:00 PM",
          comment: "All tables, bars and bikes here",
          mapsLink: "https://maps.app.goo.gl/GBrxfk36gWUTm9F16",
          isBreak: false
        },
        {
          name: "Slumber Party Beach Hostel",
          time: "3:00 – 5:00 PM",
          comment: "Go here until during Full Moon Week",
          mapsLink: "https://maps.app.goo.gl/Yjywts639V3rAmSd7",
          isBreak: false
        },
        {
          name: "Food Court",
          time: "3:00 – 5:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak: false
        },
        {
          name: "Phantip Market",
          time: "3:00 – 5:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak: false
        },
        {
          name: "MamaKOP Restaurant",
          time: "3:00 – 5:00 PM",
          comment: "All tables here",
          mapsLink: "https://www.google.com/maps/place/MamaKOP+Restaurant/@9.7498209,99.9782256,17z/data=!3m1!4b1!4m6!3m5!1s0x305501ddd5505f4b:0x99007068c8d37f5b!8m2!3d9.7498209!4d99.9782256!16s%2Fg%2F11gb410xv8?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Shiralea Hostel",
          time: "3:00 – 5:00 PM",
          comment: "All tables and bikes",
          mapsLink: "https://maps.app.goo.gl/dWG3rAuu18VjrNUH8",
          isBreak: false
        },
        {
          name: "Wang Sai Resort",
          time: "3:00 – 5:00 PM",
          comment: "Enter from Wang Sai Resort Parking walk down the beach to",
          mapsLink: "https://www.google.com/maps/place/Wang+Sai+Resort/@9.7946078,99.9794312,18.34z/data=!4m9!3m8!1s0x3054fd9555555555:0xbbcdbe2761a2799d!5m2!4m1!1i2!8m2!3d9.7946569!4d99.9802805!16s%2Fg%2F12vsdrzm9?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Maehaad Island",
          time: "3:00 – 5:00 PM",
          comment: "",
          mapsLink: "https://maps.app.goo.gl/RxJCQZitgG7BFZBy7",
          isBreak: false
        },
        {
          name: "420 Club Phangan",
          time: "3:00 – 5:00 PM",
          comment: "Take the road leading up to Utopia Resort",
          mapsLink: "https://maps.app.goo.gl/VdRNr5EvqpqkzxCm9",
          isBreak: false
        },
        {
          name: "Break",
          time: "5:00 – 5:30 PM",
          comment: "You might have your break at 420 Bar. You need to leave around 5:30 to be in time for Zen Beach",
          mapsLink: "",
          isBreak: true
        },
        {
          name: "Zen Beach",
          time: "6:00 – 6:20 PM Sunset Time",
          comment: "Walk along the beach, dont flyer bikes here",
          mapsLink: "https://www.google.com/maps/place/Zen+Beach/@9.7577607,99.961105,17z/data=!3m1!4b1!4m6!3m5!1s0x30550113cd78e5a7:0x80ffe9ef68c02cb7!8m2!3d9.7577607!4d99.961105!16s%2Fg%2F11tsnpp6ns?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Break",
          time: "6:30 – 7:00 PM",
          comment: "Please dont start the restaurants before 7PM",
          mapsLink: "",
          isBreak: true
        },
        {
          name: "Mama Market Srithanu",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/ENJYdbBPrhtoZWx28",
          isBreak: false
        },
        {
          name: "MamaKOP Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://www.google.com/maps/place/MamaKOP+Restaurant/@9.7498209,99.9782256,17z/data=!3m1!4b1!4m6!3m5!1s0x305501ddd5505f4b:0x99007068c8d37f5b!8m2!3d9.7498209!4d99.9782256!16s%2Fg%2F11gb410xv8?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Phantip Market",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak: false
        },
        {
          name: "Food Court",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak: false
        },
        {
          name: "Farida Halal Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/iMy7EW7FqZB3ak3m7",
          isBreak: false
        },
        {
          name: "Mama Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/S5cudyg1cyLbQLCm6",
          isBreak: false
        },
        {
          name: "Lifestyle Restaurant",
          time: "7:00 – 8:00 PM",
          comment: "All tables all bikes",
          mapsLink: "https://maps.app.goo.gl/kc8ZhcNahkFF31PVA",
          isBreak: false
        },
        {
          name: "Vintage Nightmarket",
          time: "7:00 – 8:00 PM",
          comment: "only give to customers and bikes here no tables",
          mapsLink: "https://maps.app.goo.gl/vFJeptyeMHuRTmS39",
          isBreak: false
        }
      ],

      fullDay: [
        {
          name: "Wanderlust Hostel",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables & bikes here",
          mapsLink: "https://maps.app.goo.gl/sphBQSWuzGUtxLLA9",
          isBreak: false
        },
        {
          name: "Farida Halal Restaurant",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/iMy7EW7FqZB3ak3m7",
          isBreak: false
        },
        {
          name: "Echo Hostel",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables & bikes here",
          mapsLink: "https://maps.app.goo.gl/pZJHUfW6H8W9PqoSA",
          isBreak: false
        },
        {
          name: "Lifestyle Restaurant",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables & bikes here",
          mapsLink: "https://maps.app.goo.gl/B5xwGY5zyGghTLpb9",
          isBreak: false
        },
        {
          name: "Mama Restaurant",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/mjiPGsZq67DfuQGKA",
          isBreak: false
        },
        {
          name: "Food Factory",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "only give to customers - no tables",
          mapsLink: "https://www.google.com/maps/place/Food+Factory+Koh+Phangan/@9.7087244,100.0022606,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fc32bd60245f:0x3f6a6b8ccf2a50f1!8m2!3d9.7087244!4d100.0022606!16s%2Fg%2F11c54fh896?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Southway Coffee Bar",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/xZLHu8WxNtbMLGTz5",
          isBreak: false
        },
        {
          name: "Nine Restaurant & Bar",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/dkpY8yaBzDMJH7zX8",
          isBreak: false
        },
        {
          name: "Uppercut - Authentic Thai Food",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "Leave flyer in the spice trays on the table",
          mapsLink: "https://www.google.com/maps/place/Uppercut+-+Authentic+%5BMuay%5D+Thai+Food/@9.7078288,99.9966516,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fdc4ca95f3af:0xc553a1f97c731563!8m2!3d9.7078288!4d99.9966516!16s%2Fg%2F11h_k3t007?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Yok Krok",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "Opposite Upper Cut. Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/ยกครก+Yok+Krok+(เกาะพะงัน)/@9.7069427,99.9952151,19z/data=!4m6!3m5!1s0x3055a1a35c114f07:0x6cdca65326595045!8m2!3d9.7076852!4d99.9964788!16s%2Fg%2F11zh_v5hzb?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Food Court",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables & bikes here",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak: false
        },
        {
          name: "Phantip Market",
          time: "1:00 – 3:00 PM (Thong Sala)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak: false
        },
        {
          name: "MamaKOP Restaurant",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "All tables here",
          mapsLink: "https://www.google.com/maps/place/MamaKOP+Restaurant/@9.7498209,99.9782256,17z/data=!3m1!4b1!4m6!3m5!1s0x305501ddd5505f4b:0x99007068c8d37f5b!8m2!3d9.7498209!4d99.9782256!16s%2Fg%2F11gb410xv8?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Scene Nymph",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "Please introduce yourself politely.",
          mapsLink: "https://www.google.com/maps/place/Scene+Nymph/@9.7703839,99.9620377,17z/data=!4m6!3m5!1s0x305501eb6584f3b9:0x519cd44811e233f7!8m2!3d9.7718853!4d99.9637543!16s%2Fg%2F11kt8tc3v3?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "What's Cup Cafe",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "Don't leave flyer on the tables here",
          mapsLink: "https://maps.app.goo.gl/HTjWnj4UKtY6yFNt7",
          isBreak: false
        },
        {
          name: "Shiralea Hostel",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "All tables",
          mapsLink: "https://maps.app.goo.gl/dWG3rAuu18VjrNUH8",
          isBreak: false
        },
        {
          name: "Wang Sai Resort",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "Enter from Wang Sai Resort Parking walk down the beach to Ko Ma",
          mapsLink: "https://www.google.com/maps/place/Wang+Sai+Resort/@9.7946078,99.9794312,18.34z/data=!4m9!3m8!1s0x3054fd9555555555:0xbbcdbe2761a2799d!5m2!4m1!1i2!8m2!3d9.7946569!4d99.9802805!16s%2Fg%2F12vsdrzm9?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Koh Maa Beach",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "Walk down the Sandbank",
          mapsLink: "https://maps.app.goo.gl/RYgYutm7K2U2rA5T8",
          isBreak: false
        },
        {
          name: "420 Club Phangan",
          time: "3:00 – 5:00 PM (West Coast)",
          comment: "Take the road leading up to Utopia Resort",
          mapsLink: "https://maps.app.goo.gl/VdRNr5EvqpqkzxCm9",
          isBreak: false
        },
        {
          name: "Break",
          time: "5:00 – 5:30 PM",
          comment: "Have your break around Mama Market in Srithanu",
          mapsLink: "",
          isBreak: true
        },
        {
          name: "Zen Beach",
          time: "6:00 – 6:20 PM (Sunset Time)",
          comment: "Walk along the beach, dont flyer bikes here",
          mapsLink: "https://www.google.com/maps/place/Zen+Beach/@9.7577607,99.961105,17z/data=!3m1!4b1!4m6!3m5!1s0x30550113cd78e5a7:0x80ffe9ef68c02cb7!8m2!3d9.7577607!4d99.961105!16s%2Fg%2F11tsnpp6ns?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Break",
          time: "6:30 – 7:00 PM",
          comment: "Please dont start the restaurants before 7PM",
          mapsLink: "",
          isBreak: true
        },
        {
          name: "Mama Market Srithanu",
          time: "7:00 – 7:30 PM (Srithanu)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/ENJYdbBPrhtoZWx28",
          isBreak: false
        },
        {
          name: "Gummy Bear",
          time: "7:00 – 7:30 PM (Srithanu)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/HAcxPPwW7nbthf6W8",
          isBreak: false
        },
        {
          name: "Pum Pui Restaurant",
          time: "7:00 – 7:30 PM (Srithanu)",
          comment: "only give to customers no tables here",
          mapsLink: "https://maps.app.goo.gl/TtpfvFuwZc1HM5av5",
          isBreak: false
        },
        {
          name: "MamaKOP Restaurant",
          time: "7:00 – 7:30 PM (Srithanu)",
          comment: "All tables here",
          mapsLink: "https://www.google.com/maps/place/MamaKOP+Restaurant/@9.7498209,99.9782256,17z/data=!3m1!4b1!4m6!3m5!1s0x305501ddd5505f4b:0x99007068c8d37f5b!8m2!3d9.7498209!4d99.9782256!16s%2Fg%2F11gb410xv8?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Phantip Market",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/A9Wi4h1RXE4rU11V6",
          isBreak: false
        },
        {
          name: "Food Court",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables here",
          mapsLink: "https://maps.app.goo.gl/5owTkq9XnjZFJUxm8",
          isBreak: false
        },
        {
          name: "No Name Kitchen",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "only give to customers",
          mapsLink: "https://www.google.com/maps/place/No+name+kitchen+Phangan/@9.7081686,99.9952509,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fcbad5a153b5:0xa1eb477e4eae1a38!8m2!3d9.7081686!4d99.9952509!16s%2Fg%2F11bw51w0kb?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Kohmunity Hostel",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables all bikes",
          mapsLink: "https://maps.app.goo.gl/GBrxfk36gWUTm9F16",
          isBreak: false
        },
        {
          name: "Food Factory",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables",
          mapsLink: "https://www.google.com/maps/place/Food+Factory+Koh+Phangan/@9.7087244,100.0022606,17z/data=!3m1!4b1!4m6!3m5!1s0x3054fc32bd60245f:0x3f6a6b8ccf2a50f1!8m2!3d9.7087244!4d100.0022606!16s%2Fg%2F11c54fh896?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Ammy Thai Food",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables",
          mapsLink: "https://maps.app.goo.gl/SjaARuasBSyWMwF8A",
          isBreak: false
        },
        {
          name: "Wanderlust Hostel",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables and bikes. Before you continue, check with the other team how far they are. If they are already at Vintage Nightmarket or close, then turn around and to Phantip Market & Food Court one more time.",
          mapsLink: "https://maps.app.goo.gl/Ya96KCwASwkV4yHS9",
          isBreak: false
        },
        {
          name: "Farida Halal Restaurant",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables",
          mapsLink: "https://maps.app.goo.gl/iMy7EW7FqZB3ak3m7",
          isBreak: false
        },
        {
          name: "Mama Restaurant",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables",
          mapsLink: "https://maps.app.goo.gl/S5cudyg1cyLbQLCm6",
          isBreak: false
        },
        {
          name: "Lifestyle Restaurant",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables all bikes",
          mapsLink: "https://maps.app.goo.gl/kc8ZhcNahkFF31PVA",
          isBreak: false
        },
        {
          name: "At Chiang Mai Restaurant",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables",
          mapsLink: "https://www.google.com/maps/place/At+Chiang+Mai/@9.7009888,100.0159076,17z/data=!4m6!3m5!1s0x3054fd57f600188b:0x5a3ae4656dc12b7c!8m2!3d9.7015281!4d100.0175169!16s%2Fg%2F11td0mp3cw?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
          isBreak: false
        },
        {
          name: "Echo Hostel",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All tables and bikes",
          mapsLink: "https://maps.app.goo.gl/z2KDgS5bSVVgaomx8",
          isBreak: false
        },
        {
          name: "Vintage Nightmarket",
          time: "8:00 – 9:00 PM (Thong Sala / Baan Tai)",
          comment: "All bikes here",
          mapsLink: "https://maps.app.goo.gl/h4d8wigEWxaGnEkw6",
          isBreak: false
        }
      ]
    }
  },

  // ───────────────────────────────────────────────────
  // REGION: MIXED TOUR
  // ───────────────────────────────────────────────────
  mixedTour: {
    bonusMessage: "🎉 Free entry to the party tonight – you've earned it!",
    routes: { fullDay: [] }
  }

};
