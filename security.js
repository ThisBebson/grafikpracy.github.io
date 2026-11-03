"use strict";
const Security=(()=>{
 const RECORD='grafik-secure-v2',OLD='grafik-pracy-v1', RATE='grafik-last-rate';
 const enc=new TextEncoder(),dec=new TextDecoder();let key=null,record=null,timeout=null;
 const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b)));
 const un64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 const random=n=>crypto.getRandomValues(new Uint8Array(n));
 const derive=async(pass,salt)=>crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:310000,hash:'SHA-256'},await crypto.subtle.importKey('raw',enc.encode(pass),'PBKDF2',false,['deriveKey']),{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
 const encrypt=async(data,k)=>{const iv=random(12);return {iv:b64(iv),data:b64(await crypto.subtle.encrypt({name:'AES-GCM',iv},k,enc.encode(JSON.stringify(data))))}};
 const decrypt=async(box,k)=>JSON.parse(dec.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:un64(box.iv)},k,un64(box.data))));
 const check=x=>x&&x.version===2&&typeof x.salt==='string'&&x.box&&typeof x.box.iv==='string'&&typeof x.box.data==='string';
 const lock=()=>{key=null;clearTimeout(timeout);document.body.classList.add('locked');document.getElementById('auth').hidden=false;document.getElementById('password').value='';document.getElementById('confirmPassword').value='';document.getElementById('authError').textContent='';const setup=!localStorage.getItem(RECORD);document.getElementById('authTitle').textContent=setup?'Zabezpiecz swój grafik':'Odblokuj grafik';document.getElementById('authInfo').textContent=setup?'Utwórz hasło (minimum 10 znaków). Zapamiętaj je — nie da się go odzyskać.':'Wpisz hasło, aby odszyfrować grafik na tym urządzeniu.';document.getElementById('confirmWrap').hidden=!setup;document.getElementById('authSubmit').textContent=setup?'Utwórz zabezpieczenie':'Odblokuj';};
 const touch=()=>{if(!key)return;clearTimeout(timeout);timeout=setTimeout(lock,5*60*1000)};
 const save=async(data)=>{if(!key||!record)throw Error('Aplikacja zablokowana');const box=await encrypt(data,key);const updated={...record,box};localStorage.setItem(RECORD,JSON.stringify(updated));record=updated;touch()};
 const init=async(onData)=>{
  if(!crypto.subtle||!window.isSecureContext){document.getElementById('authInfo').textContent='Wymagane HTTPS (GitHub Pages) lub localhost — szyfrowanie jest niedostępne.';document.getElementById('authSubmit').disabled=true;return}
  try{const raw=localStorage.getItem(RECORD);if(raw){record=JSON.parse(raw);if(!check(record))throw Error('Uszkodzony zapis');}}catch{document.getElementById('authInfo').textContent='Nieprawidłowy lub uszkodzony zapis. Nie usuwaj danych — spróbuj odzyskać kopię.';document.getElementById('authSubmit').disabled=true;return}
  lock();document.getElementById('authForm').onsubmit=async e=>{e.preventDefault();const pass=document.getElementById('password').value,err=document.getElementById('authError'),button=document.getElementById('authSubmit');err.textContent='';button.disabled=true;
   try{let data=[];if(!record){if(pass.length<10)throw Error('Hasło musi mieć co najmniej 10 znaków.');if(pass!==document.getElementById('confirmPassword').value)throw Error('Hasła się różnią.');const salt=random(16);key=await derive(pass,salt);record={version:2,salt:b64(salt),box:await encrypt([],key)};localStorage.setItem(RECORD,JSON.stringify(record));const old=localStorage.getItem(OLD);if(old){try{const parsed=JSON.parse(old);if(Array.isArray(parsed)){data=parsed;await save(data);localStorage.removeItem(OLD);}}catch{err.textContent='Uwaga: nie udało się przenieść starych danych.'}}localStorage.removeItem(RATE);
   }else{key=await derive(pass,un64(record.salt));data=await decrypt(record.box,key);if(!Array.isArray(data))throw Error('Nieprawidłowe dane.');}
   document.getElementById('auth').hidden=true;document.body.classList.remove('locked');onData(data);touch();
   }catch(ex){key=null;err.textContent=record?'Błędne hasło lub uszkodzone dane. '+(ex.message==='Hasła się różnią.'?ex.message:''):ex.message;}
   finally{button.disabled=false;document.getElementById('password').value='';document.getElementById('confirmPassword').value='';}
  };
  ['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,touch,{passive:true}));document.addEventListener('visibilitychange',()=>{if(document.hidden&&key){clearTimeout(timeout);timeout=setTimeout(lock,60*1000)}else if(!document.hidden&&key&&!timeout)touch()});
 };
 const backup=()=>{if(!record||!key)throw Error('Zablokowano');return JSON.stringify({format:'grafik-pracy-encrypted-backup',...record},null,2)};
 const restore=async(raw,pass)=>{const obj=JSON.parse(raw);if(obj.format!=='grafik-pracy-encrypted-backup'||!check(obj))throw Error('Niepoprawny format kopii');const k=await derive(pass,un64(obj.salt));const data=await decrypt(obj.box,k);if(!Array.isArray(data)||data.some(x=>!x||typeof x.date!=='string'||typeof x.start!=='string'||typeof x.end!=='string'||typeof x.id!=='string'))throw Error('Nieprawidłowa zawartość kopii');localStorage.setItem(RECORD,JSON.stringify({version:2,salt:obj.salt,box:obj.box}));record={version:2,salt:obj.salt,box:obj.box};key=k;touch();return data};
 return {init,save,lock,backup,restore,touch};
})();
