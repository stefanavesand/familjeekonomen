declare global {interface Window {google?: any}}
const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID || '727527079027-421tg7s70u0dtcap7rp2g2gm2kuhj430.apps.googleusercontent.com';
export const spreadsheetId=import.meta.env.VITE_SPREADSHEET_ID || '12PNAc0RkIS-5_np2hp-f4U2vFtnkZuyKL8d5bq8sU3A';
let token='',expires=0;
function load(src:string){return new Promise<void>((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=()=>resolve();s.onerror=()=>reject(new Error('Kunde inte ladda Google.'));document.head.append(s);});}
export async function prepare(){await load('https://accounts.google.com/gsi/client');}
export function login(silent=false){return new Promise<void>((resolve,reject)=>{window.google.accounts.oauth2.initTokenClient({client_id:clientId,scope:'https://www.googleapis.com/auth/spreadsheets',callback:(r:any)=>{if(r.error||!r.access_token){reject(new Error(r.error||'Inloggningen misslyckades'));return;}token=r.access_token;expires=Date.now()+Number(r.expires_in)*1000;localStorage.setItem('familjeekonomen-session','1');resolve();},error_callback:(e:any)=>reject(new Error(e.type||'Inloggning avbruten'))}).requestAccessToken({prompt:silent?'':'select_account'});});}
export function logout(){localStorage.removeItem('familjeekonomen-session');if(token)window.google?.accounts.oauth2.revoke(token,()=>{});token='';expires=0;}
function active(){if(!token||Date.now()>=expires)throw new Error('Sessionen har upphört. Logga in igen.');return token;}
async function request(id:string,path:string,init:RequestInit={}){const r=await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+encodeURIComponent(id)+path,{...init,cache:'no-store',headers:{Authorization:'Bearer '+active(),'Content-Type':'application/json'}});if(!r.ok){if(r.status===401){token='';expires=0;}throw new Error('Google Sheets: '+r.status+' '+(r.status===403?'Kontrollera filbehörighet och API-konfiguration.':r.status===401?'Logga in igen.':'Försök igen.'));}return r.json();}
export async function read(id:string,range:string):Promise<any[][]>{return (await request(id,'/values/'+encodeURIComponent(range)+'?valueRenderOption=UNFORMATTED_VALUE')).values||[];}
export async function write(id:string,range:string,values:string[][]){return request(id,'/values/'+encodeURIComponent(range)+'?valueInputOption=RAW',{method:'PUT',body:JSON.stringify({range,values})});}

export function hasSession(){return localStorage.getItem('familjeekonomen-session')==='1';}
