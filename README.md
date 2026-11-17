# Familjeekonomen

Mobilanpassad PWA för familjens transaktionsgranskning i Google Sheets. Ingen egen backend och inga ekonomiska uppgifter i repot.

## Lokal utveckling

Standardkonfigurationen har OAuth Client ID och Familjebudgets kalkylarks-ID. Kopiera `.env.example` till `.env.local` om du vill använda andra värden. Installera med `npm install` och starta med `npm run dev`. Google OAuth måste tillåta `http://localhost:5173`. Förhandsgranska produktionsbygget med `npm run build` och `npm run preview` (registrera även preview-origin om den används för autentisering).

## Google

Aktivera Google Sheets API. Lägg till testanvändarna och behörigheten `https://www.googleapis.com/auth/spreadsheets` under Google Auth Platform → Data Access. OAuth använder Google Identity Services tokenmodell. Ingen API-nyckel, Picker eller client secret krävs. Behörigheten omfattar användarens kalkylark, men appen anropar endast det konfigurerade kalkylarket. Dela det privat med respektive användare som redigerare. Registrera `https://stefanavesand.github.io` och `http://localhost:5173` som Authorized JavaScript origins. Redirect URIs lämnas tomt.

## Datamodell

Appen läser huvudtabellen `Transaktioner` (A:W), `Kostnadstyper` och `Projekt`. Granskningsstatus och svar ligger i P:W. Wallet-ID är stabil identifierare. Skrivning kontrollerar Wallet-ID, tidigare svar och status innan P:W uppdateras. Detta är inte atomärt; undvik samtidiga ändringar av samma rad. Åtgärdade rader är skrivskyddade i appen. En lokal markering om tidigare inloggning används för att begära ny Google-token med återanslutning; en kortlivad token sparas i sessionStorage för att överleva omladdning i samma flik. Vid utgången token eller ny flik krävs återanslutning. Utloggning rensar sessionsdata.

## Integritet

Ekonomiska uppgifter finns endast i minnet; kortlivad token i sessionStorage. Inga transaktioner i offline-cache. Appskalet kan installeras som PWA. Åtkomst styrs av Googles filbehörigheter; ett filter på betalare är inte en säkerhetsgräns. Ingen användardata skickas till en egen tjänst. Använd HTTPS i produktion och dela endast med behöriga personer.

## Status

v0.3: granskning direkt i huvudtabellen, mobilgränssnitt och förenklad återanslutning. Live OAuth och test mot ett separat testkalkylark måste verifieras före användning med riktiga data.

## GitHub Pages

I repository Settings → Pages → Build and deployment, välj Source: GitHub Actions. Kör workflowen Deploy PWA (eller pusha till main). Efter lyckad publicering: https://stefanavesand.github.io/familjeekonomen/. Källkoden är offentlig, men kalkylarket är privat. Kalkylarks-ID och OAuth Client ID är publika identifierare, inte åtkomstnycklar.
