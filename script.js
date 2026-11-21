const events = [
 {id:1,title:"AI & Coding Workshop",date:"2026-12-03",club:"Coding Club",category:"Technology",venue:"Computer Lab 2",description:"A beginner-friendly session exploring AI tools and coding basics."},
 {id:2,title:"Campus Photography Walk",date:"2026-12-05",club:"Photography Club",category:"Creative",venue:"Main Campus",description:"Discover composition and capture beautiful campus moments."},
 {id:3,title:"Cultural Fest Auditions",date:"2026-12-08",club:"Cultural Club",category:"Arts & Culture",venue:"Auditorium",description:"Showcase your talent in dance, music, theatre, and more."},
 {id:4,title:"Friendly Football Match",date:"2026-12-10",club:"Sports Club",category:"Sports",venue:"College Ground",description:"Join a friendly match and meet fellow sports enthusiasts."},
 {id:5,title:"Build-a-Bot Meetup",date:"2026-12-12",club:"Robotics Club",category:"Technology",venue:"Innovation Lab",description:"Learn about robotics ideas and collaborate on mini-projects."},
 {id:6,title:"Green Campus Drive",date:"2026-12-15",club:"Eco Club",category:"Environment",venue:"Campus Garden",description:"Take part in a campus clean-up and sustainability activity."}
];
const storageKey="campusConnectRegistrations";
let registrations=JSON.parse(localStorage.getItem(storageKey)||"[]");
const eventGrid=document.getElementById("eventGrid");
const searchInput=document.getElementById("searchInput");
const categoryFilter=document.getElementById("categoryFilter");
function prettyDate(date){return new Date(date+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});}
function renderEvents(){
 const search=searchInput.value.toLowerCase().trim(), category=categoryFilter.value;
 const filtered=events.filter(e=>(category==="all"||e.category===category)&&[e.title,e.club,e.category,e.venue].join(" ").toLowerCase().includes(search));
 eventGrid.innerHTML=filtered.map(e=>`<article class="event-card"><div class="event-top"><span class="event-date">${prettyDate(e.date)}</span><span class="tag">${e.category}</span></div><h3>${e.title}</h3><p>${e.description}</p><div class="event-meta">📍 ${e.venue} · ${e.club}</div><button class="register-btn ${registrations.includes(e.id)?"registered":""}" onclick="toggleRegistration(${e.id})">${registrations.includes(e.id)?"Registered ✓ · Cancel":"Register for event"}</button></article>`).join("")||'<p class="empty-state">No events match your search. Try another keyword or category.</p>';
}
function toggleRegistration(id){
 if(registrations.includes(id)) registrations=registrations.filter(x=>x!==id); else registrations.push(id);
 localStorage.setItem(storageKey,JSON.stringify(registrations));renderEvents();renderRegistrations();
}
function renderRegistrations(){
 const box=document.getElementById("registrationList"),joined=events.filter(e=>registrations.includes(e.id));
 box.innerHTML=joined.length?joined.map(e=>`<div class="registration-item"><div><strong>${e.title}</strong><small>${prettyDate(e.date)} · ${e.venue}</small></div><button class="cancel-btn" onclick="toggleRegistration(${e.id})">Cancel</button></div>`).join(""):'<p class="empty-state">You haven\'t registered for any events yet. Explore events above!</p>';
}
searchInput.addEventListener("input",renderEvents);categoryFilter.addEventListener("change",renderEvents);
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("open")));
renderEvents();renderRegistrations();
