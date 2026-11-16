(() => {
"use strict";
const data=window.PETLINK_DATA;
if(!data?.pet){document.body.innerHTML="<p>No se encontró pet-data.js junto a index.html.</p>";return;}
const $=id=>document.getElementById(id),set=(id,v)=>{if($(id))$(id).textContent=v??"";};
const pet=data.pet,copy=data.copy||{};
document.title=`${pet.name||"Mascota"} · ${data.brand||"PETLINK"}`;
const values={statusText:data.status,identifiedText:copy.petIdentified,heroEyebrow:copy.heroEyebrow,petName:pet.name,petMessage:pet.message,petBreed:pet.breed,petAge:pet.age,petSex:pet.sex,familyEyebrow:copy.familyEyebrow,familyTitle:copy.familyTitle,familyMessage:pet.familyMessage,careEyebrow:copy.careEyebrow,careTitle:copy.careTitle,contactEyebrow:copy.contactEyebrow,contactTitle:copy.contactTitle,contactDescription:copy.contactDescription,whatsappButtonText:copy.whatsappButton,locationButtonText:copy.locationButton,privacyText:copy.privacy,contactSection:copy.contactSection,contactName:pet.contactName,contactNote:pet.contactNote,footerText:copy.footer,footerNote:copy.footerNote};
Object.entries(values).forEach(([k,v])=>set(k,v));
$("petPhoto").src=pet.photo||"";$("petPhoto").alt=pet.photoAlt||`Fotografía de ${pet.name}`;
const phone=String(pet.whatsapp||"").replace(/\D/g,"");
const message=(pet.whatsappMessage||`Hola, encontré a ${pet.name}.`).replaceAll("{nombre}",pet.name||"tu mascota");
$("whatsappLink").href=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
(pet.care||[]).forEach(item=>{const a=document.createElement("article");a.className=`care-item${item.type==="warning"?" allergy":""}`;
const icon=document.createElement("span");icon.className="care-symbol";const i=document.createElement("i");i.dataset.lucide=item.icon||"info";icon.append(i);
const wrap=document.createElement("div"),title=document.createElement("strong"),p=document.createElement("p");title.textContent=item.title||"";p.textContent=item.text||"";wrap.append(title,p);a.append(icon,wrap);$("careGrid").append(a);});
if(pet.lost){document.querySelector(".live-pill").classList.add("lost-pill");set("identifiedText","MASCOTA EXTRAVIADA");set("familyTitle","¡Estoy buscando a mi familia!");}
if(window.lucide)lucide.createIcons();
const reveals=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){reveals.forEach(e=>e.classList.add("will-reveal"));const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});reveals.forEach(e=>observer.observe(e));}else reveals.forEach(e=>e.classList.add("is-visible"));
const toast=msg=>{const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2800);};
$("sharePage").addEventListener("click",async()=>{try{if(navigator.share)await navigator.share({title:document.title,text:`Conoce a ${pet.name}`,url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);toast("Enlace copiado.");}else toast("Copia el enlace desde tu navegador.");}catch(e){if(e.name!=="AbortError")toast("No fue posible compartir.");}});
$("shareLocation").addEventListener("click",()=>{if(!navigator.geolocation){toast("Este navegador no permite compartir ubicación.");return;}const b=$("shareLocation");b.disabled=true;navigator.geolocation.getCurrentPosition(pos=>{const map=`https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message+"\n\nUbicación donde vi a "+pet.name+": "+map)}`,"_blank","noopener");b.disabled=false;},()=>{toast("No se obtuvo la ubicación. Puedes contactar a la familia por WhatsApp.");b.disabled=false;},{enableHighAccuracy:true,timeout:12000,maximumAge:0});});
})();