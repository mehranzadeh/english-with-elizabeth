const APP_VERSION='V9';
const lessons=[
{title:"Elizabeth Banks: “always ask for what you want”",type:"publisher",url:"https://abcnews.com/video/122009379/",source:"ABC News / Good Morning America",goal:"Advice + professional English",vocab:["opportunity","confidence","career","role","ask"],expr:["I learned that...","You have to...","I always ask for..."],shadow:"I learned that you have to ask for what you want.",q:"What would you ask for if you were more confident?",prompts:[["00:00","Listen for how Elizabeth explains a career lesson."],["00:40","Notice the way she gives a reason for her opinion."],["01:30","Repeat one complete answer with natural intonation."]]},
{title:"Elizabeth Banks and Matthew Macfadyen — The Miniature Wife",type:"publisher",url:"https://abcnews.com/video/132044195/",source:"ABC News",goal:"Current conversational English",vocab:["relationship","challenge","series","balance","experience"],expr:["It was interesting because...","I had to...","We wanted to..."],shadow:"It was interesting because the relationship changes.",q:"What makes a relationship interesting in a story?",prompts:[["00:00","Listen for vocabulary about the new series."],["01:00","Notice how the speakers explain a complicated idea simply."],["02:00","Shadow one answer using the same rhythm."]]},
{title:"Elizabeth Banks on Giving Her Sons the Sex Talk and Working with Huge Props",type:"publisher",url:"https://abc.com/video/7763bbfc-d012-4243-875f-72583169a4e5/playlist/PL5523099034",source:"Jimmy Kimmel Live! / ABC",goal:"Natural conversation + humor",vocab:["children","props","comfortable","question","funny"],expr:["It's funny because...","We decided to...","It turns out..."],shadow:"It's funny because the situation is unexpected.",q:"Tell me about an unexpected situation.",prompts:[["00:00","Listen for informal conversational phrases."],["03:00","Notice how a story is built around a funny detail."],["06:00","Shadow a short answer with the same pace."]]},
{title:"3 Ridiculous Questions with Elizabeth Banks",type:"publisher",url:"https://abc.com/video/3fee4d59-cf9f-4929-9b33-314a889f4c9e",source:"Jimmy Kimmel Live! / ABC",goal:"Fast informal English + humor",vocab:["ridiculous","question","answer","reaction","funny"],expr:["I can't believe...","That's a good question.","I would probably..."],shadow:"That's a good question. I would probably...",q:"How would you answer a ridiculous question?",prompts:[["00:00","Listen for quick question-and-answer exchanges."],["00:40","Notice short natural responses."],["01:10","Shadow one response without pausing."]]},
{title:"Elizabeth Banks talks new whodunnit ‘The Better Sister’",type:"publisher",url:"https://abcnews.com/video/122062162/",source:"ABC News",goal:"Storytelling + descriptive English",vocab:["whodunnit","friendship","mystery","family","drama"],expr:["The interesting thing is...","What I loved was...","It was challenging because..."],shadow:"The interesting thing is the way the story develops.",q:"What kind of mystery story do you enjoy?",prompts:[["00:00","Listen for descriptive vocabulary about the series."],["01:00","Notice how Elizabeth describes a character."],["02:00","Shadow a sentence with expressive intonation."]]},
{title:"Jessica Biel and Elizabeth Banks discuss ‘The Better Sister’",type:"publisher",url:"https://abcnews.com/video/121983324/",source:"ABC News",goal:"Two-speaker listening + turn-taking",vocab:["co-star","sister","character","dynamic","scene"],expr:["We worked together...","What I liked was...","I agree with..."],shadow:"What I liked was working together.",q:"Is it easier to learn English from one speaker or two?",prompts:[["00:00","Listen for speaker changes."],["01:00","Notice agreement and follow-up phrases."],["02:00","Shadow one speaker's short response."]]},
{title:"Under the Cover with Elizabeth Banks and Jessica Biel",type:"publisher",url:"https://www.televisionacademy.com/video/under-the-cover-with-elizabeth-banks-and-jessica-biel",source:"Television Academy",goal:"Interview English + acting vocabulary",vocab:["sisters","on-screen","behind-the-scenes","bond","performance"],expr:["On screen...","Behind the scenes...","We had a great time..."],shadow:"We had a great time working together.",q:"What makes a good interview interesting?",prompts:[["00:00","Listen for on-screen and behind-the-scenes vocabulary."],["01:00","Notice how the speakers build on each other's ideas."],["02:00","Repeat a short answer with natural rhythm."]]},
{title:"Q&A with Elizabeth Banks — Charlie’s Angels",type:"publisher",url:"https://annenberg.usc.edu/news/critical-conversations/qa-elizabeth-banks",source:"USC Annenberg",goal:"Directing + professional English",vocab:["director","inclusion","project","team","inspiration"],expr:["I was inspired by...","I wanted to...","The idea was..."],shadow:"I wanted to create something new.",q:"What inspires you to start a new project?",prompts:[["00:00","Listen for vocabulary about directing."],["01:00","Notice how she explains a creative decision."],["02:00","Shadow a complete thought, not individual words."]]},
{title:"Elizabeth Banks on ‘My Body, My Podcast’ and empowering women in Hollywood",type:"publisher",url:"https://www.cbsnews.com/video/actress-elizabeth-banks-on-my-body-my-podcast-empowering-women-in-hollywood/",source:"CBS News",goal:"Opinion + professional conversation",vocab:["empower","industry","director","podcast","progress"],expr:["I believe that...","What matters is...","I've learned that..."],shadow:"I've learned that progress takes time.",q:"What change would you like to see in your field?",prompts:[["00:00","Listen for opinion language."],["01:00","Notice how examples support an argument."],["02:00","Shadow one opinion sentence with emphasis."]]},
{title:"Elizabeth Banks & Amanda Peet — Watch What Happens Live",type:"publisher",url:"https://tv.apple.com/us/episode/elizabeth-banks-and-amanda-peet/umc.cmc.yzedbavt4enycbenlayamnjb",source:"Apple TV",goal:"Longer conversational English",vocab:["guest","conversation","comedy","experience","reaction"],expr:["I remember...","That was when...","We were talking about..."],shadow:"I remember when we were talking about that.",q:"What makes a conversation enjoyable?",prompts:[["00:00","Listen for casual conversational language."],["02:00","Notice how speakers react to each other."],["04:00","Shadow a short response and copy the intonation."]]}
];

const goals=["Listening foundations","Natural conversation","Vocabulary building","Shadowing","Speaking confidence","Storytelling","Professional English","Humor & reactions","Long-form listening","Review"];
const followups=[
"Give one example from your own life.",
"Explain your answer in three sentences.",
"What would you do differently?",
"Why do you think that?",
"Give a specific example."
];

let state=JSON.parse(localStorage.getItem("ee_pwa_v9")||'{"done":[],"xp":0,"answers":{},"scores":{},"errors":[],"lastDay":0}');
let currentDay=1,currentLesson=null,recording=null,recordChunks=[],recordBlob=null,recognition=null,deferredInstall=null;

function save(){localStorage.setItem("ee_pwa_v9",JSON.stringify(state));renderHome();renderProgress()}
function nextDay(){for(let i=1;i<=30;i++)if(!state.done.includes(i))return i;return 30}
function lesson(){return currentLesson||lessons[(currentDay-1)%lessons.length]}
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");if(id==="home")renderHome();if(id==="progress")renderProgress()}
function openLesson(day){currentDay=day;currentLesson=lessons[(day-1)%lessons.length];show("lesson");renderLesson()}
function renderLesson(){
 const l=lesson();
 document.getElementById("lessonDay").textContent="DAY "+currentDay;
 document.getElementById("lessonTitle").textContent=l.title;
 document.getElementById("lessonGoal").textContent=l.goal+" · Source: "+l.source;
 document.getElementById("segment").textContent=l.type==="publisher"?"Official publisher source":"External source";
 document.getElementById("vocab").innerHTML=l.vocab.map(x=>`<span class="chip">${x}</span>`).join("");
 document.getElementById("expressions").innerHTML=l.expr.map(x=>`<div class="expression">${x}</div>`).join("");
 document.getElementById("transcript").innerHTML=l.prompts.map((x,i)=>`<div class="sentence" id="sentence${i}" onclick="selectSentence(${i})"><span class="timestamp">${x[0]}</span><span>${x[1]}</span></div>`).join("");
 document.getElementById("question").textContent=l.q;
 document.getElementById("targetText").textContent=l.shadow;
 document.getElementById("targetTime").textContent="Practice sentence";
 document.getElementById("feedback").innerHTML="";
 document.getElementById("review").innerHTML="";
 document.getElementById("followup").textContent="Answer the coach first.";
 document.getElementById("answer").value=state.answers[currentDay]||"";
 document.getElementById("completeBtn").textContent=state.done.includes(currentDay)?"✓ Lesson completed":"✓ Complete lesson +20 XP";
 loadPublisherPlayer(l);
}

function loadPublisherPlayer(l){
 const box=document.getElementById("videoPlayer");
 box.innerHTML="";
 const status=document.getElementById("videoStatus");
 status.innerHTML="Loading the official source inside the app… <span class='badge'>HYBRID PUBLISHER</span>";
 const frame=document.createElement("iframe");
 frame.className="publisherFrame";
 frame.src=l.url;
 frame.title=l.title;
 frame.loading="eager";
 frame.referrerPolicy="strict-origin-when-cross-origin";
 frame.allow="autoplay; fullscreen; picture-in-picture";
 frame.setAttribute("allowfullscreen","");
 frame.style.width="100%"; frame.style.height="100%"; frame.style.border="0";
 box.appendChild(frame);
 const fallback=document.createElement("div");
 fallback.className="frameFallback";
 fallback.innerHTML=`<p>If the publisher blocks embedding, the browser will not be able to show its player here.</p><a class="primary linkbtn" href="${l.url}" target="_blank" rel="noopener">Open official source</a>`;
 box.appendChild(fallback);
 document.getElementById("videoNow").textContent="—";
 document.getElementById("videoDur").textContent="—";
 document.getElementById("videoRange").value=0;
}

function selectSentence(i){
 document.querySelectorAll(".sentence").forEach(e=>e.classList.remove("active"));
 const el=document.getElementById("sentence"+i); if(el)el.classList.add("active");
 const x=lesson().prompts[i];
 document.getElementById("targetTime").textContent=x[0];
 document.getElementById("targetText").textContent=x[1];
}
function videoPlay(){toast("Playback is controlled by the official publisher player above.")}
function videoPause(){toast("Playback is controlled by the official publisher player above.")}
function videoSeek(){toast("Seeking is controlled by the official publisher player.")}
function videoRate(){toast("Playback speed depends on the official publisher player.")}
function caption(on){toast("Captions are controlled by the source player.")}
function scrub(){toast("Timeline control is provided by the source player.")}
function hearTarget(){const text=document.getElementById("targetText").textContent;if("speechSynthesis"in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.88;speechSynthesis.speak(u)}else toast("Text-to-speech is not supported.")}

async function startRecording(){
 if(!navigator.mediaDevices?.getUserMedia){toast("Microphone is not available.");return}
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  recordChunks=[];recording=new MediaRecorder(stream);
  recording.ondataavailable=e=>{if(e.data.size)recordChunks.push(e.data)};
  recording.onstop=()=>{recordBlob=new Blob(recordChunks,{type:"audio/webm"});const a=document.getElementById("recordedAudio");a.src=URL.createObjectURL(recordBlob);a.hidden=false;document.getElementById("recordStatus").textContent="Recording saved for this session ✓";stream.getTracks().forEach(t=>t.stop())};
  recording.start();document.getElementById("recordStatus").textContent="Recording… imitate the target sentence.";
 }catch(e){toast("Microphone permission was denied.")}
}
function stopRecording(){if(recording&&recording.state!=="inactive")recording.stop()}
function playRecording(){const a=document.getElementById("recordedAudio");if(a.hidden){toast("Record something first.");return}a.play()}

function startSpeech(){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R){toast("Speech recognition is not supported here. Type your answer.");return}
 recognition=new R();recognition.lang="en-US";recognition.continuous=true;recognition.interimResults=true;
 recognition.onresult=e=>{let text="";for(let i=e.resultIndex;i<e.results.length;i++)text+=e.results[i][0].transcript+" ";document.getElementById("answer").value=(document.getElementById("answer").value+" "+text).trim()};
 recognition.onerror=e=>toast("Speech recognition: "+e.error);recognition.start();toast("Listening…");
}
function stopSpeech(){if(recognition){recognition.stop();recognition=null;toast("Speech capture finished.")}}

function analyzeAnswer(){
 const text=document.getElementById("answer").value.trim();
 if(!text){toast("Speak or type an answer first.");return}
 const words=text.split(/\s+/).filter(Boolean),sentences=text.split(/[.!?]+/).filter(x=>x.trim()).length,unique=new Set(words.map(w=>w.toLowerCase().replace(/[^a-z']/g,""))).size;
 const flu=Math.min(100,45+Math.min(50,words.length)),grammar=Math.min(100,50+(sentences>=3?20:0)+(words.length>=30?15:0)),vocab=Math.min(100,45+Math.round(unique/Math.max(words.length,1)*50)),total=Math.round((flu+grammar+vocab)/3);
 state.answers[currentDay]=text;state.scores[currentDay]={flu,grammar,vocab,total,words:words.length,at:Date.now()};state.errors.push({day:currentDay,text:words.length<25?"Add a specific example and make your answer longer.":sentences<3?"Use at least three complete sentences.":unique/words.length<.55?"Try more varied vocabulary.":"Good structure. Add one concrete detail to sound more natural.",at:Date.now()});state.xp+=5;
 document.getElementById("feedback").innerHTML=`<div class="feedback"><b>Practice score: ${total}/100</b><div class="scoregrid"><div><b>${flu}</b>Fluency</div><div><b>${grammar}</b>Grammar</div><div><b>${vocab}</b>Vocabulary</div><div><b>${words.length}</b>Words</div></div><p>${state.errors[state.errors.length-1].text}</p></div>`;
 document.getElementById("followup").textContent=followups[currentDay%followups.length];save();
}
function useFollowup(){const q=document.getElementById("followup").textContent;if(q!=="Answer the coach first.")document.getElementById("question").textContent=q}

function makeReview(){
 const l=lesson();
 const items=[
 ["Choose the natural expression.",[l.expr[0],"I expression am","I am expression"],0],
 ["Choose a useful vocabulary word.",[l.vocab[0],"zzzzword","not-a-word"],0],
 ["Create your own sentence.",["Type your own answer","Skip","I don't know"],0]
 ];
 document.getElementById("review").innerHTML=items.map((q,i)=>`<div class="quizq"><b>${i+1}. ${q[0]}</b><br>${q[1].map((a,j)=>`<button onclick="answerQuiz(this,${j===q[2]})">${a}</button>`).join("")}</div>`).join("");
}
function answerQuiz(btn,ok){btn.style.background=ok?"#bbf7d0":"#fecaca";if(ok){state.xp+=5;save();toast("+5 XP")}}
function completeDay(){if(!state.done.includes(currentDay)){state.done.push(currentDay);state.xp+=20;save();toast("Lesson completed +20 XP")}document.getElementById("completeBtn").textContent="✓ Lesson completed"}

function renderHome(){
 const done=state.done.length,p=Math.round(done/30*100),d=nextDay();
 document.getElementById("daysDone").textContent=done;document.getElementById("xp").textContent=state.xp;document.getElementById("completion").textContent=p+"%";document.getElementById("progressBar").style.width=p+"%";document.getElementById("road").textContent=done+"/30";document.getElementById("todayTitle").textContent="Day "+d+" — "+goals[(d-1)%goals.length];document.getElementById("todayGoal").textContent=lessons[(d-1)%lessons.length].goal;document.getElementById("streak").textContent=done;
 document.getElementById("days").innerHTML=Array.from({length:30},(_,i)=>{const n=i+1;return `<button class="day ${state.done.includes(n)?"done":""} ${n===d?"today":""}" onclick="openLesson(${n})">${state.done.includes(n)?"✓ ":""}${n}</button>`}).join("");
}
function renderProgress(){
 const done=state.done.length;
 document.getElementById("progressBox").innerHTML=`<p><b>${done}/30</b> lessons completed</p><div class="progress"><i style="width:${done/30*100}%"></i></div><p><b>${state.xp} XP</b></p>`;
 const errors=state.errors.slice(-10).reverse();document.getElementById("errors").innerHTML=errors.length?errors.map(e=>`<div class="error"><b>Day ${e.day}</b> — ${e.text}</div>`).join(""):"<p class='muted'>No errors recorded yet.</p>";
 const scores=Object.entries(state.scores);document.getElementById("history").innerHTML=scores.length?scores.map(([d,s])=>`<div class="expression"><b>Day ${d}</b> — ${s.total}/100 · Fluency ${s.flu} · Grammar ${s.grammar} · Vocabulary ${s.vocab}</div>`).join(""):"<p class='muted'>No speaking attempts yet.</p>";
}
function resetProgress(){if(confirm("Reset all local progress?")){localStorage.removeItem("ee_pwa_v9");location.reload()}}
function installPWA(){if(deferredInstall){deferredInstall.prompt();deferredInstall=null}else toast("Use browser menu → Add to Home screen.")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;document.getElementById("installHint").textContent="This app can be installed. Tap Install app."});
window.addEventListener("appinstalled",()=>toast("App installed ✓"));
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
renderHome();

const vb=document.getElementById('appVersionBadge'); if(vb) vb.textContent=APP_VERSION;
