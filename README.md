# Familjeekonomen

Mobilanpassad PWA för familjens transaktionsgranskning i Google Sheets. Ingen egen backend och inga ekonomiska uppgifter i repot.

## Lokal utveckling

Kopiera `.env.example` till `.env.local`, fyll i Google Picker API-nyckeln och Google Cloud-projektets nummer. Installera med `npm install` och starta med `npm run dev`. Google OAuth måste tillåta `http://localhost:5173`. Förhandsgranska produktionsbygget med `npm run build` och `npm run preview` (registrera även preview-origin om den används för autentisering).

## Google

Aktivera Sheets, Drive och Picker API. Lägg till testanvändarna. OAuth-klienten använder Google Identity Services tokenmodell med `drive.file`, och Picker väljer den befintliga filen. API-nyckeln måste vara begränsad till Picker och till appens webbdomäner. Använd inte en client secret i klienten. Dela kalkylarket med respektive användare som redigerare. Vid hosting, registrera den exakta HTTPS-originen i Google Cloud.

## Datamodell

Appen läser `Granskning` (A:J), `Transaktioner` (A:O), `Kostnadstyper` och `Projekt`. Wallet-ID kopplar ihop rader. Appen skriver bara granskningssvar i E:H och lämnar klassificering till Familjeekonomen. En rad märkt Åtgärdad är låst i appen. Innan en skrivning kontrolleras Wallet-ID och befintliga värden igen för att minska risken för felrad eller överskrivning. Det är inte en atomär låsning; undvik samtidiga ändringar av samma rad.

## Integritet

Tokens och ekonomiska uppgifter finns endast i minnet; inga transaktioner i offline-cache. Appskalet kan installeras som PWA. Åtkomst styrs av Googles filbehörigheter; ett filter på betalare är inte en säkerhetsgräns. Ingen användardata skickas till en egen tjänst. Använd HTTPS i produktion och dela endast med behöriga personer.

## Status

v0.1: första granskningsklienten. Live OAuth och test mot ett separat testkalkylark måste verifieras före användning med riktiga data.
