import { site } from "@/lib/site";

// Entry animation: pure CSS so it can never trap a visitor if JavaScript fails.
// It plays once per browser session (the inline script flags repeat loads) and the curtain
// hides itself via CSS after the animation ends. Timings are mirrored in Motion.tsx (INTRO_DELAY).
const flag = `try{var d=document.documentElement;if(sessionStorage.getItem("intro")){d.classList.add("no-intro")}else{sessionStorage.setItem("intro","1")}}catch(e){}`;

export default function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: flag }} />
      <div className="intro" aria-hidden="true">
        <svg className="intro__line" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid meet">
          <path pathLength={1} d="M0 112 L180 112 L360 52 L540 112 L760 112 L960 24 L1160 112 L1300 112 L1380 70 L1440 112" />
        </svg>
        <p className="intro__name">{site.name}</p>
        <p className="intro__sub">Columbus, Ohio</p>
      </div>
    </>
  );
}
